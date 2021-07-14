let log = console.log;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let snakeHeadX = 10;
let snakeHeadY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio('Yoshi Gulp 2.wav');

function drawGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if(xVelocity === 0 && yVelocity === 0){
      return false;
  }



  if (snakeHeadX < 0) {
    gameOver = true;
  } else if (snakeHeadX === tileCount) {
    gameOver = true;
  } else if (snakeHeadY < 0) {
    gameOver = true;
  } else if (snakeHeadY === tileCount) {
    gameOver = true;
  }
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === snakeHeadX && part.y === snakeHeadY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.fontSize = "10px verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(snakeHeadX, snakeHeadY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(
    snakeHeadX * tileCount,
    snakeHeadY * tileCount,
    tileSize,
    tileSize
  );
}

function changeSnakePosition() {
  snakeHeadX = snakeHeadX + xVelocity;
  snakeHeadY = snakeHeadY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === snakeHeadX && appleY == snakeHeadY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play()
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
  //up
  if (e.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (e.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left
  if (e.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (e.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
