require('./config/env');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');
const connectDB = require('./config/db');

const seedUser = async () => {
    try {
        await connectDB();

        const phone = '1234567890';
        const existing = await User.findOne({ phone });

        if (existing) {
            console.log('User already exists with phone:', phone);
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash('1234', salt);

        await User.create({
            name: 'Demo Salesman',
            phone: phone,
            email: 'salesman@demo.com',
            password: hashed
        });

        console.log('✅ Demo user created: Phone: 1234567890 / Password: 1234');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seedUser();
