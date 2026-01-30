require('./config/env');
const mongoose = require('mongoose');
const User = require('./models/User.model');
const connectDB = require('./config/db');

const listUsers = async () => {
    try {
        await connectDB();

        const users = await User.find({});

        console.log('--- DATABASE USER LIST ---');
        console.table(users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            avatar: u.avatar || 'NONE',
            status: u.status
        })));

        console.log(`Total Users: ${users.length}`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to list users:', err);
        process.exit(1);
    }
};

listUsers();
