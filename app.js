const express = require("express")
const path = require('path')
const { start } = require("repl")
const app = express()

app.use(express.static(path.join(__dirname, '/Public')))


/*
    1. set up a basic UI 🐹
    2.create post (seeding)🐹             - have content the user can see before using it
    3.display those posts on the webpage🐹
        a.create a path to send our data🐹
        b.fetch data from express🐹
        c.create html elements🐹
    4.be able to upvote and downvote posts🐹
        a. add arrows/buttons to our post🐹
        b. when you click a button it should add 1 to upvotes if its upvoted and subtract 1 if its downvoted (would this be done to push into the array)
            1. create an onclick function for our buttons🐹
            2. post to our express app that we need to update value
                a.figure ut what post is being updated🐹
                b.create routes to handle the request 🐹
                c. update the values🐹
            3. create routs for upvoting and downvoting 🐹
            4. convert ourt string to a number🐹
            5. Update upvote value in the array🐹
        c. hook up our buttons🐹
    5.view specific subreddits
        a. add navbar to html so user can select different subreddits
        b. create a route that returns posts from a specific subreddit
        c. display posts from subreddit on our webpage

    Last: CSS
*/


let posts = [
    {
        "id": "1",
        "upvotes": "100",
        "image": "https://m.media-amazon.com/images/I/610D6aQ-SYL.jpg",
        "title": "$100 billion dollar lottery winner",
        "author": "devan",
        "subreddit": "news"
    },
    {
        "id": "2",
        "upvotes": "300",
        "image": "https://m.media-amazon.com/images/I/610D6aQ-SYL.jpg",
        "title": "GTA 6 Announced",
        "author": "sarah",
        "subreddit": "gaming"
    },
    {
        "id": "3",
        "upvotes": "4123",
        "image": "https://m.media-amazon.com/images/I/610D6aQ-SYL.jpg",
        "title": "Andre 3000 New Album",
        "author": "Mehji",
        "subreddit": "music"
    },
    {
        "id": "4",
        "upvotes": "4123",
        "image": "https://m.media-amazon.com/images/I/610D6aQ-SYL.jpg",
        "title": "Big Snow Storm",
        "author": "pam",
        "subreddit": "weather"
    },
    {
        "id": "5",
        "upvotes": "244",
        "image": "https://m.media-amazon.com/images/I/610D6aQ-SYL.jpg",
        "title": "Building a house under a rock ledge",
        "author": "blackberry819",
        "subreddit": "news"
    }

]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/Public/reddit.html'))
    
})
//create a route that sends all posts
app.get("/posts", (req, res) =>{
    res.send(posts)
})

// //create a route for upvoting 
app.get("/upvote/:id", (req, res) => {
    const id = req.params.id

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id) {
            let upvotes = Number(posts[i].upvotes) //this converts string into a number
            upvotes = upvotes + 1
            posts[i].upvotes = upvotes.toString() //Will turn back into string
        }
    }

})


//create rout for downvoting 

app.get("/downvote/:id", (req, res) => {
    const id = req.params.id

    for(let i = 0; i < posts.length; i++){
        if(posts[i].id === id) {
            let downvotes = Number(posts[i].upvotes) 
            downvotes = downvotes - 1
            posts[i].upvotes = downvotes.toString()
        }
    }
})


app.get("/subreddit/:subreddit", (req, res) => {
    const subreddit = req.params.subreddit

    const subredditPosts = []

    for(let i = 0; i < posts.length; i++) {
        if(posts[i].subreddit === subreddit) {
            subredditPosts.push(posts[i])
        }
    }
    res.send(subredditPosts)
})






app.listen(3000)
console.log("Express app is running")