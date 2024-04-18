import Game from "./game.js";

const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const WIDTH = window.innerWidth*0.4;
const actualW = window.innerWidth
const HEIGHT = WIDTH;
canv.width = WIDTH
canv.height = HEIGHT

const game = new Game(WIDTH,HEIGHT,actualW)

let lastTime = Date.now()
let dt = 0



function printLines(text,x,y,size) {
    text.reverse()
    ctx.font = `${size}px Comic Sans MS`
    ctx.fillStyle = "black"
    for (let i = 0;i < text.length; i++) {
        ctx.fillText(text[i],x,y-(i*(size*1.03)))
    }
}

function main() {
    dt = (Date.now() - lastTime) / 1000
    lastTime = Date.now()

    ctx.fillStyle = "gainsboro"
    ctx.fillRect(0,0,WIDTH,HEIGHT)


    game.update()
    game.draw(ctx)

    printLines(
        [
            `DeltaTime: ${dt.toFixed(3)}`,
            `FPS: ${(1/dt).toFixed(2)}`,
            `Mouse: ${game.input.mouseX.toFixed(2)}, ${game.input.mouseY.toFixed(2)}`
        ],
        0,
        HEIGHT*0.98,
        HEIGHT*0.05
    )
}

setInterval(main,33)