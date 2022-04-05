export function detectVerticalCollision(ball, gameObject) {
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

export function detectHorizontalCollision(ball, gameObject) {
  let leftSideOfBall = ball.position.x;
  let rightSideOfBall = ball.position.x + ball.size;
  let topOfObject = gameObject.position.y;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (leftSideOfBall >= leftSideOfObject &&
    rightSideOfBall <= rightSideOfObject &&
    ball.position.y >= topOfObject &&
    ball.position.y + ball.size <= bottomOfObject)
    return true;

  return false;
}