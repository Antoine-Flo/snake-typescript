
const canvas = <HTMLCanvasElement>document.querySelector('canvas');
const c = <CanvasRenderingContext2D>canvas.getContext('2d');


let fpsInterval:number, now:number, then:number, interval:number;

function startTick(fps:number) {
    fpsInterval = 1000 / fps;
    then = performance.now();
    tick();
}

function tick() {

    requestAnimationFrame(tick);
    now = performance.now();
    interval = now - then;

    if(interval > fpsInterval) {
        then = now - (interval % fpsInterval);

        // update();
        // draw();
    }
}
// startTick(1)

class Prize {

}

class Snake {


    draw(x:number, y:number, color:string) {
        c.fillStyle = color;
        c.fillRect(x, y, 100, 100)
    }
}

const snake = new Snake()
snake.draw(10, 10, "red")