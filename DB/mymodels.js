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

const membersSchema = new mongoose.Schema({
  name: String,
  dl: String, //driver license
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});
