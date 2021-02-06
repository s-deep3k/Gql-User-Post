const Subscription={
    count:{
        subscribe(parent,args,{pubsub},info){
        let count = 0
        setInterval(()=>{
            count++
            pubsub.publish('count',{count})
        },1000)
        return pubsub.asyncIterator('count')
        }
    },
    comment:{
        subscribe(parent,{postid},{db,pubsub},info){
            const post = db.posts.find((each)=> each.id === postid && each.published)
            if(!post)
                throw new Error("Post either not found or not published!")
            return pubsub.asyncIterator(`New comment of post , ID :${postid}`)
        }
    }
}

export {Subscription as default}