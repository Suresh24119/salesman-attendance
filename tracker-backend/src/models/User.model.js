const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    avatar: { type: String },
    currentSessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'AttendanceSession', default: null },
    status: { type: String, enum: ['available', 'tracking', 'offline'], default: 'offline' },
    lastHeartbeat: { type: Date, default: null }, // Track last heartbeat for online status
    battery: { type: Number, default: null },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);