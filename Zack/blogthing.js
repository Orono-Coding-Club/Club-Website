function post(date,text,attachments) {
    let element = document.createElement("div");

    let heldElement = document.createElement("h4");
    heldElement.textContent = date;
    heldElement.style.maxWidth = 50%
    element.append(heldElement);

    heldElement = document.createElement("p");
    heldElement.textContent = text;
    heldElement.style.maxWidth = 50%

    element.append(heldElement);
    // this code hurts my eyes, hopefully i never have to touch it again

    attachments.forEach(a => {

        heldElement = document.createElement(a.type);
        if (a.type == "video") {
            heldElement.controls = true;
            let heldHeldElement = document.createElement("source");
            heldHeldElement.src = a.link;
            heldElement.append(heldHeldElement);
        }
        else {
            heldElement.src = a.link;
        }
        heldElement.style.maxWidth = "50%";
        element.append(heldElement);
    })

    element.style.padding = "75px"
    document.getElementById("main").append(element);
}


post(
    "12/15/23",
    "Epic first post",
    [
        {
            "link": "https://rickroll.it/rickroll.mp4",
            "type": "video"
        }
    ]);