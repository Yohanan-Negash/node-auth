const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Succesfully Connected to database');
  } catch (err) {
    console.log('Database connection failed. exiting now....');
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
