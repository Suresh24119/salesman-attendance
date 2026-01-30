const { getLocationsInRange } = require("../services/location.service");
const { generateTimeline } = require("../services/timeline.service");
const { getDayBounds } = require("../utils/date.utils");

const Visit = require("../models/Visit.model");
const Order = require("../models/Order.model");
const AttendanceSession = require("../models/AttendanceSession.model");

exports.getTimeline = async (req, res) => {
    try {
        const userId = req.user.id;
        const date = req.params.date;
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date format (required: YYYY-MM-DD)" });
        }

        const { start, end } = getDayBounds(date);

        const logs = await getLocationsInRange(userId, start, end);
        const segments = generateTimeline(logs);

        res.json(segments);
    } catch (err) {
        console.error("getTimeline Error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.getDailyLogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const date = req.params.date;
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "Invalid date format (required: YYYY-MM-DD)" });
        }

        const { start, end } = getDayBounds(date);
        const logs = await getLocationsInRange(userId, start, end);
        res.json(logs);
    } catch (err) {
        console.error("getDailyLogs Error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

exports.getActivityHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.query;

        const start = startDate ? new Date(startDate) : new Date(new Date().setHours(0, 0, 0, 0));
        const end = endDate ? new Date(endDate) : new Date(new Date().setHours(23, 59, 59, 999));

        const query = {
            salesman: userId,
            timestamp: { $gte: start, $lte: end }
        };

        const attendanceQuery = {
            userId: userId,
            startTime: { $gte: start, $lte: end }
        };

        const [visits, orders, attendance] = await Promise.all([
            Visit.find(query).sort({ timestamp: -1 }),
            Order.find(query).sort({ timestamp: -1 }),
            AttendanceSession.find(attendanceQuery).sort({ startTime: -1 })
        ]);

        // Aggregate into a single history array
        const history = [];

        visits.forEach(v => history.push({
            id: v._id,
            type: 'visit',
            title: `Visit: ${v.companyName || 'Unknown'}`,
            subtitle: `${v.clientName || 'General'} • ${v.requirement?.substring(0, 30) || 'No details'}...`,
            timestamp: v.timestamp,
            data: v
        }));

        orders.forEach(o => history.push({
            id: o._id,
            type: 'order',
            title: `Order: ${o.clientName || 'Client'}`,
            subtitle: `Total Amount: ₹${Number(o.amount).toLocaleString()}`,
            amount: `+₹${Number(o.amount).toLocaleString()}`,
            timestamp: o.timestamp,
            data: o
        }));

        attendance.forEach(a => {
            history.push({
                id: a._id.toString() + '_in',
                type: 'punch-in',
                title: 'Punch-in: Started Day',
                subtitle: a.startLocation?.address || 'Location recorded',
                timestamp: a.startTime,
                data: a
            });
            if (a.endTime) {
                history.push({
                    id: a._id.toString() + '_out',
                    type: 'punch-out',
                    title: 'Punch-out: Ended Day',
                    subtitle: a.endLocation?.address || 'Location recorded',
                    timestamp: a.endTime,
                    data: a
                });
            }
        });

        // Sort chronologically (descending)
        history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        res.json({ success: true, history });
    } catch (err) {
        console.error("getActivityHistory Error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

