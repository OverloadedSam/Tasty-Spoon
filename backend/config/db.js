const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
            dbName: "food-ordering-app",
        });
        console.log("Connected to Database!");
    } catch (error) {
        console.log("Failed to connect the Database!!");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
