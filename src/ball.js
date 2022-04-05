import {
  detectVerticalCollision,
  detectHorizontalCollision
} from "/src/collisionDetection";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("img_ball");
    this.size = 16;
    this.reset();
  }

  reset() {
    this.speed = {
      x: 5,
      y: 5,
    };
    this.position = {
      x: 10,
      y: 400,
    };
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
      this.speed.x = -this.speed.x;
    if (this.position.y < 0)
      this.speed.y = -this.speed.y;

    if (this.position.y + this.size > this.game.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // check collision with paddle
    // TODO: max more robust system for collision detection
    if (detectVerticalCollision(this, this.game.paddle)) {
      if (this.speed.y > 0)
        this.position.y = this.game.paddle.position.y - this.size;
      else
        this.position.y = this.game.paddle.position.y + this.game.paddle
        .height + this.size;

      this.speed.y = -this.speed.y;
    }

    if (detectHorizontalCollision(this, this.game.paddle)) {
      if (this.speed.x > 0)
        this.position.x = this.game.paddle.position.x - this.size;
      else
        this.position.x = this.game.paddle.position.x + this.game.paddle
        .width + this.size;

      this.speed.x = -this.speed.x;
    }
  }
}