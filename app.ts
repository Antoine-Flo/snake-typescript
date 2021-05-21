
const canvas = <HTMLCanvasElement>document.querySelector("canvas");
const c = <CanvasRenderingContext2D>canvas.getContext("2d");

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let grid = 20;

class Prize {
    px = this.pickRandom();
    py = this.pickRandom();
    
    pickRandom() {
       return Math.floor(Math.random() * grid);
    }

    update() {
        this.px += this.pickRandom();
        this.py += this.pickRandom();
    }

    draw() {
      c.fillStyle = "green";
      c.fillRect(this.px * grid, this.py * grid, grid - 2, grid - 2);
    }
}

class Snake {
    sx = 0;
    sy = 0;
    trail = [];
    tail = 5;


    draw = () => {
      c.fillStyle = "red";
      c.fillRect(this.sx, this.sy, grid - 2, grid - 2);
    }

    keyPush = (evt: KeyboardEvent) => {

        switch(evt.key) {
            case "ArrowLeft":
                this.sx -= 1;
                console.log(this.sx);
                break;

            case "ArrowDown":
                this.sy += 1;
                break;

            case "ArrowRight":
                this.sx += 1;
                break;

            case "ArrowUp":
                this.sy -= 1;
                break;
        }
    }

}

class GameLoop {
  fpsInterval: number = 0;
  now: number = 0;
  then: number = 0;
  interval: number = 0;
  snake = new Snake();
  prize = new Prize();

  startTick(fps: number) {
    this.fpsInterval = 1000 / fps;
    this.then = performance.now();
    this.tick();
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.now = performance.now();
    this.interval = this.now - this.then;

    if (this.interval > this.fpsInterval) {
      this.then = this.now - (this.interval % this.fpsInterval);
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);
      document.addEventListener("keydown", this.snake.keyPush);


      console.log(this.snake.sx);
      console.log(this.snake.sy);
      this.snake.draw();
      this.prize.draw();

    }
  }
}

const game = new GameLoop;
// game.startTick(10);

