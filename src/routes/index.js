const express = require("express");
const userRoute = require("./users.route");
const carRoute = require("./cars.route");
const bookingRoute = require("./bookings.route");
const appRouter = express.Router();

appRouter.use("/users", userRoute);
appRouter.use("/cars", carRoute);
appRouter.use("/bookings", bookingRoute);

module.exports = appRouter;
