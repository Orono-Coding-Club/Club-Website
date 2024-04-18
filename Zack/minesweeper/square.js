export default class Square {
    constructor(x,y,game) {
        this.x = x
        this.y = y
        this.width = Math.round(game.width/game.size)
        this.height = Math.round(game.height/game.size)

        this.type = 0
        this.surrounding = 0
        this.game = game

        this.color = "silver"
        this.revealed = false

    }
    
    update() {
        if ((this.game.input.mouseX > this.x) && (this.game.input.mouseX < (this.x + this.width)) && (this.game.input.mouseY > this.y) && (this.game.input.mouseY < (this.y + this.height)) && !this.revealed) {
            this.color = "darkgrey"
            if (this.game.input.mouseL && !this.game.lastML) {
                //this.revealed = true
                this.color = "grey"
                this.game.revealSquares(this.x,this.y)
            }
        }
        else if (this.revealed) {
            this.color = "gray"
        }
        else {
            this.color = "silver"
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height) // top left position, width and height are from this position
        ctx.strokeStyle = "grey"
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
}