const express = require("express");
const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv/config");
const nodemon = require("nodemon");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

// My Routers
const foodItemRoutes = require("./routes/foodItems");
const foodItemCategoryRoutes = require("./routes/foodCategory");
const signupRoutes = require("./routes/signUp");
const usersRoutes = require("./routes/users");

//Middle wares
server.use(morgan("tiny"));
server.use(bodyParser.json());

// Database connection
mongoose
    .connect(`${process.env.DB_CONNECTION_STRING}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "food-ordering-app",
    })
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((error) => {
        console.log("Failed to connect the Database!!");
        console.log(error);
    });

const api = process.env.API;

// Routes
server.use(api, foodItemRoutes);
server.use(api, foodItemCategoryRoutes);
server.use(api, signupRoutes);
server.use(api, usersRoutes);

server.get(api, (req, res) => {
    res.send("You got the response");
});

// Listener
server.listen(process.env.PORT, () => {
    console.log(`[PORT: ${process.env.PORT}] The server is up and running...`);
});
