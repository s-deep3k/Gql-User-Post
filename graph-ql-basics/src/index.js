import {GraphQLServer} from 'graphql-yoga'
import v4 from 'uuid'
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
        author:'abc123',
        post:'001'
    },
    {
        id:'C02',
        text:'2nd comment here it goes',
        author:'abc345',
        post:'002'
    },
    {
        id:'C03',
        text:'3rd comment brrrrr',
        author:'abc123',
        post:'001'
    },
    {
        id:'C04',
        text:'4th comment is the end',
        author:'abc789',
        post:'003'
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
        comment:Comment!      
    }
    type Mutation{
        createPost(data:createPostInput):Post!
        createUser(data:createUserInput):User!
        createComment(data:createCommentInput):Comment!
        deletePost(id:ID!):Post!
        deleteUser(id:ID!):Post!
        deleteComment(id:ID!):Post!
    }
    input createPostInput{
        author:String!,title:String!,published:Boolean!,body:String!
    }
    input createUserInput{
        name:String!,email:String!,age:Int
    }
    input createCommentInput{
        text:String!,author:ID!,post:ID!
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
        comments:[Comment!]!
    }
    type Comment{
        id:ID!,
        text:String!,
        author: User!
        post:Post!
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
    }, 
    Mutation:{
        createPost(parent,args,ctx,info){
            const isUser = users.find((user)=> args.data.author === user.name)
            if(!isUser)
                throw new Error("No such User exists!")

            const post ={
                id:v4(),
                ...args.data
            }
            posts.push(post)
            return post

        },
    createUser(parent,args,ctx,info){
        const isEmail = users.some((user)=> args.data.email === user.email || args.data.name === user.name)
        if(isEmail)
            throw new Error("Email already exists!")

        const user ={
            id:v4(),
            ...args.data
        }
        users.push(user)
        return user
    },
    createComment(parent,args,ctx,info){
        const isAuthor = users.some((user)=> args.data.author === user.id)
        const isPost = posts.some((post)=> args.data.post === post.id && post.published) 
        if(!isPost || !isAuthor)
            throw new Error("Post/User doesnt exist!")

        const comment ={
            id:v4(),
            ...args.data
        }
        comments.push(comment)
        return comment
    },
    deleteUser(parent,args,ctx,info){
        const UserIndex = users.findIndex((user)=> user.id === args.id)
        if(UserIndex=== -1)
            throw new Error("No User Found!")
        posts = posts.filter((post)=>{
            const match = args.id === post.author
            if (match)
                comments = comments.filter((comment)=> comment.post !== post.id)
            comments = comments.filter((comment)=> comment.author !== post.author)
        const deletedUsers = users.splice(UserIndex,1)
        return deletedUsers[0]
        })
    }
},
    //parent means the original typedef. for.e.g Post and User here
    Post:{
        author(parent,args,ctx,info){
            return users.find((user)=> user.id === parent.author)
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment)=> comment.post === parent.id)
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
        },
        post(parent,args,ctx,into){
            return posts.find((post)=> post.id === parent.post)
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