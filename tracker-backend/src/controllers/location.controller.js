const { saveLocation } = require("../services/location.service");

exports.recordLocation = async (req, res) => {
    try {
        const { latitude, longitude, speed, timestamp, battery, heading, accuracy } = req.body;
        const userId = req.user && req.user.id ? req.user.id : req.user; // Handle different auth middleware structures

        if (!latitude || !longitude || !userId) {
            return res.status(400).json({ message: "Missing required fields: latitude, longitude, or userId" });
        }

        const loc = await saveLocation({
            userId,
            latitude,
            longitude,
            speed: speed || 0,
            status: req.body.status || 'STOPPED',
            timestamp: timestamp || Date.now(),
            battery: battery,
            heading: heading || 0,
            accuracy: accuracy || 0,
            sessionId: req.body.sessionId
        });
        res.json(loc);
    } catch (err) {
        console.error("recordLocation Error:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};
