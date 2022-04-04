'use strict';
import { detectCollision } from "/src/collisionDetection";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("img_ball");
    this.speed = {
      x: 4,
      y: 4,
    };
    this.position = {
      x: 10,
      y: 400,
    }
    this.size = 16;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size,
      this.size);
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // check collision with boundaries
    if (this.position.x + this.size > this.game.gameWidth || this.position.x <
      0)
      this.speed.x = -this.speed.x
    if (this.position.y + this.size > this.game.gameHeight || this.position
      .y < 0)
      this.speed.y = -this.speed.y

    // check collision with paddle
    if (detectCollision(this, this.game.paddle))
      this.speed.y = -this.speed.y;

    // check collision with bricks
  }
}