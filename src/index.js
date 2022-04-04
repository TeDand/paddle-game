import Paddle from "/src/paddle";
import InputHandler from "/src/input";

var canvas = document.getElementById("gameScreen");
var context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
new InputHandler(paddle);

paddle.draw(context);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  paddle.update(deltaTime);
  paddle.draw(context);

  requestAnimationFrame(gameLoop);
}

gameLoop()