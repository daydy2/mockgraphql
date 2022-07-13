const graphql = require("graphql");
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        status: {type: GraphQLString},
        date: {type: GraphQLString},
    })
})

module.exports = UserType