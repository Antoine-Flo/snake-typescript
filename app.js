var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var grid = 20;
var Prize = /** @class */ (function () {
    function Prize() {
        this.px = this.pickRandom();
        this.py = this.pickRandom();
    }
    Prize.prototype.pickRandom = function () {
        return Math.floor(Math.random() * grid);
    };
    Prize.prototype.update = function () {
        this.px += this.pickRandom();
        this.py += this.pickRandom();
    };
    Prize.prototype.draw = function () {
        c.fillStyle = "green";
        c.fillRect(this.px * grid, this.py * grid, grid - 2, grid - 2);
    };
    return Prize;
}());
var Snake = /** @class */ (function () {
    function Snake() {
        var _this = this;
        this.sx = 0;
        this.sy = 0;
        this.vx = 0;
        this.vy = 0;
        this.trail = [];
        this.tail = 5;
        this.draw = function () {
            c.fillStyle = "red";
            c.fillRect(_this.sx * grid, _this.sy * grid, grid - 2, grid - 2);
        };
        this.keyPush = function (evt) {
            switch (evt.key) {
                case "ArrowLeft":
                    _this.vx = -1;
                    _this.vy = 0;
                    break;
                case "ArrowDown":
                    _this.vx = 0;
                    _this.vy = 1;
                    break;
                case "ArrowRight":
                    _this.vx = 1;
                    _this.vy = 0;
                    break;
                case "ArrowUp":
                    _this.vx = 0;
                    _this.vy = -1;
                    break;
            }
        };
    }
    return Snake;
}());
var GameLoop = /** @class */ (function () {
    function GameLoop() {
        this.fpsInterval = 0;
        this.now = 0;
        this.then = 0;
        this.interval = 0;
        this.snake = new Snake();
        this.prize = new Prize();
    }
    GameLoop.prototype.startTick = function (fps) {
        this.fpsInterval = 1000 / fps;
        this.then = performance.now();
        this.tick();
    };
    GameLoop.prototype.tick = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.tick(); });
        this.now = performance.now();
        this.interval = this.now - this.then;
        if (this.interval > this.fpsInterval) {
            this.then = this.now - (this.interval % this.fpsInterval);
            c.fillStyle = "black";
            c.fillRect(0, 0, canvas.width, canvas.height);
            document.addEventListener("keydown", this.snake.keyPush);
            this.snake.sx += this.snake.vx;
            this.snake.sy += this.snake.vy;
            this.snake.draw();
            this.prize.draw();
        }
    };
    return GameLoop;
}());
var game = new GameLoop;
// game.startTick(10);
