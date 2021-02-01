const Query={
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
}
export {Query as default}