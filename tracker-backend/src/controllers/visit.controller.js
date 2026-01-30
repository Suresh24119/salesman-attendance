const Visit = require("../models/Visit.model");
const { info, error } = require("../utils/logger");

exports.createVisit = async (req, res) => {
    try {
        const {
            companyName,
            clientName,
            clientPhone,
            clientEmail,
            requirement,
            address,
            latitude,
            longitude
        } = req.body;

        const visit = await Visit.create({
            salesman: req.user.id,
            companyName,
            clientName,
            clientPhone,
            clientEmail,
            requirement,
            address,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        info(`✅ Visit created for company: ${companyName} by salesman: ${req.user.id}`);
        res.status(201).json({ success: true, visit });
    } catch (err) {
        error("Error creating visit:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getVisits = async (req, res) => {
    try {
        const visits = await Visit.find({ salesman: req.user.id }).sort({ timestamp: -1 });
        res.json({ success: true, visits });
    } catch (err) {
        error("Error fetching visits:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
