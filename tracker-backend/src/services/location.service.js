const Location = require("../models/Location.model");
const User = require("../models/User.model");
const { getIO } = require("../config/socket");

/**
 * Saves a new location point and broadcasts it via Socket.IO.
 * @param {Object} locationData - { userId, latitude, longitude, speed, timestamp }
 * @returns {Promise<Object>} - The saved location document.
 */
exports.saveLocation = async (locationData) => {
    const eventTime = new Date(locationData.timestamp || Date.now());
    locationData.date = locationData.date || eventTime.toISOString().split('T')[0];
    locationData.time = locationData.time || eventTime.toTimeString().split(' ')[0];

    // Automatically associate with the active session if it exists
    const user = await User.findById(locationData.userId).select('currentSessionId');
    if (user && user.currentSessionId) {
        locationData.sessionId = user.currentSessionId;
    }

    const loc = await Location.create(locationData);

    // Broadcast to real-time clients in the specific user's room
    try {
        const io = getIO();
        io.to(`user:${locationData.userId}`).emit("location:broadcast", {
            userId: locationData.userId,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            speed: locationData.speed,
            battery: locationData.battery,
            heading: locationData.heading,
            accuracy: locationData.accuracy,
            timestamp: locationData.timestamp,
        });
    } catch (err) {
        // Socket might not be initialized in some contexts (e.g. tests/jobs)
        console.warn("Socket broadcast failed:", err.message);
    }

    return loc;
};

/**
 * Fetches location points for a user within a time range.
 * @param {string} userId - User ID.
 * @param {Date} start - Start date.
 * @param {Date} end - End date.
 * @returns {Promise<Array>} - Array of location points.
 */
exports.getLocationsInRange = async (userId, start, end) => {
    return await Location.find({
        userId,
        timestamp: { $gte: start.getTime(), $lt: end.getTime() },
    }).sort("timestamp");
};
