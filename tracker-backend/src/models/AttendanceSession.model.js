const mongoose = require('mongoose');

const attendanceSessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true, default: Date.now },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:mm:ss
    endTime: { type: Date },
    startLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        address: { type: String }
    },
    endLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String }
    },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    checkoutReason: { type: String, enum: ['USER_MANUAL', 'LOCATION_DISABLED', 'SYSTEM_AUTO'] },
    totalDistance: { type: Number, default: 0 }, // in meters
    totalDuration: { type: Number, default: 0 }, // in seconds
    polyline: { type: String }, // Encoded Polyline
    createdAt: { type: Date, default: Date.now }
});

attendanceSessionSchema.index({ userId: 1, status: 1 });
attendanceSessionSchema.index({ startTime: -1 });

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
