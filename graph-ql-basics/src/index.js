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
const comments=[
    {
        id:'C01',
        text:'This is the first comment yay',
        author:'abc123'
    },
    {
        id:'C02',
        text:'2nd comment here it goes',
        author:'abc345'
    },
    {
        id:'C03',
        text:'3rd comment brrrrr',
        author:'abc123'
    },
    {
        id:'C04',
        text:'4th comment is the end',
        author:'abc789'
    }
]
//Typedef (schema)
const typeDefs = `
    type Query {
        users(query:String):[User!]!
        posts(query:String):[Post!]!
        comments(query:String):[Comment!]!
        me:User!
        post:Post!      
    }
    type User{
        id:ID!
        name:String!
        email:String!,
        age:Int
        posts:[Post!]!
        comments:[Comment!]!
    }
    type Post{
        id:ID!,
        title: String!,
        published: Boolean!,
        body:String
        author: User!
    }
    type Comment{
        id:ID!,
        text:String!,
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
        },
        comments(parent,args,ctx,info){
            if (!args.query)
                return comments
            return comments.filter((comment)=>{
                return comment.text.toLowerCase().includes(args.query.toLowerCase())
            })
        }
    }, //parent means the original typedef. for.e.g Post and User here
    Post:{
        author(parent,args,ctx,info){
            return users.find((user)=> user.id === parent.author)
        }
    },
    User:{
        posts(parent,args,ctx,info){
            return posts.filter((post)=>{
                return post.author===parent.id
            })
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment)=>{
                return comment.author===parent.id
            })
        }
    },
    Comment:{
        author(parent,args,ctx,into){
            return users.find((user)=> user.id === parent.author)
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