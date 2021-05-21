var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var fpsInterval, now, then, interval;
function startTick(fps) {
    fpsInterval = 1000 / fps;
    then = performance.now();
    tick();
}
function tick() {
    requestAnimationFrame(tick);
    now = performance.now();
    interval = now - then;
    if (interval > fpsInterval) {
        then = now - (interval % fpsInterval);
        // update();
        // draw();
    }
}
// startTick(1)
var Prize = /** @class */ (function () {
    function Prize() {
    }
    return Prize;
}());
var Snake = /** @class */ (function () {
    function Snake() {
    }
    Snake.prototype.draw = function (x, y, color) {
        c.fillStyle = color;
        c.fillRect(x, y, 100, 100);
    };
    return Snake;
}());
var snake = new Snake();
snake.draw(10, 10, "red");
