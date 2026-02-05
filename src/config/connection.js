const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to database");
  } catch (error) {
    console.log("Could not connect to database");
    process.exit(1);
    //shutdown server if connection fails
  }
};

module.exports = connectToDatabase;
