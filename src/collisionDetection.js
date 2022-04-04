export function detectCollision(ball, gameObject) {
  // check collision with paddle
  let topOfBall = ball.position.y;
  let bottomOfBall = ball.position.y + ball.size;
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x >= leftSideOfObject &&
    ball.position.x + ball.size <= rightSideOfObject)
    return true;

  return false;
}