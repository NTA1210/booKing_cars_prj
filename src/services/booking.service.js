const Booking = require("../models/Booking");
const Car = require("../models/Car");
const Contract = require("../models/Contract");
const availabilityScheduleChecking = require("../utils/availability");
const { paramsValidator } = require("../utils/bookingValidator");
const calculateRentalCost = require("../utils/pricing");

exports.createBooking = async (bookingData) => {
  const { userId, carId, sTime, eTime } = paramsValidator(bookingData);

  const conflictBookings = await Booking.findOne({
    carId,
    $or: [
      { startTime: { $lt: eTime, $gte: sTime } },
      { endTime: { $gt: sTime, $lte: eTime } },
      { startTime: { $lte: sTime }, endTime: { $gte: eTime } },
    ],
    status: { $in: ["PENDING", "CONFIRMED"] },
  });

  // const isAvailable = availabilityScheduleChecking(
  //   carId,
  //   sTime,
  //   eTime,
  //   bookings,
  // );

  if (conflictBookings) {
    const error = new Error("Car not available");
    error.statusCode = 409;
    throw error;
  }

  const car = await Car.findById(carId);
  if (!car) {
    const error = new Error("Car not found");
    error.statusCode = 404;
    throw error;
  }

  const rentalCost = calculateRentalCost(sTime, eTime, car.price);

  const booking = await Booking.create({
    userId,
    ownerId: car.ownerId,
    carId,
    startTime: sTime,
    endTime: eTime,
    rentalCost,
  });

  return booking;
};

exports.getBookings = async (query) => {
  const filter = {};
  if (query.userId) filter.userId = query.userId;
  if (query.ownerId) filter.ownerId = query.ownerId;

  return await Booking.find(filter).populate("userId").populate("carId");
};

exports.getBookingById = async (id) => {
  return await Booking.findById(id).populate("userId").populate("carId");
};

exports.confirmBooking = async ({ bookingId, status, ownerId, role }) => {
  if (role !== "ADMIN") {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  const existedContract = await Contract.findOne({ bookingId });
  if (existedContract) {
    const error = new Error("Booking already confirmed");
    error.statusCode = 409;
    throw error;
  }

  booking.status = status;
  await booking.save();

  if (status === "CONFIRMED") {
    await Contract.create({
      bookingId: booking._id,
      userId: booking.userId,
      carId: booking.carId,
      startDate: booking.startTime,
      endDate: booking.endTime,
      ownerId,
      totalPrice: booking.rentalCost,
      status: "ACTIVE",
    });
  }

  console.log(booking);

  return booking;
};

exports.getBookingSummary = async () => {
  const totalBookings = await Booking.countDocuments();
  const confirmedBookings = await Booking.find({
    status: "CONFIRMED",
  });
  const pendingBookings = await Booking.find({ status: "PENDING" });
  const cancelledBookings = await Booking.find({
    status: "CANCELLED",
  });

  return {
    totalBookings,
    bookings: {
      confirmed: { confirmedBookings, total: confirmedBookings.length },
      pending: { pendingBookings, total: pendingBookings.length },
      cancelled: { cancelledBookings, total: cancelledBookings.length },
    },
  };
};
