const carService = require("../services/car.service");
const User = require("../models/User");

exports.getCarsHandler = async (req, res) => {
  try {
    const cars = await carService.getAllCars(req.query);

    // res.json({
    //   status: "success",
    //   data: cars,
    // });

    return res.render("cars/index", { cars });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCarByIdHandler = async (req, res) => {
  try {
    const car = await carService.getCarById(req.params.id);

    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
      });
    }

    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createCarHandler = async (req, res) => {
  try {
    const car = await carService.createCar(req.body);

    res.status(201).json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateCarHandler = async (req, res) => {
  try {
    const car = await carService.updateCar(req.params.id, req.body);

    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
      });
    }

    res.json({
      status: "success",
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteCarHandler = async (req, res) => {
  try {
    const car = await carService.deleteCar(req.params.id);

    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Car not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.renderCreateCar = async (req, res) => {
  try {
    const users = await User.find();
    res.render("cars/create", { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.renderEditCar = async (req, res) => {
  try {
    const car = await carService.getCarById(req.params.id);
    const users = await User.find();
    if (!car) return res.status(404).send("Car not found");
    res.render("cars/edit", { car, users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
