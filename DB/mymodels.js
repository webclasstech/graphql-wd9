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
  model: String,
  year: Number,
  plate: String,
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

module.exports.Member = mongoose.model("Member", memberSchema);
module.exports.Car = mongoose.model("Car", carSchema);
