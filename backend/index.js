const express = require("express");
const server = express();
const errorHandler = require("./helpers/errorHandler")
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv/config");
const nodemon = require("nodemon");
const morgan = require("morgan");
const connectDB = require("./config/db");

// My Routers
const productRoutes = require("./routes/products");
const foodItemCategoryRoutes = require("./routes/foodCategory");
const groceryItemCategoryRoutes = require("./routes/groceryCategory");
const signupRoutes = require("./routes/signUp");
const signInRoutes = require("./routes/signIn");
const usersRoutes = require("./routes/users");

//Middle wares
server.use(morgan("tiny"));
server.use(bodyParser.json());
server.use(cors());

// Database connection
connectDB();

const api = process.env.API;

// Routes
server.use(api, productRoutes); // for all products.
server.use(api, foodItemCategoryRoutes); // for food category
server.use(api, groceryItemCategoryRoutes); // for grocery category
server.use(api, signupRoutes); // for signing/logging in of user
server.use(api, signInRoutes); // for registration/signing up of user
server.use(api, usersRoutes); // for user routes

server.use(errorHandler); // Custom error handler middleware.

server.get(api, (req, res) => {
    res.send("You got the response");
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`[PORT: ${process.env.PORT || 8080}] The server is up and running...`);
});
