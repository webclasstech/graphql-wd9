const carsAndMembersModels = require("./mymodels.js");
const Car = carsAndMembersModels.Car;
const Member = carsAndMembersModels.Member;

const getAllCars = async () => {
  const x = await Car.find();
  console.log("getAllCars", x);
};

module.exports.getAllCars = getAllCars;
