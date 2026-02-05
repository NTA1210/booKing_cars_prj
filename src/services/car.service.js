const Car = require("../models/Car");
const Booking = require("../models/Booking");
const availabilityScheduleChecking = require("../utils/availability");

exports.getAllCars = async ({ status, startTime, endTime } = {}) => {
  let cars = await Car.find().populate("ownerId");

  if (status === "AVAILABLE" && startTime && endTime) {
    const bookings = await Booking.find();

    cars = cars.filter((car) =>
      availabilityScheduleChecking(car._id, startTime, endTime, bookings),
    );
  }

  return cars;
};

exports.getCarById = async (id) => {
  const car = await Car.findById(id);
  return car;
};

exports.createCar = async (carData) => {
  const car = await Car.create(carData);
  return car;
};

exports.updateCar = async (id, updateData) => {
  const car = await Car.findByIdAndUpdate(
    id,
    {
      name: updateData.name,
      price: updateData.price,
    },
    { new: true, runValidators: true },
  );

  return car;
};

exports.deleteCar = async (id) => {
  const hasBooking = await Booking.exists({ carId: id });

  if (hasBooking) {
    const error = new Error("Cannot delete car with existing bookings");
    error.statusCode = 409;
    throw error;
  }

  const car = await Car.findByIdAndDelete(id);
  return car;
};
