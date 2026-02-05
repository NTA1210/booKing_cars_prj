const userService = require("../services/user.service");
const bookingService = require("../services/booking.service");

exports.getUsersHandler = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.render("users/index", { users });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUserByIdHandler = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createUserHandler = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserBookingsHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookings = await bookingService.getBookings({ userId });

    res.json({
      status: "success",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getOwnerBookingsHandler = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const bookings = await bookingService.getBookings({ ownerId });

    res.json({
      status: "success",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.renderCreateUser = async (req, res) => {
  res.render("users/create");
};

exports.renderEditUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.render("users/edit", { user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
