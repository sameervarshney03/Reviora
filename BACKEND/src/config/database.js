const mongoose = require("mongoose");
require("dotenv").config();

// function to connect with the database
const connectDB = async() => {
    await mongoose.connect(process.env.DATABASE_URL);
}

module.exports = connectDB;