//51,175
var pacMan;
var pacAnima, ghost1;
var gameState = "start";
var direction;
var cardboards = [];
var edges;
function preload() {
  pacManAnima = loadAnimation("images/pacMan-1.png", "images/pacMan-2.png");
  coinImg = loadImage("images/coin.png");
  ghost1Anima = loadAnimation(
    "images/Ghost-1-1.png",
    "images/Ghost-1-2.png",
    "images/Ghost-1-3.png",
    "images/Ghost-1-4.png"
  );
}
function setup() {
  canvas = createCanvas(400, 400);
  pacMan = createSprite(20, 25, 18, 18);
  pacMan.addAnimation("pacMan", pacManAnima);
  pacMan.scale = 0.1;
  coin1 = createSprite(383, 381, 1, 1);
  coin1.addImage(coinImg);
  coin1.scale = 0.1;
  coin2 = createSprite(25, 276, 1, 1);
  coin2.addImage(coinImg);
  coin2.scale = 0.1;
  coin3 = createSprite(221, 25, 1, 1);
  coin3.addImage(coinImg);
  coin3.scale = 0.1;
  ghost1 = createSprite(18, 173, 18, 18);
  ghost1.addAnimation("ghost", ghost1Anima);
  ghost1.scale = 0.1;
  ghost2 = createSprite(51, 175, 18, 18);
  ghost2.addAnimation("ghost", ghost1Anima);
  ghost2.scale = 0.1;

  cardboards = [
    createSprite(50, 50, 10, 100),
    createSprite(150, 100, 100, 10),
    createSprite(150, 75, 10, 50),
    createSprite(125, 50, 50, 10),
    createSprite(200, 25, 10, 50),
    createSprite(25, 150, 50, 10),
    createSprite(150, 150, 10, 100),
    createSprite(50, 200, 100, 10),
    createSprite(300, 50, 100, 10),
    createSprite(250, 100, 10, 100),
    createSprite(380, 325, 160, 10),
    createSprite(300, 275, 10, 100),
    createSprite(325, 225, 50, 10),
    createSprite(250, 250, 10, 100),
    createSprite(200, 200, 100, 10),
    createSprite(100, 300, 200, 10),
    createSprite(300, 150, 100, 10),
    createSprite(350, 125, 10, 50),
    createSprite(200, 350, 100, 10),
    createSprite(50, 375, 10, 50),
    createSprite(100, 250, 100, 10),
    createSprite(50, 275, 10, 50),
    createSprite(200, 1, 400, 1),
    createSprite(200, 399, 400, 1),
    createSprite(399, 200, 1, 400),
    createSprite(1, 200, 1, 400),
  ];
  cardboards[22].shapeColor = "red";
  cardboards[23].shapeColor = "red";
  cardboards[24].shapeColor = "red";
  cardboards[25].shapeColor = "red";
  //edges = createEdgeSprites();
  angleMode(DEGREES);
  pacMan.rotateToDirection = true;
  ghost1.velocityX = 3;
  ghost2.velocityX = 3;
}

function draw() {
  background("green");
  imageMode(CENTER);
  if (gameState === "start") {
    for (var i = 0; i < 26; i++) {
      pacMan.bounceOff(cardboards[i]);
    }

    for (var q = 0; q < 26; q++) {
      if (ghost1.collide(cardboards[q])) {
        direction = Math.round(random(1, 4));
        randomDirection(ghost1, direction);
      }
      if (ghost2.collide(cardboards[q])) {
        direction2 = Math.round(random(1, 4));
        randomDirection(ghost2, direction2);
      }
    }
    if (keyDown("up")) {
      pacMan.velocityX = 0;
      pacMan.velocityY = -2;
    }
    if (keyDown("down")) {
      pacMan.velocityX = 0;
      pacMan.velocityY = 2;
    }

    if (keyDown("right")) {
      pacMan.velocityX = 2;
      pacMan.velocityY = 0;
    }

    if (keyDown("left")) {
      pacMan.velocityX = -2;
      pacMan.velocityY = 0;
    }
    //a1.x = ghost1.x + 5;
    //a1.y = ghost1.y + 5;
    //a1.depth = ghost1.depth;
    ghost1.depth += 1;
    //ghost1.velocityY = 1;

    console.log(pacMan.x);
    console.log(pacMan.y);
    if (pacMan.isTouching(coin1)) {
      coin1.remove();
    }
    if (pacMan.isTouching(coin2)) {
      coin2.remove();
    }
    if (pacMan.isTouching(coin3)) {
      coin3.remove();
    }
    if (ghost2.isTouching(coin1)) {
      coin1.remove();
    }
    if (ghost2.isTouching(coin2)) {
      coin2.remove();
    }
    if (ghost2.isTouching(coin3)) {
      coin3.remove();
    }

    if (!coin1 && !coin2 && !coin3) {
      gameState = "end";
    }
  }

  //pacMan.shapeColor = "orange";
  drawSprites();
  if (gameState === "end") {
    console.log(gameState);
    text("You Won", 200, 200);
  }
}
function randomDirection(sprite, direction) {
  if (direction === 1) {
    sprite.velocityX = 3;
  }
  if (direction === 2) {
    sprite.velocityX = -3;
  }
  if (direction === 3) {
    sprite.velocityY = 3;
  }
  if (direction === 4) {
    sprite.velocityY = -3;
  }
}
