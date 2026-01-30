const { Server } = require("socket.io");
const User = require("../models/User.model");

let io;

// Track user heartbeats: userId -> timestamp of last heartbeat
const userHeartbeats = new Map();

const init = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        let connectedUserId = null;

        // Join a private room for the user (self-tracking or broadcast)
        socket.on("location:joinRoom", (userId) => {
            connectedUserId = userId;
            socket.join(`user:${userId}`);

            // Update user status to tracking
            User.findByIdAndUpdate(userId, { status: 'tracking' })
                .catch(err => console.error('Failed to update user status:', err));

            console.log(`Socket ${socket.id} joined room user:${userId}`);
        });

        // Admin starts watching all users
        socket.on("admin:join", () => {
            socket.join("admins");
            console.log(`Admin ${socket.id} joined global admins room`);
        });

        // Admin starts watching a specific user
        socket.on("admin:watchUser", (userId) => {
            socket.join(`user:${userId}`);
            console.log(`Admin ${socket.id} watching user:${userId}`);
        });

        // 💓 HEARTBEAT HANDLER - Keep user ONLINE even without location updates
        socket.on("heartbeat:ping", (data) => {
            const { userId, timestamp } = data;
            if (userId) {
                // Record the heartbeat timestamp
                userHeartbeats.set(userId, timestamp || Date.now());

                // Update user status to tracking (NOT offline)
                User.findByIdAndUpdate(userId, { status: 'tracking' })
                    .catch(err => console.error('Failed to update user status:', err));

                // Send pong back (optional, for client-side monitoring)
                socket.emit('heartbeat:pong', {
                    type: 'PONG',
                    serverTimestamp: Date.now()
                });

                console.log(`💓 Heartbeat received from user ${userId}`);
            }
        });

        // Handle location updates from mobile
        socket.on("location:update", (data) => {
            const { userId, status } = data;
            if (userId) {
                // Update heartbeat on location update too
                userHeartbeats.set(userId, Date.now());

                // Update user status to tracking
                User.findByIdAndUpdate(userId, { status: 'tracking' })
                    .catch(err => console.error('Failed to update user status:', err));

                // Broadcast to the user's private room
                io.to(`user:${userId}`).emit("location:broadcast", data);

                // Also broadcast to the global admins room
                io.to("admins").emit("live-user-update", data);

                console.log(`📍 Location update from ${userId} (${status || 'MOVING'})`);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);

            // Mark user as offline only if no heartbeat within last 60 seconds
            if (connectedUserId) {
                const lastHeartbeat = userHeartbeats.get(connectedUserId);
                const timeSinceLastHeartbeat = Date.now() - (lastHeartbeat || 0);

                if (timeSinceLastHeartbeat > 60000) {
                    // No heartbeat in last 60 seconds, mark offline
                    User.findByIdAndUpdate(connectedUserId, { status: 'offline' })
                        .catch(err => console.error('Failed to mark user offline:', err));
                }
            }
        });
    });

    return io;
};

/**
 * Get user online status based on heartbeat
 * User is ONLINE if last heartbeat was within 60 seconds
 */
const isUserOnline = (userId) => {
    const lastHeartbeat = userHeartbeats.get(userId);
    if (!lastHeartbeat) return false;

    const timeSinceLastHeartbeat = Date.now() - lastHeartbeat;
    return timeSinceLastHeartbeat < 60000; // 60 seconds threshold
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = {
    init,
    getIO,
    isUserOnline,
    getUserHeartbeats: () => userHeartbeats
};