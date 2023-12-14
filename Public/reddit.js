fetch("/posts")
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)
    displayPosts(json)
})
.catch((error) => {
    console.log("There is an error", error)
})

function upvote(id){
 console.log("Upvoted!")
    fetch(`/upvote/${id}`)
    .then((response) => {
        return response.json
    })
    .then((json) => {
    
    })

    const upvoteTag = document.getElementById(id)
    upvoteTag.innerText = Number(upvoteTag.innerText) +1
}


function downvote(id){
    console.log("Downvoted!")
    fetch(`/downvote/${id}`)
    .then((response) => {
        return response.json
    })
    .then((json) => {
    
    })
    
    const upvoteTag = document.getElementById(id)
    upvoteTag.innerText = Number(upvoteTag.innerText)  - 1 //variable can stay the same - only difference is -1
}


function getPostsBySubreddit(subreddit) {
    fetch(`/subreddit/${subreddit}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        displayPosts(json)
    })
    .catch((error) => {
        console.log(error)
    })
}

function displayPosts(json) {

    const postContainer = document.getElementById("post-container")
    postContainer.innerHTML = ""   ///empties the array before display and allows to see specific subreddits

    json.forEach((post) => {
    
        //get the post information
        const postTitle = post.title
        const postImage = post.image
        const postUpvotes = post.upvotes 
        const postAuthor = post.author 
        const postSubreddit = post.subreddit 
        const postId = post.id
    
        console.log(postId)
    
        //create HTML Elements 
        let postDiv = document.createElement("div")
        let postUpvoteTag = document.createElement("p")
        let postImg = document.createElement("img")
        let postInfoDiv = document.createElement("div")
        let postTitleTag = document.createElement("h1")
        let postDetailDiv = document.createElement("div")
        let postAuthorTag = document.createElement("p")
        let postSubredditTag = document.createElement("p")
        let upvoteContainerDiv = document.createElement("div")
        let upvoteButton = document.createElement("button")
        let downvoteButton = document.createElement("button")
    
        //format our html
        upvoteContainerDiv.appendChild(upvoteButton)
        upvoteContainerDiv.appendChild(postUpvoteTag)
        upvoteContainerDiv.appendChild(downvoteButton)
    
        //Format our html
        postDiv.appendChild(upvoteContainerDiv)
        postDiv.appendChild(postImg)
        postDiv.appendChild(postInfoDiv)
    
        postInfoDiv.appendChild(postTitleTag)
        postInfoDiv.appendChild(postDetailDiv)
    
        postDetailDiv.appendChild(postAuthorTag)
        postDetailDiv.appendChild(postSubredditTag)
    
        postUpvoteTag.id = postId
    
        //add classes to our html elements
        postDiv.classList.add("post")
        postUpvoteTag.classList.add("upvotes")
        postImg.classList.add("post-image")
        postInfoDiv.classList.add("post-info")
        postTitleTag.classList.add("post-title")
        postDetailDiv.classList.add("post-details")
        postAuthorTag.classList.add("post-author")
        postSubredditTag.classList.add("post-subreddit")
        upvoteContainerDiv.classList.add("upvote-container")
    
        //put our info in our tags
        postUpvoteTag.innerText = postUpvotes
        postImg.src = postImage
        postTitleTag.innerText = postTitle
        postAuthorTag.innerText = postAuthor
        postSubredditTag.innerText = postSubreddit
        upvoteButton.innerText = "Upvote"
        downvoteButton.innerText = "Donwvote"
    
        //add functionality to our buttons
        upvoteButton.setAttribute("onclick", `upvote(${postId})`);
        downvoteButton.setAttribute("onclick", `downvote(${postId})`);
    
        //put our post on the page
        
        postContainer.appendChild(postDiv)
})
}