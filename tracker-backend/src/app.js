const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const locationRoutes = require("./routes/location.routes");
const timelineRoutes = require("./routes/timeline.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/visit", require("./routes/visit.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/stats", require("./routes/stats.routes"));
app.use("/api/quotation", require("./routes/quotation.routes"));


// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error Handling Middleware (must be after routes)
app.use(errorMiddleware);

module.exports = app;
