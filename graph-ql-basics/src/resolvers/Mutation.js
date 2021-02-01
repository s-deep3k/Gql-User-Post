import v4 from 'uuid'
const Mutation={
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
            return !match
        })
        comments = comments.filter((comment)=> comment.author !== args.id)
        const deletedUsers = users.splice(UserIndex,1)
        return deletedUsers[0]
    },
    deletePost(parent,args,ctx,info){
        const PostIndex = posts.findIndex((post)=>post.id ===args.id)
        if(PostIndex=== -1)
            throw new Error("No Post found with that id!")
        comments = comments.filter((comment)=> comment.post !== args.id)
        return posts.splice(PostIndex,1)[0]
    },
    deleteComment(parent,args,ctx,info){
        const CommentIndex = comments.findIndex((comment)=> comment.id === args.id)
        if(CommentIndex === -1)
            throw new Error("No Comment found with that id")
        return comments.splice(CommentIndex,1)[0]
    }
    }
export {Mutation as default}