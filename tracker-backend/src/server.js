const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const socketConfig = require("./config/socket");
const { initDailySummaryJob } = require("./jobs/dailySummary.job");
const { PORT } = require("./config/env");
const { info, error } = require("./utils/logger");

const startServer = async () => {
    try {
        // 1. Connect to Database
        await connectDB();
        info(" Database connection established.");

        // 2. Create HTTP Server
        const server = http.createServer(app);

        // 3. Initialize Socket.IO
        socketConfig.init(server);
        info(" Socket.IO initialized.");

        // 4. Start Background Jobs
        initDailySummaryJob();
        info(" Background jobs initialized.");

        // 5. Start Listening
        server.listen(PORT, '0.0.0.0', () => {
            info(` Server running on port ${PORT}`);
        });
    } catch (err) {
        error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
