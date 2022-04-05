import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  COMPLETED: 5,
}

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.maxLives = 3;
    this.lives = this.maxLives;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.gameObjects = [];
    this.levels = [level1, level2];
    this.currentLevel = 0;
    this.maxLevels = 2;
    new InputHandler(this);
  }

  start() {
    if (this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL &&
      this.gameState !== GAMESTATE.GAMEOVER &&
      this.gameState !== GAMESTATE.COMPLETED) return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
      this.currentLevel = 0;
      this.lives = this.maxLives;
    }

    if (this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.COMPLETED)
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.lives = this.maxLives;
      this.gameState = GAMESTATE.NEWLEVEL;
      this.start();
    }

    if (this.currentLevel === this.maxLevels) {
      this.gameState = GAMESTATE.COMPLETED;
      this.lives = this.maxLives;
      this.currentLevel = 0;
    }

    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.update(deltaTime);
    });
    this.bricks = this.bricks.filter((object) => !object
      .markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => {
      object.draw(ctx);
    });

    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Lives: ${this.lives}`, 35, 22);

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this
        .gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this
        .gameHeight / 2);
      ctx.fillText("Press SPACEBAR to re-start", this.gameWidth / 2, this
        .gameHeight / 2 + 35);
    }

    if (this.gameState === GAMESTATE.COMPLETED) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("YOU WON!", this.gameWidth / 2, this
        .gameHeight / 2);
      ctx.fillText("Press SPACEBAR to re-start", this.gameWidth / 2, this
        .gameHeight / 2 + 35);
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else if (this.gameState === GAMESTATE.RUNNING) {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}