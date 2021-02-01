import v4 from 'uuid'
const Mutation={
        createPost(parent,args,{db},info){
            const isUser = db.users.find((user)=> args.data.author === user.name)
            if(!isUser)
                throw new Error("No such User exists!")

            const post ={
                id:v4(),
                ...args.data
            }
            db.posts.push(post)
            return post

        },
    createUser(parent,args,{db},info){
        const isEmail = db.users.some((user)=> args.data.email === user.email || args.data.name === user.name)
        if(isEmail)
            throw new Error("Email already exists!")

        const user ={
            id:v4(),
            ...args.data
        }
        db.users.push(user)
        return user
    },
    createComment(parent,args,{db},info){
        const isAuthor = db.users.some((user)=> args.data.author === user.id)
        const isPost = db.posts.some((post)=> args.data.post === post.id && post.published) 
        if(!isPost || !isAuthor)
            throw new Error("Post/User doesnt exist!")

        const comment ={
            id:v4(),
            ...args.data
        }
        db.comments.push(comment)
        return comment
    },
    deleteUser(parent,args,{db},info){
        const UserIndex = db.users.findIndex((user)=> user.id === args.id)
        if(UserIndex=== -1)
            throw new Error("No User Found!")
        db.posts = db.posts.filter((post)=>{
            const match = args.id === post.author
            if (match)
                db.comments = db.comments.filter((comment)=> comment.post !== post.id)
            return !match
        })
        db.comments = db.comments.filter((comment)=> comment.author !== args.id)
        const deletedusers = db.users.splice(UserIndex,1)
        return deletedusers[0]
    },
    deletePost(parent,args,{db},info){
        const PostIndex = db.posts.findIndex((post)=>post.id ===args.id)
        if(PostIndex=== -1)
            throw new Error("No Post found with that id!")
        db.comments = db.comments.filter((comment)=> comment.post !== args.id)
        return db.posts.splice(PostIndex,1)[0]
    },
    deleteComment(parent,args,{db},info){
        const CommentIndex = db.comments.findIndex((comment)=> comment.id === args.id)
        if(CommentIndex === -1)
            throw new Error("No Comment found with that id")
        return db.comments.splice(CommentIndex,1)[0]
    }
    }
export {Mutation as default}