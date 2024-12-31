//  npm i dotenv graphql mongoose express express-graphql
const myrepository = require("./DB/myrepository.js");

// myrepository.getAllCars();

// myrepository.addNewCar({
//   namufacturer: "Subaru",
//   model: "Imprezas",
//   plate: "54782tg",
//   year: 2020,
// });

myrepository.addNewCar(
  {
    namufacturer: "Audi",
    model: "rs5",
    plate: "34343ffff",
    year: 2025,
  },
  {
    name: "Omri",
    dl: "444444",
  }
);
