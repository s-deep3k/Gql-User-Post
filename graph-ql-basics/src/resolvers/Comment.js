const Comment={
    author(parent,args,{db},into){
        return db.users.find((user)=> user.id === parent.author)
    },
    post(parent,args,{db},into){
        return db.posts.find((post)=> post.id === parent.post)
    }
}
export {Comment as default}