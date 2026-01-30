const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceSession" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number },
    timestamp: { type: Number, required: true },
    date: { type: String }, // Format: YYYY-MM-DD
    time: { type: String }, // Format: HH:mm:ss
    status: { type: String, enum: ['STOPPED', 'WALKING', 'MOVING'], default: 'STOPPED' },
    battery: { type: Number },
    heading: { type: Number },
    accuracy: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

locationSchema.index({ sessionId: 1, timestamp: 1 });
locationSchema.index({ location: "2dsphere" }); // Added for spatial queries if needed later

module.exports = mongoose.model("Location", locationSchema);
