let users=[
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
let posts=[
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
let comments=[
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
let db ={ users,posts,comments}
export {db as default} 