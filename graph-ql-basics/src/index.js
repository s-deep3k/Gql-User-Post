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
        email:"yo@bkl",
        age:"20"
    },
    {
        id:"abc789",
        name:"Waalo Bhai",
        email:"gone@bkl"
    }
]
const posts=[
    {
        id:"001",
        title:"Post 1",
        published: true,
        author:'abc123',
        body:"What do you think about the first post huh?"
    },
    {
        id:"002",
        title:"Post 2",
        published: true,
        author:'abc123',
        body:"What do you think about the 2nd post huh?"

    },
    {
        id:"003",
        title:"Post 3",
        published: false,
        author:'abc789',
        body:"What do you think about the 3rd post huh?"

    }
]
//Typedef (schema)
const typeDefs = `
    type Query {
        users(query:String!):[User!]!
        posts(query:String!):[Post!]!
        me:User!
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
        author: User!
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
        posts(parent,args,ctx,info)
        {
            if (!args.query)
                return posts
            return posts.filter((post)=>{
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()) 
            })
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