const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
    salesman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientCompany: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "converted"],
        default: "pending"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Quotation", quotationSchema);
