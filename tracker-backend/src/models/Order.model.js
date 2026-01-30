const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    salesman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    notes: {
        type: String
    },
    receiptUrl: {
        type: String
    },
    paymentTime: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'completed'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

OrderSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Order", OrderSchema);
