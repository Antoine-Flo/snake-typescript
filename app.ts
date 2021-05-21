const canvas = <HTMLCanvasElement>document.querySelector("canvas");
const c = <CanvasRenderingContext2D>canvas.getContext("2d");
const btnStart = <HTMLElement>document.querySelector("#start");
const btnStop = <HTMLElement>document.querySelector("#stop");
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

let grid = 20;

class Prize {
  px = this.pickRandom();
  py = this.pickRandom();

  pickRandom() {
    return Math.floor(Math.random() * grid);
  }

  update = () => {
    this.px = this.pickRandom();
    this.py = this.pickRandom();
  };

  draw = () => {
    c.fillStyle = "green";
    c.fillRect(this.px * grid, this.py * grid, grid - 2, grid - 2);
  };
}

class Snake {
  sx = 0;
  sy = 0;
  vx = 0;
  vy = 0;
  trail= [{x: 0, y:0}];
  tail = 5;

  update = () => {
    this.sx += this.vx;
    this.sy += this.vy;

    if (this.sx < 0) { this.sx = grid - 1; }
    if (this.sx === grid) { this.sx = 0; }
    if (this.sy < 0) { this.sy = grid - 1; }
    if (this.sy === grid) { this.sy = 0; }

    this.trail.push({x: this.sx, y: this.sy});
    
    while(this.trail.length > this.tail) {
      this.trail.shift()
    }
    
  }

  draw = () => {
    c.fillStyle = "red";

    this.trail.forEach((block, i) => {
      c.fillRect(block.x * grid, block.y * grid, grid - 2, grid - 2);
      if(block.x === this.sx && block.y === this.sy && i < this.trail.length - 1) { this.tail = 5; }
      
    })
    
    console.log("Head : " + this.sx + " | " + this.sy);

  };

  keyPush = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case "ArrowLeft":
        this.vx = -1;
        this.vy = 0;
        break;

      case "ArrowDown":
        this.vx = 0;
        this.vy = 1;
        break;

      case "ArrowRight":
        this.vx = 1;
        this.vy = 0;
        break;

      case "ArrowUp":
        this.vx = 0;
        this.vy = -1;
        break;
    }
  };
}

class GameLoop {
  fpsInterval: number = 0;
  now: number = 0;
  then: number = 0;
  interval: number = 0;
  snake = new Snake();
  prize = new Prize();
  id = 0;

  start = (fps: number) => {
    this.fpsInterval = 1000 / fps;
    this.then = performance.now();
    this.tick();
  };

  stop = () => {
    cancelAnimationFrame(this.id) 
  }

  tick = () => {
    this.id = requestAnimationFrame(() => this.tick());
    this.now = performance.now();
    this.interval = this.now - this.then;

    if (this.interval > this.fpsInterval) {
      this.then = this.now - (this.interval % this.fpsInterval);
      c.fillStyle = "black";
      c.fillRect(0, 0, canvas.width, canvas.height);
      document.addEventListener("keydown", this.snake.keyPush);
    
      this.snake.update();

      this.snake.draw();
      this.prize.draw();

      if (this.snake.sx === this.prize.px && this.snake.sy === this.prize.py) {
        this.winPrize();
      }
    }
  };

  winPrize = () => {
    this.prize.update();
    this.snake.tail++;
  };
}

const game = new GameLoop();

btnStart.addEventListener("click", () => game.start(10))
btnStop.addEventListener("click", () => game.stop())
