const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Location = require('./models/Location.model');
const AttendanceSession = require('./models/AttendanceSession.model');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Migrate Locations
        console.log('Migrating Locations...');
        const locations = await Location.find({ date: { $exists: false } });
        console.log(`Found ${locations.length} locations to update.`);

        for (const loc of locations) {
            const d = new Date(loc.timestamp || loc.createdAt);
            loc.date = d.toISOString().split('T')[0];
            loc.time = d.toTimeString().split(' ')[0];
            await loc.save();
        }

        // 2. Migrate Sessions
        console.log('Migrating Sessions...');
        const sessions = await AttendanceSession.find({ date: { $exists: false } });
        console.log(`Found ${sessions.length} sessions to update.`);

        for (const sess of sessions) {
            const d = new Date(sess.startTime);
            sess.date = d.toISOString().split('T')[0];
            sess.time = d.toTimeString().split(' ')[0];
            await sess.save();
        }

        console.log('Migration complete!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
