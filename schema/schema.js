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
    member: {
      type: MemberType,
      resolve(parent, args) {
        // this code runs on mongoose, (not on graphql!!)
        // parent.member._id desribes in terms of graphql
        return myrepository.getMemberById(parent.member._id);
      },
    },
  }),
});

const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    name: { type: GraphQLString },
    dl: { type: GraphQLString },
    _id: { type: GraphQLString },
    // cars: { type: new GraphQLList(CarType) },
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
    member: {
      type: MemberType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, theArgs) {
        return myrepository.getMemberById(theArgs._id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
