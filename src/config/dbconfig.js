require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/scoreboard`);
        console.log("conneted to database");
    } catch (error) {
        console.error("Cannot connect to the database");
    }
}

module.exports = connectDB;
