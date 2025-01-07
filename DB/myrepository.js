const carsAndMembersModels = require("./mymodels.js");
const Car = carsAndMembersModels.Car;
const Member = carsAndMembersModels.Member;

// ==========================================
const getAllCars = async () => {
  const x = await Car.find();
  console.log("getAllCars", x);
  return x;
};
module.exports.getAllCars = getAllCars;

// ==========================================
const addNewCar = async (carInfo) => {
  try {
    const newCar = new Car(carInfo);
    const x = await newCar.save();
    console.log("addNewCar", x);
  } catch (err) {
    console.error("Error while adding a new car: ", err);
  }
};
module.exports.addNewCar = addNewCar;

// ========================================== =
const addNewCarAndNewMember = async (carInfo, ownerInfo) => {
  try {
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

    // Update the owner's cars array
    let arrOfCars = [...y.cars];
    arrOfCars.push(x._id);

    const z = Member.updateOne({ _id: y }, { cars: arrOfCars });

    console.log("addNewCar Member including the new car data = ", z);
  } catch (err) {
    console.error("Error while adding new car and owner: ", err);
  }
};
module.exports.addNewCarAndNewMember = addNewCarAndNewMember;

// ==========================================

const updateCarById = async (theIdOfTheCarToUpdate, carInfo) => {
  try {
    const x = await Car.updateOne({ _id: theIdOfTheCarToUpdate }, carInfo);
    console.log("updateCarById", x);
  } catch (err) {
    console.error("Error while updating a new car: ", err);
  }
};
// const updateCarById = async (carInfo) => {
//   try {
//     const x = await Car.updateOne({ _id: carInfo._id }, carInfo);
//     console.log("updateCarById", x);
//   } catch (err) {
//     console.error("Error while updating car: ", err);
//   }
// };
module.exports.updateCarById = updateCarById;

// ===================================================
const deleteCarById = async (theIdOfCar) => {
  try {
    const x = await Car.deleteOne({ _id: theIdOfCar });
    console.log("deleteCarById", x);
  } catch (err) {
    console.error("Error while deleteing car: ", err);
  }
};
module.exports.deleteCarById = deleteCarById;
// ===================================================

const getCarById = async (theIdOfCar) => {
  try {
    let x = await Car.findOne({ _id: theIdOfCar });
    console.log("getCarById", x);
    return x;
  } catch (err) {
    console.error("Error while getCarById car: ", err);
  }
};
module.exports.getCarById = getCarById;

// ===================================================

const getMemberById = async (theIdOfMember) => {
  try {
    let x = await Member.findOne({ _id: theIdOfMember });
    console.log("getMemberById", x);
    return x;
  } catch (err) {
    console.error("Error while getMemberById member: ", err);
  }
};
module.exports.getMemberById = getMemberById;

// ===================================================
const getAllCarsByMemberId = async (theMemberId) => {
  try {
    const x = await Car.find({ member: { _id: theMemberId } });
    return x;
  } catch (err) {
    console.error("Error while getAllCarsByMemberId member: ", err);
  }
};
module.exports.getAllCarsByMemberId = getAllCarsByMemberId;
