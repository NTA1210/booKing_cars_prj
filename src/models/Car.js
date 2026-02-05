const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Car", carSchema);
