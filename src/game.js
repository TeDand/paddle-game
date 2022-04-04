'use strict';
import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level1 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
}

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.lives = 1;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    new InputHandler(this);
  }

  start() {
    if (this.gameState !== GAMESTATE.MENU) return;

    let bricks = buildLevel(this, level1);
    this.gameObjects = [this.ball, this.paddle, ...bricks];

    this.gameState = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU)
      return;
    this.gameObjects.forEach((object) => {
      object.update(deltaTime);
    });
    this.gameObjects = this.gameObjects.filter((object) => !object
      .markedForDeletion);
  }

  draw(ctx) {
    this.gameObjects.forEach((object) => {
      object.draw(ctx);
    });

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2)
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this
        .gameHeight / 2)
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED)
      this.gameState = GAMESTATE.RUNNING;
    if (this.gameState === GAMESTATE.RUNNING)
      this.gameState = GAMESTATE.PAUSED
  }
}