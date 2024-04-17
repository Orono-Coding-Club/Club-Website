export default class Input {
    constructor(game) {
        this.game = game
        this.mouseX = 0
        this.mouseY = 0
        this.mouseL = false
        this.mouseR = false
        document.addEventListener("mousemove", e => {
            let rect = e.target.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left
            this.mouseY = e.clientY - rect.top
        });

        document.addEventListener("mousedown", e => {
            /* 
            0 = left
            1 = middle
            2 = right
            */
           switch (e.button) {
            case 0:
                this.mouseL = true
            case 2:
                this.mouseR = true
           }
        })


        document.addEventListener("mouseup", e => {
           switch (e.button) {
            case 0:
                this.mouseL = false
            case 2:
                this.mouseR = false
           }
        })
    }
}