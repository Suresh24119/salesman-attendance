const Visit = require("../models/Visit.model");
const Order = require("../models/Order.model");
const { error } = require("../utils/logger");

exports.getDailyStats = async (req, res) => {
    try {
        const { month, year } = req.query;
        let start, end;

        if (month && year) {
            start = new Date(year, month - 1, 1);
            end = new Date(year, month, 0, 23, 59, 59, 999);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }

        const query = {
            salesman: req.user.id,
            timestamp: { $gte: start, $lte: end }
        };

        const [visitsCount, orders] = await Promise.all([
            Visit.countDocuments(query),
            Order.find(query)
        ]);

        const ordersCount = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0);

        res.json({
            success: true,
            stats: {
                visits: visitsCount,
                orders: ordersCount,
                revenue: totalRevenue,
                date: start
            }
        });
    } catch (err) {
        error("Error fetching daily stats:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
