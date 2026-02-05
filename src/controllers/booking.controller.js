const bookingService = require("../services/booking.service");
const carService = require("../services/car.service");
const userService = require("../services/user.service");

exports.createBookingHandler = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);

    res.status(201).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getBookingsHandler = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings(req.query);

    res.render("bookings/index", { bookings });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getBookingByIdHandler = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "Booking not found",
      });
    }

    res.json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.confirmBookingHandler = async (req, res) => {
  try {
    const booking = await bookingService.confirmBooking({
      bookingId: req.params.id,
      ...req.body,
    });

    res.json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getBookingSummaryHandler = async (req, res) => {
  try {
    const summary = await bookingService.getBookingSummary();

    res.json({
      status: "success",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.renderCreateBooking = async (req, res) => {
  try {
    const cars = await carService.getAllCars();
    const users = await userService.getAllUsers();
    res.render("bookings/create", { cars, users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
