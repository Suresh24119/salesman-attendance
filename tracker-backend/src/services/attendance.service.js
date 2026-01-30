const User = require('../models/User.model');
const AttendanceSession = require('../models/AttendanceSession.model');
const Location = require('../models/Location.model');
const { calculateTotalDistance } = require('../utils/geo.utils');

/**
 * Initiates a check-in for a user.
 */
exports.checkIn = async (userId, locationData) => {
    // 1. Check for active session using atomicity
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found.');
    }

    if (user.currentSessionId) {
        const existingSession = await AttendanceSession.findById(user.currentSessionId);
        if (existingSession && existingSession.status === 'active') {
            return existingSession;
        }
        user.currentSessionId = null;
        user.status = 'offline';
        await user.save();
    }

    // 2. Create session with separate date and time for easy reporting
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];

    const session = new AttendanceSession({
        userId,
        startTime: now,
        date: dateStr,
        time: timeStr,
        startLocation: {
            latitude: Number(locationData?.latitude) || 0,
            longitude: Number(locationData?.longitude) || 0,
            address: locationData?.address || 'Auto-tracking start'
        },
        status: 'active'
    });

    await session.save();

    // 3. Update user
    user.currentSessionId = session._id;
    user.status = 'tracking';
    await user.save();

    return session;
};

/**
 * Finalizes a session (Check-out).
 */
exports.checkOut = async (userId, locationData, reason = 'USER_MANUAL') => {
    const user = await User.findById(userId);
    if (!user?.currentSessionId) {
        return { message: 'Already checked out' };
    }

    const sessionId = user.currentSessionId;
    const session = await AttendanceSession.findById(sessionId);
    if (!session) {
        user.currentSessionId = null;
        await user.save();
        return { message: 'Session not found' };
    }

    // 1. Calculate metrics
    const endTime = new Date();
    const duration = Math.floor((endTime - session.startTime) / 1000); // seconds

    // Fetch all location points for this session
    const points = await Location.find({ sessionId }).sort({ timestamp: 1 });
    const distance = calculateTotalDistance(points);

    // 2. Update session
    session.endTime = endTime;
    session.endLocation = {
        latitude: Number(locationData?.latitude) || 0,
        longitude: Number(locationData?.longitude) || 0,
        address: locationData?.address || 'Self-checkout'
    };
    session.status = 'completed';
    session.checkoutReason = reason;
    session.totalDuration = duration;
    session.totalDistance = distance;

    await session.save();

    // 3. Reset user status
    user.currentSessionId = null;
    user.status = 'offline';
    await user.save();

    return session;
};
