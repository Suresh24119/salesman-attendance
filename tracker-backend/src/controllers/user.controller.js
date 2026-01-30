const User = require("../models/User.model");
const { isUserOnline } = require("../config/socket");

// UP Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        res.json({ message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Upload image 
exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const avatarUrl = `/uploads/${req.file.filename}`;

        user.avatar = avatarUrl;
        await user.save();

        res.json({ message: "Avatar uploaded successfully", avatar: avatarUrl, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Future: Delete associated data (locations, timeline)
        // await Location.deleteMany({ userId });

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 *  POST /api/user/heartbeat
 * Keep user ONLINE by updating lastHeartbeat timestamp
 * Can be called via Socket.IO or HTTP as fallback
 */
exports.heartbeat = async (req, res) => {
    try {
        const { battery, lat, lng } = req.body;
        const userId = req.user.id;

        const updateData = {
            lastHeartbeat: new Date(),
            status: 'tracking'
        };

        if (battery !== undefined) updateData.battery = battery;
        if (lat !== undefined) updateData.lat = lat;
        if (lng !== undefined) updateData.lng = lng;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "Heartbeat received",
            isOnline: true,
            lastHeartbeat: user.lastHeartbeat
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * GET /api/user/status
 * Get current user online status based on heartbeat
 */
exports.getUserStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is online based on last heartbeat
        const lastHeartbeat = user.lastHeartbeat ? new Date(user.lastHeartbeat) : null;
        const timeSinceLastHeartbeat = lastHeartbeat ? Date.now() - lastHeartbeat.getTime() : Infinity;
        const isOnline = timeSinceLastHeartbeat < 60000; // 60 seconds threshold

        res.json({
            userId: user._id,
            name: user.name,
            status: user.status,
            isOnline,
            lastHeartbeat: user.lastHeartbeat,
            timeSinceLastHeartbeat: Math.floor(timeSinceLastHeartbeat / 1000) // seconds
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};