const User = require("../models/User");

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.createUser = async (userData) => {
  return await User.create({
    name: userData.name,
  });
};
