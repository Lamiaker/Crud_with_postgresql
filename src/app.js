const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

module.exports = app;
