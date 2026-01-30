const mongoose = require("mongoose");

const dailySummarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    totalDistance: { type: Number, default: 0 },
    totalActiveTime: { type: Number, default: 0 },
    segments: [{
        type: { type: String, enum: ['STATIONARY', 'TRANSIT'] },
        startTime: Date,
        endTime: Date,
        duration: String,
        distance: Number,
        startLocation: {
            latitude: Number,
            longitude: Number
        },
        endLocation: {
            latitude: Number,
            longitude: Number
        },
        title: String,
        address: String
    }],
    createdAt: { type: Date, default: Date.now },
});

dailySummarySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailySummary", dailySummarySchema);
