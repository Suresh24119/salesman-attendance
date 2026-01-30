const attendanceService = require('../services/attendance.service');
const AttendanceSession = require('../models/AttendanceSession.model');

exports.checkIn = async (req, res) => {
    try {
        const userId = req.user.id;
        const session = await attendanceService.checkIn(userId, req.body);
        res.json(session);
    } catch (err) {
        console.error('Check-in Error:', err);
        const status = err.message === 'User not found.' ? 404 : 400;
        res.status(status).json({ message: err.message });
    }
};

exports.checkOut = async (req, res) => {
    try {
        const userId = req.user.id;
        const { reason } = req.body;
        const session = await attendanceService.checkOut(userId, req.body, reason);
        res.json(session);
    } catch (err) {
        console.error('Check-out Error:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.getMonthlyAttendance = async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();
        const year = parseInt(req.query.year) || now.getFullYear();
        const month = req.query.month ? (parseInt(req.query.month) - 1) : now.getMonth();

        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const sessions = await AttendanceSession.find({
            userId,
            startTime: { $gte: startOfMonth, $lte: endOfMonth }
        }).select('date startTime status');

        // Create a map for easy lookup
        const attendanceMap = {};
        sessions.forEach(session => {
            attendanceMap[session.date] = 'present';
        });

        res.json({ success: true, attendance: attendanceMap });
    } catch (err) {
        console.error('Monthly Attendance Error:', err);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

exports.getAllAttendance = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get limit from query params, default to 50 for performance
        const limit = parseInt(req.query.limit) || 50;

        const sessions = await AttendanceSession.find({ userId })
            .sort({ startTime: -1 })
            .limit(limit)
            .select('date time startTime endTime status totalDuration totalDistance startLocation endLocation');

        res.json(sessions);
    } catch (err) {
        console.error('Get All Attendance Error:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

