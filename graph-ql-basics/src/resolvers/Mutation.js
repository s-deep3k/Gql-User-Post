import v4 from 'uuid'
const Mutation={
        createPost(parent,args,{db,pubsub},info){
            const isUser = db.users.find((user)=> args.data.author === user.id)
            if(!isUser)
                throw new Error("No such User exists!")

            const post ={
                id:v4(),
                ...args.data
            }
            db.posts.push(post)
            if(post.published)
                pubsub.publish(`New post !`,{
                    post:{
                        mutation:"CREATED",
                        data:post
                    }
                })
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
    createComment(parent,args,{db,pubsub},info){
        const isAuthor = db.users.some((user)=> args.data.author === user.id)
        const isPost = db.posts.some((post)=> args.data.post === post.id && post.published) 
        if(!isPost || !isAuthor)
            throw new Error("Post/User doesnt exist!")

        const comment ={
            id:v4(),
            ...args.data
        }
        db.comments.push(comment)
        pubsub.publish(`New comment of post , ID :${args.data.post}`,{comment})     //comment object property is the same name as the property under Subscription
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
    deletePost(parent,args,{db,pubsub},info){
        const PostIndex = db.posts.findIndex((post)=>post.id ===args.id)
        if(PostIndex=== -1)
            throw new Error("No Post found with that id!")
        db.comments = db.comments.filter((comment)=> comment.post !== args.id)
        const [post] = db.posts.splice(PostIndex,1)
        if(post.published)
            pubsub.publish(`New post !`,{
                post:{
                    mutation:'DELETED',
                    data:post
                }
            })
        return post
    },
    deleteComment(parent,args,{db},info){
        const CommentIndex = db.comments.findIndex((comment)=> comment.id === args.id)
        if(CommentIndex === -1)
            throw new Error("No Comment found with that id")
        return db.comments.splice(CommentIndex,1)[0]
    },
    updateUser(parent,args,{db},info){
        const user = db.users.find((each)=>each.id === args.id )
        if(!user)
            throw new Error("No User with that ID!")
        const isEmail = db.users.some((user)=> args.data.email === user.email )
        if(isEmail)
            throw new Error("Email already exists!")
        if(args.data.age != undefined && args.data.age > 0 && typeof args.data.age == 'int')
            user.age= args.data.age
        if (typeof args.data.name == 'string')
            user.name = args.data.name
        if (typeof args.data.email == 'string')
            user.email = args.data.email
        return user
    },
    updatePost(parent,args,{db,pubsub},info){
        const post = db.posts.find((each)=> each.id === args.id)
        const originalPost = {...post}
        if(!post)
            throw new Error("No Post with that ID!")
        if (typeof args.data.title == 'string')
            post.title =args.data.title
        if (typeof args.data.published == 'boolean')    
            post.published = args.data.published
        if (typeof args.data.body == 'string')    
            post.body = args.data.body

        if (originalPost.published && !post.published)
          {  pubsub.publish(`New post !`,{
            post:{
                mutation:'CREATED',
                data:post
            }
        })}
        else if(!originalPost.published && post.published)
        {pubsub.publish(`New post !`,{
            post:{
                mutation:'DELETED',
                data:post
            }
        })}
        else
        {pubsub.publish(`New post !`,{
            post:{
                mutation:'UPDATED',
                data:post
            }
        })}
        return post
    },
    updateComment(parent,args,{db},info){
        const comment = db.comments.find((comment)=> comment.id === args.id)
        if(!comment)
            throw new Error("No Comment with that ID!")
        if (typeof args.data.name == 'string')
            comment.text = args.data.text
        return comment
    }
}
export {Mutation as default}