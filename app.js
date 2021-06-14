var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var btnStart = document.querySelector("#start");
var btnStop = document.querySelector("#stop");
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);
var grid = 20;
var Prize = /** @class */ (function () {
    function Prize() {
        var _this = this;
        this.px = this.pickRandom();
        this.py = this.pickRandom();
        this.draw = function () {
            c.fillStyle = "green";
            c.fillRect(_this.px * grid, _this.py * grid, grid - 2, grid - 2);
        };
        this.update = function () {
            _this.px = _this.pickRandom();
            _this.py = _this.pickRandom();
        };
    }
    Prize.prototype.pickRandom = function () {
        return Math.floor(Math.random() * grid);
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
        this.trail = [{ x: 0, y: 0 }];
        this.tail = 5;
        this.draw = function () {
            c.fillStyle = "red";
            _this.trail.forEach(function (block, i) {
                c.fillRect(block.x * grid, block.y * grid, grid - 2, grid - 2);
                if (block.x === _this.sx && block.y === _this.sy && i < _this.trail.length - 1) {
                    _this.tail = 5;
                }
            });
        };
        this.update = function () {
            _this.sx += _this.vx;
            _this.sy += _this.vy;
            if (_this.sx < 0) {
                _this.sx = grid - 1;
            }
            if (_this.sx === grid) {
                _this.sx = 0;
            }
            if (_this.sy < 0) {
                _this.sy = grid - 1;
            }
            if (_this.sy === grid) {
                _this.sy = 0;
            }
            _this.trail.push({ x: _this.sx, y: _this.sy });
            while (_this.trail.length > _this.tail) {
                _this.trail.shift();
            }
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
        var _this = this;
        this.fpsInterval = 0;
        this.now = 0;
        this.then = 0;
        this.interval = 0;
        this.id = 0;
        this.snake = new Snake();
        this.prize = new Prize();
        this.start = function (fps) {
            _this.fpsInterval = 1000 / fps;
            _this.then = performance.now();
            _this.tick();
        };
        this.stop = function () {
            cancelAnimationFrame(_this.id);
        };
        this.tick = function () {
            _this.id = requestAnimationFrame(function () { return _this.tick(); });
            _this.now = performance.now();
            _this.interval = _this.now - _this.then;
            if (_this.interval > _this.fpsInterval) {
                _this.then = _this.now - (_this.interval % _this.fpsInterval);
                c.fillStyle = "black";
                c.fillRect(0, 0, canvas.width, canvas.height);
                _this.prize.draw();
                document.addEventListener("keydown", _this.snake.keyPush);
                _this.snake.update();
                _this.snake.draw();
                if (_this.snake.sx === _this.prize.px && _this.snake.sy === _this.prize.py) {
                    _this.winPrize();
                }
            }
        };
        this.winPrize = function () {
            _this.prize.update();
            _this.snake.tail++;
            _this.prize.draw();
        };
    }
    return GameLoop;
}());
var game = new GameLoop();
btnStart.addEventListener("click", function () { return game.start(10); });
btnStop.addEventListener("click", function () { return game.stop(); });
