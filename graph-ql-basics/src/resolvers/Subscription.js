const Subscription={
    // count:{
    //     subscribe(parent,args,{pubsub},info){
    //     let count = 0
    //     setInterval(()=>{
    //         count++
    //         pubsub.publish('count',{count}) // ei count object property = Subscription er under count property
    //     },1000)
    //     return pubsub.asyncIterator('count')
    //     }
    // },
    comment:{
        subscribe(parent,{postid},{db,pubsub},info){
            const post = db.posts.find((each)=> each.id === postid && each.published)
            if(!post)
                throw new Error("Post either not found or not published!")
            return pubsub.asyncIterator(`New comment of post , ID :${postid}`)
        }
    },
    post:{
        subscribe(parent,args,{db,pubsub},info){
            // const user = db.users.find((each)=>each.id === userid)
            // if(!user)
            //     throw new Error("No user found with that ID")
            return pubsub.asyncIterator(`New post !`)
        }
    }

}

export {Subscription as default}