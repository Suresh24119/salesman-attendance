const Quotation = require("../models/Quotation.model");
const { info, error } = require("../utils/logger");

exports.createQuotation = async (req, res) => {
    try {
        const { clientName, clientCompany, phone, email, scope } = req.body;

        const quotation = await Quotation.create({
            salesman: req.user.id,
            clientName,
            clientCompany,
            phone,
            email,
            scope
        });

        info(`📄 Quotation created for client: ${clientName} (${clientCompany}) by salesman: ${req.user.id}. Sent to Admin.`);

        res.status(201).json({
            success: true,
            message: "Quotation sent to admin successfully",
            quotation
        });
    } catch (err) {
        error("Error creating quotation:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find({ salesman: req.user.id }).sort({ timestamp: -1 });
        res.json({ success: true, quotations });
    } catch (err) {
        error("Error fetching quotations:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
