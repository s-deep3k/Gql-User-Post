import {GraphQLServer} from 'graphql-yoga'
const users=[
    {
        id:"abc123",
        name:"Andrew Bhai",
        email:"hutt@bkl",
        age:"40"
    },
    {
        id:"abc345",
        name:"Satish Bhai",
        email:"hutt@bkl",
        age:"20"
    },
    {
        id:"abc789",
        name:"Waalo Bhai",
        email:"hutt@bkl"
    }
]
//Typedef (schema)
const typeDefs = `
    type Query {
        users(query:String!):[User!]!
        post:Post!      
    }
    type User{
        id:ID!
        name:String!
        email:String!,
        age:Int
    }
    type Post{
        id:ID!,
        title: String!,
        published: Boolean!,
        body:String
    }
`
//Resolvers
const resolvers ={
    Query:{
        users(parent,args,ctx,info){
            if (!args.query)
                return users
            return users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        post(parent,args,ctx,info)
        {
            return {
            id:'001',
            title:'Lol read this',
            published:true
        }
    }
    }
}
const server = new GraphQLServer({
    typeDefs,
    resolvers
})
server.start(()=>{
    console.log("GraphQl Server is up!");
})