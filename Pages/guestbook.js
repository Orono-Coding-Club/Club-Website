// let commentdata  = [
//     {
//         username: "username",
//         time: "2/8/24 6:19pm",
//         text: "uhhhhhh idk test text i guess"
//     }

// ]
async function fetchCommentData(){
    //let url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://ljz64d9w-3000.use.devtunnels.ms/getcomments") // this one works, but microsoft is stupid so it doesn't work
    //let url = await fetch("http://localhost:3000/getcomments")
    //let url = await fetch("http://thingproxy.freeboard.io/fetch/https://ljz64d9w-3000.use.devtunnels.ms/getcomments")
    //let url = "https://corsproxy.io/?" + encodeURIComponent("https://s6htstwm-3000.use.devtunnels.ms/getcomments") // this one doesn't update for some reason?
    let url = "https://s6htstwm-3000.use.devtunnels.ms/getcomments"
    let commentdata = await fetch(url)
    commentdata = await commentdata.text()
    commentdata = JSON.parse(commentdata).data
    console.log("New comment data:")
    console.log(commentdata)
    console.log(`Type: ${typeof commentdata}`)
    console.log(`Fetched from ${url}`)
    commentdata.reverse()
    return commentdata
}

let commentdata = await fetchCommentData()
const commentthing = document.getElementById("comments")



for (let i = 0; i < commentdata.length; i++) {
    let comment = document.createElement("div")
    comment.id = `comment${i}`

    let heldelement = document.createElement("img")
    heldelement.id = `commentimage${i}`
    heldelement.src = "/Assets/person icon.svg"
    //heldelement.style.border = "solid"
    heldelement.style.float = "left"
    heldelement.style.paddingLeft = "20%"
    heldelement.style.width = "5%"
    // comment user image thing, idk
    comment.appendChild(heldelement)

    heldelement = document.createElement("div")
    heldelement.id = `commentspacer${i}`
    heldelement.style.padding = "9px 15px"
    // spacer between the pfp and the username
    comment.appendChild(heldelement)

    heldelement = document.createElement("h4")
    heldelement.id = `commentname${i}`
    heldelement.textContent = `${commentdata[i].username}, ${new Date(+ commentdata[i].time).toString()}`
    heldelement.style.textAlign = "left"
    heldelement.style.paddingLeft = "26.5%"
    // comment username
    comment.appendChild(heldelement)

    heldelement = document.createElement("p")
    heldelement.id = `commenttext${i}`
    heldelement.textContent = commentdata[i].text
    heldelement.style.textAlign = "left"
    heldelement.style.paddingLeft = "25%"
    // comment text
    comment.appendChild(heldelement)

    heldelement = document.createElement("div")
    heldelement.id = `commentspacer${i}-2`
    heldelement.style.padding = "35px 15px"
    // spacer thingy so all the comments aren't right next to each other
    comment.appendChild(heldelement)

    commentthing.appendChild(comment)
}



const form = document.getElementById("commentstuff")

async function submitformandstuff(e) { // weird name to prevent accidentally overlapping with an existing function or whatever
    e.preventDefault();
    const nameInput = document.getElementById("username")
    let name = nameInput.value
    const commentstuff = document.getElementById("commentinput")
    let comment = commentstuff.value
    let toPost = {
        "username": name,
        "text": comment,
        "time": Date.now().toString()
    }
    toPost = new URLSearchParams(toPost).toString()
    //let toPostURL = `localhost:3000/${toPost}`
    //let toPostURL = "https://thingproxy.freeboard.io/fetch/" + `https://ljz64d9w-3000.use.devtunnels.ms/postcomment?${toPost}` // https://ljz64d9w-3000.use.devtunnels.ms/ Note to self: swap for other domain.
    let toPostURL = "https://corsproxy.io/?" + encodeURIComponent(`https://s6htstwm-3000.use.devtunnels.ms/postcomment?${toPost}`)
    console.log(`Sending comment to toPostURL`)

    await fetch(toPostURL) // do the thing
    nameInput.value = ""
    commentstuff.value = ""
    commentdata = await fetchCommentData()

    const warningThing = document.getElementById("warning")
    let newElement = document.createElement("h4")
    newElement.textContent = "ok so like your comment got posted and stuff, but corsproxy.io is weird and doesn't actually fetch the data so you aren't gonna see your comment and neither is anyone else"
    warningThing.appendChild(newElement)

}

form.onsubmit = submitformandstuff


// me am pro full stack dev real not clickbait