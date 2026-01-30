const Order = require("../models/Order.model");
const { info, error } = require("../utils/logger");

exports.createOrder = async (req, res) => {
    try {
        const { clientName, companyName, notes, paymentTime, amount, items, latitude, longitude } = req.body;
        const receiptUrl = req.file ? `/uploads/receipts/${req.file.filename}` : null;

        const order = await Order.create({
            salesman: req.user.id,
            clientName,
            companyName,
            notes,
            receiptUrl,
            paymentTime: paymentTime ? new Date(paymentTime) : new Date(),
            amount: parseFloat(amount),
            items: typeof items === 'string' ? JSON.parse(items) : items,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
        });

        info(`✅ Order created for client: ${clientName} by salesman: ${req.user.id}, Amount: ${amount}`);
        res.status(201).json({ success: true, order });
    } catch (err) {
        error("Error creating order:", err);
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ salesman: req.user.id }).sort({ timestamp: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        error("Error fetching orders:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
