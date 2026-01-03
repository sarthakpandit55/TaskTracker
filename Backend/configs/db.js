const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tasktracker"
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;
