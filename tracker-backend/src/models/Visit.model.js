const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
    salesman: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String
    },
    requirement: {
        type: String,
        required: true
    },
    address: {
        type: String
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

// Index for geo queries
VisitSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Visit", VisitSchema);
