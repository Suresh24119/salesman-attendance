require('../config/env'); // Load environment variables
const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path based on execution location
const User = require('../models/User.model');
const Location = require('../models/Location.model');

// Data Points for Suresh's Timeline
const locations = [
    // Day 1: Sunday, Jan 11th, 2026
    { time: '2026-01-11T10:00:00.000Z', lat: 22.3015, lng: 70.8021, name: 'Watson Museum' },
    { time: '2026-01-11T12:30:00.000Z', lat: 22.2965, lng: 70.7960, name: 'Rotary Dolls Museum' },
    { time: '2026-01-11T14:00:00.000Z', lat: 22.3000, lng: 70.8000, name: 'The Grand Thakar' }, // Approx central
    { time: '2026-01-11T16:30:00.000Z', lat: 22.3040, lng: 70.8040, name: 'Kaba Gandhi No Delo' }, // Kaba Gandhi
    { time: '2026-01-11T19:00:00.000Z', lat: 22.2980, lng: 70.7900, name: 'Race Course Ground' },

    // Day 2: Monday, Jan 12th, 2026
    { time: '2026-01-12T09:00:00.000Z', lat: 22.2600, lng: 70.8200, name: 'Pradhyuman Zoological Park' },
    { time: '2026-01-12T11:30:00.000Z', lat: 22.2800, lng: 70.8300, name: 'Aji Dam Garden' },
    { time: '2026-01-12T13:30:00.000Z', lat: 22.2850, lng: 70.7700, name: 'Lords Banquet' }, // Kalavad Rd
    { time: '2026-01-12T16:00:00.000Z', lat: 22.3039, lng: 70.8022, name: 'Crystal Mall' }, // Using Wikipedia coords
    { time: '2026-01-12T18:30:00.000Z', lat: 22.2858, lng: 70.7410, name: 'ISKCON Temple' }
];

const seedRajkot = async () => {
    try {
        console.log('🌱 Connecting to Database...');
        await connectDB();
        console.log('✅ Connected.');

        const email = 'suresh@gmail.com';

        console.log(`🔎 Finding user: ${email}...`);
        let user = await User.findOne({ email });

        if (!user) {
            console.log('⚠️ User not found. Creating new user...');
            // Creating a dummy user if not exists
            user = await User.create({
                name: 'Suresh Kumar',
                email: email,
                password: 'password123' // Dummy password
            });
            console.log(`✅ Created User: ${user._id}`);
        } else {
            console.log(`✅ Found User: ${user._id}`);
        }

        console.log('🧹 Clearing existing timeline for these dates (optional safety)...');
        // Not clearing to avoid data loss, just appending for now. 
        // Or we could check uniqueness. 

        console.log('🚀 Seeding Locations...');
        const locationDocs = locations.map(loc => ({
            userId: user._id,
            latitude: loc.lat,
            longitude: loc.lng,
            speed: Math.random() * 30, // Random speed 0-30 km/h simulating travel
            timestamp: new Date(loc.time).getTime(),
            createdAt: new Date(loc.time) // Ensure creation time matches visit time for proper history queries if dependent on createdAt
        }));

        await Location.insertMany(locationDocs);

        console.log(`🎉 Successfully seeded ${locations.length} location points for ${email}!`);

        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
};

seedRajkot();
