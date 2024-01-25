const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/scoreBoardDB");
        console.log("conneted to database");
    } catch (error) {
        console.error("Cannot connect to the database");
    }
}

module.exports = connectDB;
