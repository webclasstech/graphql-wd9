const carsAndMembersModels = require("./mymodels.js");
const Car = carsAndMembersModels.Car;
const Member = carsAndMembersModels.Member;

// ==========================================
const getAllCars = async () => {
  const x = await Car.find();
  console.log("getAllCars", x);
};
module.exports.getAllCars = getAllCars;

// ==========================================
// const addNewCar = async (carInfo) => {
//   const newCar = new Car(carInfo);
//   const x = await newCar.save();
//   console.log("addNewCar", x);
// };
// module.exports.addNewCar = addNewCar;

// ========================================== =
const addNewCar = async (carInfo, ownerInfo) => {
  // create new car (not yet inserting into the DB)
  const newCar = new Car(carInfo);

  // create new owner
  const newOwner = new Member(ownerInfo);
  // inserting the new member into the DB
  // (save === inserting into the DB )
  const y = await newOwner.save();
  console.log("Owner saved:", y);

  // both following ways will work correctly,
  // (both will insert ONLY the ObjrctId of the
  //      member into the member field of the car)
  // mongoose inferred it from the schema -
  // (we defined thet we wish to keep ObjectId in this field)
  newCar.member = y;
  //  newCar.member = new ObjectId(y._id);

  // inserting the new car into the DB
  // (save === inserting into the DB )
  const x = await newCar.save();
  console.log("Car saved", x);

  // Updating the new member with the new car's Id
  //   let arrOfCars = [...y.cars];
  //   arrOfCars.push(x._id);

  //   let newFieldsToUpdateInMember = {
  //     cars: arrOfCars,
  //   };
  // const z = Member.updateOne({ _id: y }, newFieldsToUpdateInMember);
  const z = Member.updateOne({ _id: y }, [...y.cars, x._id]);
  console.log("addNewCar Member including the new car data = ", z);
};
module.exports.addNewCar = addNewCar;
