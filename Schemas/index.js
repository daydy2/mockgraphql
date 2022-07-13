const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql
const { resolve } = require("node:path/win32");
const UserType = require('./TypeDefs/UserType')
const userData = require('../Mock_data_self.json');

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return userData 
            }

        }
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args:{
                name: {type: GraphQLString},
                status: {type: GraphQLString},
                type: {type: GraphQLString}
            },
            resolve(parent, args){
                userData.push({id: userData.length + 1, name: args.name, status: args.status, type: args.type })
                return args
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery,mutation: Mutation})

