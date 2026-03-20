const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
        console.log('Connecting to:', uri);
        await mongoose.connect(uri);
        console.log('MongoDB Connected');

        await User.deleteMany({ email: 'admin@intigrity.com' });

        const adminUser = new User({
            name: 'Admin',
            email: 'admin@intigrity.com',
            password: 'admin',
            role: 'admin'
        });

        await adminUser.save();
        console.log('✅ Admin user seeded successfully.');
        console.log('   Email:    admin@intigrity.com');
        console.log('   Password: admin');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error with seeding:', error.message);
        process.exit(1);
    }
};

seedAdmin();
