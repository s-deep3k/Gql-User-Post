const Comment={
    author(parent,args,ctx,into){
        return users.find((user)=> user.id === parent.author)
    },
    post(parent,args,ctx,into){
        return posts.find((post)=> post.id === parent.post)
    }
}
export {Comment as default}