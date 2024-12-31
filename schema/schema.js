const myrepository = require("../DB/myrepository.js");

const graphql = require("graphql");
// console.log(graphql.GraphQLObjectType);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    manufacturer: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    plate: { type: GraphQLString },
    _id: { type: GraphQLString },
    // member: { type: MemberType },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "MyRootQuery",
  fields: () => ({
    car: {
      type: CarType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, theArgs) {
        return myrepository.getCarById(theArgs._id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
