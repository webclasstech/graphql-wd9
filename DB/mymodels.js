require("dotenv").config();

const mongoose = require("mongoose");

// Testing connection to MongoDB
const connectAtlas = () => {
  mongoose
    .connect(process.env.ATLAS_CONNECT_STR)
    .then(() => {
      console.log("success - connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error while trying to connect to MongoDB", err);
    });
};
connectAtlas();

const memberSchema = new mongoose.Schema({
  name: String,
  dl: String, //driver license
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const carSchema = new mongoose.Schema({
  manufacture: String,
  model: {
    type: String,
    minLength: 2,
    maxLength: 30,
    validate: {
      validator: (val) => {
        let condition1 = val.includes("s");
        let condition2 = val.length < 30;
        return condition1 && condition2;
      },
      message: "value for model must include 's' and be 2-30 characters",
    },
  },
  year: { type: Number, min: 1920, max: 2025 },
  plate: String,
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

module.exports.Member = mongoose.model("Member", memberSchema);
module.exports.Car = mongoose.model("Car", carSchema);
