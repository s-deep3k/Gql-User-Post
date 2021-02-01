import {GraphQLServer} from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
    //parent means the original typedef. for.e.g Post and User here
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        Post,
        User,
        Comment
    },
    context:{
        db:'./src/db.js'
    }
})
server.start(()=>{
    console.log("GraphQl Server is up!");
})