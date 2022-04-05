import { detectVerticalCollision,
  detectHorizontalCollision } from "/src/collisionDetection";

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.image = document.getElementById("img_brick");
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.markedForDeletion = false;
  }

  update() {
    // if (detectVerticalCollision(this.game.ball, this)) {
    //   this.game.ball.speed.y = -this.game.ball.speed.y;
    //   this.markedForDeletion = true;
    // }

    if (detectVerticalCollision(this.game.ball, this)) {
      if (this.game.ball.speed.y > 0)
        this.game.ball.position.y = this.position.y - this.game.ball.size;
      else
        this.game.ball.position.y = this.position.y + this.height + this.game
        .ball.size;

      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }

    if (detectHorizontalCollision(this.game.ball, this)) {
      if (this.game.ball.speed.x > 0)
        this.game.ball.position.x = this.position.x - this.game.ball.size;
      else
        this.game.ball.position.x = this.position.x + this.width + this.game
        .ball.size;

      this.game.ball.speed.x = -this.this.game.ball.speed.x;
      this.markedForDeletion = true;
    }

  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}