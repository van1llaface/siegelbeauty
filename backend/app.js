const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");
const menuRouter = require("./routes/menuRoutes");
const foodRouter = require("./routes/foodRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/menus", menuRouter);
app.use("/foods", foodRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);

module.exports = app;
