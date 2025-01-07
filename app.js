//  npm i dotenv graphql mongoose express express-graphql
const myrepository = require("./DB/myrepository.js");

const express = require("express");
const app = express();

const expressGraphql = require("express-graphql");

const { graphqlHTTP } = expressGraphql;

const theSchema = require("./schema/schema.js");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: theSchema,
    graphiql: true,
  })
);
app.use(express.static("public"));
const thePort = process.env.PORT || 14444;
app.listen(thePort, () => {
  console.log("Server is listenning on port: ", thePort);
});
//==================================================
// myrepository.getAllCars();

// myrepository.addNewCar({
//   namufacturer: "Subaru",
//   model: "Crosstech",
//   plate: "22ddf22",
//   year: 2025,
// });

// myrepository.deleteCarById("6773dd3ea76fbbbffbad866c");

// myrepository.getCarById("6773dd2c80327f021ed5b72a").then((a) => {
//   //console.log(a);
// });

// myrepository
//   .updateCarById("6773dd2c80327f021ed5b72a", {
//     manufacturer: "Subaru",
//     model: "Crosstech",
//     year: 2020,
//     plate: "22dd220",
//   })
//   .then(() => {
//     myrepository.getCarById("6773dd2c80327f021ed5b72a").then((a) => {
//       console.log(a);
//     });
//   });

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
