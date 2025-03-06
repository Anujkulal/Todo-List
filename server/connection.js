const mongoose = require('mongoose');

const connectDB = async (url) => {
    await mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log("MongoDB connection error:",err));
}

module.exports = { connectDB };