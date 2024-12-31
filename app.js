//  npm i dotenv graphql mongoose express express-graphql
const myrepository = require("./DB/myrepository.js");

// myrepository.getAllCars();

// myrepository.addNewCar({
//   namufacturer: "Subaru",
//   model: "Crosstech",
//   plate: "22ddf22",
//   year: 2025,
// });

// myrepository.deleteCarById("6773dd3ea76fbbbffbad866c");

myrepository.getCarById("6773dd2c80327f021ed5b72a").then((a) => {
  console.log(a);
});

// myrepository.addNewCarAndNewMember(
//   {
//     namufacturer: "Audi",
//     model: "rs5",
//     plate: "34343ffff",
//     year: 2025,
//   },
//   {
//     name: "Omri",
//     dl: "444444",
//   }
// );
