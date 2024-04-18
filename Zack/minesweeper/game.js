import Square from "./square.js"
import Input from "./input.js"
import Misc from "./misc.js"

export default class Game {
    constructor(width, height,realW) {
        this.width = width
        this.realW = realW
        this.height = height
        this.size = 10
        this.BOMBS = 5

        this.input = new Input()
        this.misc = new Misc()

        this.squares = []
        this.squareCoords = {}
        for (let x = 0; x < this.width; x += Math.round(this.width/this.size)) {
            for (let y = 0; y < this.height; y += Math.round(this.height/this.size)) {
                this.squares.push(new Square(x, y, this))
                this.squareCoords[`${Math.round(x)},${Math.round(y)}`] = this.squares[this.squares.length-1]
            }
        }
        for (let i = 0; i < this.BOMBS; i++) {
            let testX = Math.round(Math.round(this.misc.random(0,10))*(Math.round(this.width/this.size)))
            let testY = Math.round(Math.round(this.misc.random(0,10))*(Math.round(this.height/this.size)))
            console.log(this.squareCoords,testX,testY)
            if (this.squareCoords[`${testX},${testY}`].type != 0) {
                i -= 1
                continue;
            }
            this.squareCoords[`${testX},${testY}`].type = 1
        }
        this.squares.forEach((s) => {
            if (s.type != 1) {
                for (let i = 0; i <= 361; i += 45) {
                    let angle = i * (Math.PI/180)
                    let a = Math.round(Math.sin(angle))
                    let b = Math.round(Math.cos(angle))
                    // a /= Math.sqrt((a ** 2) + (b ** 2))
                    // b /= Math.sqrt((a ** 2) + (b ** 2))
                    if (this.squareCoords.hasOwnProperty(`${Math.round(s.x+(a*b.width))},${Math.round(s.y+(b*b.height))}`)) {
                        console.log(this.squareCoords[`${Math.round(s.x+(a*b.width))},${Math.round(s.y+(b*b.height))}`])
                        if (this.squareCoords[`${Math.round(s.x+(a*b.width))},${Math.round(s.y+(b*b.height))}`].type == 1) {
                            s.surrounding += 1
                        }
                    }
                }
            }
        })

        this.lastML = false
        this.lastMR = false
        //console.log(this.squareCoords)
    }

    update() {
        this.squares.forEach(s => {
            s.update()
        })

        this.lastML = this.input.mouseL
        this.lastMR = this.input.mouseR
    }

    draw(ctx) {
        this.squares.forEach(s => {
            s.draw(ctx)
        })
    }

    canSpread(sx, sy, game, size, ignore) {
        return (sx > 0 && sx < game.width && sy > 0 && sy < game.height) && game.squareCoords[`${Math.round(sx)},${Math.round(sy)}`].surrounding != 0 || game.squareCoords[`${Math.round(sx)},${Math.round(sy)}`].type != 0
    }
    
    revealSquares(x,y) {
        let ignore = []
        //console.log(this.squareCoords)
        function spread(sx, sy,size,game) {
            if (!game.squareCoords.hasOwnProperty(`${Math.round(sx)},${Math.round(sy)}`)) return;
            if (!(sx > -size && sx < game.width && sy > -size && sy < game.height) || game.squareCoords[`${Math.round(sx)},${Math.round(sy)}`].surrounding != 0 || game.squareCoords[`${Math.round(sx)},${Math.round(sy)}`].type != 0) {
                return
            }
            ignore.push(`${sx},${sy}`)
            console.log(game.squareCoords)
            console.log(sx,sy,size)
            game.squareCoords[`${Math.round(sx)},${Math.round(sy)}`].revealed = true
            if (!ignore.includes(`${sx-size},${sy}`) && (game.squareCoords[`${Math.round(sx-size)},${Math.round(sy+0)}`].surrounding == 0)) {
                spread(sx-size,sy,size,game)
            }
            if (!ignore.includes(`${sx+size},${sy}`) && (game.squareCoords[`${Math.round(sx+size)},${Math.round(sy+0)}`].surrounding == 0)) {
                spread(sx+size,sy,size,game)
            }
            if (!ignore.includes(`${sx},${sy-size}`) && (game.squareCoords[`${Math.round(sx+0)},${Math.round(sy-size)}`].surrounding == 0)) {
                spread(sx,sy-size,size,game)
            }
            if (!ignore.includes(`${sx},${sy+size}`) && (game.squareCoords[`${Math.round(sx+0)},${Math.round(sy+size)}`].surrounding == 0)) {
                spread(sx,sy+size,size,game)
            }
        }

        spread(Math.round(x),Math.round(y),this.squares[0].width,this)
    }
}