require('./config/env');
const mongoose = require('mongoose');
const User = require('./models/User.model');
const connectDB = require('./config/db');

const fixDatabase = async () => {
    try {
        await connectDB();

        const users = await User.find({});
        console.log(`Analyzing ${users.length} users...`);

        for (const user of users) {
            let modified = false;

            // 1. Trim whitespace from name
            const trimmedName = user.name.trim();
            if (user.name !== trimmedName) {
                console.log(`Fixing name: "${user.name}" -> "${trimmedName}"`);
                user.name = trimmedName;
                modified = true;
            }

            // 2. Ensuring email is lowercase and trimmed (Standard practice)
            const standardEmail = user.email.trim().toLowerCase();
            if (user.email !== standardEmail) {
                console.log(`Fixing email: "${user.email}" -> "${standardEmail}"`);
                user.email = standardEmail;
                modified = true;
            }

            // 3. Ensuring avatar is null or valid string (avoiding 'NONE' or empty strings if preferred)
            if (user.avatar === '') {
                user.avatar = null;
                modified = true;
            }

            if (modified) {
                await user.save();
                console.log(`✅ User ${user._id} updated.`);
            }
        }

        console.log('✨ Database standardization complete.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to fix database:', err);
        process.exit(1);
    }
};

fixDatabase();
