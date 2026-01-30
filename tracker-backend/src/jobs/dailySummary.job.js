const cron = require('node-cron');
const Location = require('../models/Location.model');
const DailySummary = require('../models/DailySummary.model');
const { info, error } = require('../utils/logger');
const { generateTimeline } = require('../services/timeline.service');

const initDailySummaryJob = () => {
    // Run every day at midnight (00:00)
    cron.schedule('0 0 * * *', async () => {
        info('--- Running Daily Summary Cron Job ---');
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(0, 0, 0, 0);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Fetch all users who had location logs yesterday
            const userIds = await Location.distinct('userId', {
                createdAt: { $gte: yesterday, $lt: today }
            });

            for (const userId of userIds) {
                const logs = await Location.find({
                    userId,
                    createdAt: { $gte: yesterday, $lt: today }
                }).sort('createdAt');

                const segments = generateTimeline(logs);

                // Calculate total distance
                const totalDistance = segments.reduce((acc, seg) => acc + (seg.distance || 0), 0);

                await DailySummary.findOneAndUpdate(
                    { userId, date: yesterday.toISOString().split('T')[0] },
                    {
                        segments,
                        totalDistance,
                        // totalActiveTime can be calculated based on transit durations
                    },
                    { upsert: true }
                );

                info(`Processed daily summary for user: ${userId}`);
            }

            info(`✅ Daily Summary Job completed for ${userIds.length} users.`);
        } catch (err) {
            error('Error in Daily Summary Cron Job:', err);
        }
    });

    info('✅ Daily Summary Cron Job scheduled.');
};

module.exports = { initDailySummaryJob };
