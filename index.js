const express = require ("express");
const app = express();
const PORT = 5000; 
const userData = require('./Mock_data_self.json');
const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql
const {graphqlHTTP} = require("express-graphql");
const { resolve } = require("node:path/win32");

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

const schema = new GraphQLSchema({query: RootQuery,mutation: Mutation})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(PORT,() => {console.log("Server is running")});
