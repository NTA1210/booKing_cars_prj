require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/connection");
const User = require("../models/User");
const Car = require("../models/Car");
const Booking = require("../models/Booking");
const Contract = require("../models/Contract");

const seedData = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing old data...");
    await Contract.deleteMany();
    await Booking.deleteMany();
    await User.deleteMany();
    await Car.deleteMany();

    console.log("👤 Seeding users...");
    const users = await User.insertMany([
      { name: "User One", role: "USER" },
      { name: "User Two", role: "USER" },
      { name: "Anh Nguyen", role: "ADMIN" },
      { name: "Owner Four", role: "ADMIN" },
      { name: "Renter Five", role: "USER" },
    ]);

    console.log("🚗 Seeding cars...");
    const cars = await Car.insertMany([
      { ownerId: users[2]._id, name: "Toyota Camry", price: 100000 },
      { ownerId: users[3]._id, name: "Honda Civic", price: 90000 },
      { ownerId: users[2]._id, name: "Mazda 3", price: 95000 },
      { ownerId: users[3]._id, name: "BMW 320i", price: 150000 },
      { ownerId: users[2]._id, name: "Mercedes C200", price: 160000 },
      { ownerId: users[3]._id, name: "Ford Mustang", price: 200000 },
      { ownerId: users[2]._id, name: "Nissan Altima", price: 85000 },
    ]);

    console.log("📅 Seeding bookings...");
    const bookings = await Booking.insertMany([
      {
        userId: users[0]._id,
        ownerId: cars[0].ownerId,
        carId: cars[0]._id,
        startTime: new Date("2025-01-01"),
        endTime: new Date("2025-01-02"),
        rentalCost: 100000,
        status: "PENDING",
      },
      {
        userId: users[1]._id,
        ownerId: cars[1].ownerId,
        carId: cars[1]._id,
        startTime: new Date("2025-01-03"),
        endTime: new Date("2025-01-04"),
        rentalCost: 90000,
        status: "CONFIRMED",
      },
      {
        userId: users[0]._id,
        ownerId: cars[0].ownerId,
        carId: cars[0]._id,
        startTime: new Date("2025-01-05"),
        endTime: new Date("2025-01-06"),
        rentalCost: 100000,
        status: "CANCELLED",
      },
      {
        userId: users[4]._id,
        ownerId: cars[2].ownerId,
        carId: cars[2]._id,
        startTime: new Date("2025-01-07"),
        endTime: new Date("2025-01-08"),
        rentalCost: 95000,
        status: "CONFIRMED",
      },
      {
        userId: users[4]._id,
        ownerId: cars[3].ownerId,
        carId: cars[3]._id,
        startTime: new Date("2025-01-09"),
        endTime: new Date("2025-01-10"),
        rentalCost: 150000,
        status: "PENDING",
      },
      {
        userId: users[1]._id,
        ownerId: cars[4].ownerId,
        carId: cars[4]._id,
        startTime: new Date("2025-01-11"),
        endTime: new Date("2025-01-12"),
        rentalCost: 160000,
        status: "CONFIRMED",
      },
      {
        userId: users[0]._id,
        ownerId: cars[5].ownerId,
        carId: cars[5]._id,
        startTime: new Date("2025-01-13"),
        endTime: new Date("2025-01-14"),
        rentalCost: 200000,
        status: "PENDING",
      },
    ]);

    console.log("📄 Seeding contracts...");
    await Contract.insertMany([
      {
        bookingId: bookings[0]._id,
        userId: bookings[0].userId,
        carId: bookings[0].carId,
        ownerId: bookings[0].ownerId,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-01-02"),
        totalPrice: 100000,
        status: "ACTIVE",
      },
      {
        bookingId: bookings[1]._id,
        userId: bookings[1].userId,
        carId: bookings[1].carId,
        ownerId: bookings[1].ownerId,
        startDate: new Date("2025-01-03"),
        endDate: new Date("2025-01-04"),
        totalPrice: 90000,
        status: "COMPLETED",
      },
      {
        bookingId: bookings[3]._id,
        userId: bookings[3].userId,
        carId: bookings[3].carId,
        ownerId: bookings[3].ownerId,
        startDate: new Date("2025-01-07"),
        endDate: new Date("2025-01-08"),
        totalPrice: 95000,
        status: "ACTIVE",
      },
      {
        bookingId: bookings[4]._id,
        userId: bookings[4].userId,
        carId: bookings[4].carId,
        ownerId: bookings[4].ownerId,
        startDate: new Date("2025-01-09"),
        endDate: new Date("2025-01-10"),
        totalPrice: 150000,
        status: "CANCELLED",
      },
      {
        bookingId: bookings[5]._id,
        userId: bookings[5].userId,
        carId: bookings[5].carId,
        ownerId: bookings[5].ownerId,
        startDate: new Date("2025-01-11"),
        endDate: new Date("2025-01-12"),
        totalPrice: 160000,
        status: "COMPLETED",
      },
      {
        bookingId: bookings[6]._id,
        userId: bookings[6].userId,
        carId: bookings[6].carId,
        ownerId: bookings[6].ownerId,
        startDate: new Date("2025-01-13"),
        endDate: new Date("2025-01-14"),
        totalPrice: 200000,
        status: "ACTIVE",
      },
    ]);

    console.log("✅ Seed data completed");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedData();
