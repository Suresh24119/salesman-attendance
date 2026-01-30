const mongoose = require('mongoose');
const Visit = require('../src/models/Visit.model');
const Order = require('../src/models/Order.model');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const USER_ID = '69749c00541a41d9c97696a1'; // From logs

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Create a sample Visit
        const visit = await Visit.create({
            salesman: USER_ID,
            companyName: 'Tech Solutions Inc',
            clientName: 'Alice Smith',
            clientPhone: '+919876543210',
            clientEmail: 'alice@techsolutions.com',
            requirement: 'Interested in premium plan',
            address: '123 Tech Park, Innovation City',
            location: {
                type: 'Point',
                coordinates: [70.7799692, 22.2727355] // [lng, lat]
            },
            timestamp: new Date()
        });
        console.log('✅ Sample Visit Created:', visit._id);

        // Create a sample Order
        const order = await Order.create({
            salesman: USER_ID,
            companyName: 'Tech Solutions Inc',
            clientName: 'Alice Smith',
            items: [
                { name: 'Premium License', quantity: 1, price: 5000 }
            ],
            amount: 5000,
            status: 'completed',
            location: {
                type: 'Point',
                coordinates: [70.7799692, 22.2727355]
            },
            timestamp: new Date()
        });
        console.log('✅ Sample Order Created:', order._id);

        console.log('🎉 Database seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seedData();
