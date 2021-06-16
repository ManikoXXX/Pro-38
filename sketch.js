var canvas, backgroundImage;
var ground;
var carsGroup, car, carImage;
var car1, car3, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9;
var font;
var score = 0;
var PLAY = 1;
var END = 0;
var gameOver, restart;
var gameState = PLAY;

function preload() {
  backgroundImage = loadImage("Track.jpg");
  carImage = loadImage("Car.png");
  obstacle1 = loadImage("Car2.png");
  obstacle2 = loadImage("Car3.png");
  obstacle3 = loadImage("Car4.png");
  obstacle4 = loadImage("Car5.png");
  obstacle5 = loadImage("Car6.png");
  obstacle6 = loadImage("Car7.png");
  obstacle7 = loadImage("Car8.png");
  obstacle8 = loadImage("Car9.png");
  obstacle9 = loadImage("Car10.png");
  font = loadFont('Kanit.ttf');
  checkPointSound = loadSound("checkPoint.mp3");
  GameImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  ground = createSprite(375, 7848);
  ground.addImage("ground", backgroundImage);
  //ground.y = ground.width / 2;
  ground.velocityY = 20;
  //ground.velocityY = (15 + 3 * score / 100);

  car = createSprite(381, 700);
  car.addImage("car", carImage);
  car.scale = 1.5;

  /*car1 = createSprite(381, 700);
  car1.addImage("car1", obstacle1);
  car1.scale = 1.5;

  car2 = createSprite(381, 700);
  car2.addImage("car2", obstacle2);
  car2.scale = 1.5;

  car3 = createSprite(381, 700);
  car3.addImage("car3", obstacle3);
  car3.scale = 1.5;*/

  wall = createSprite(630, 500, 10, 2000);
  wall1 = createSprite(120, 500, 10, 2000);
  wall1.visible = false;
  wall.visible = false;

  obstaclesGroup = new Group();

  gameOver = createSprite(1070,450);
  gameOver.addImage(GameImg);
  gameOver.scale = 2;
  
  restart = createSprite(1075,600);
  restart.addImage(restartImg);
  restart.scale = .75;

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    //ground.velocityY = -(15 + 3 * score / 100);

    //car.velocityY = car.velocityY - 0.8

    if (ground.y > 600) {
      ground.y = 300
    }
    if (keyIsDown(RIGHT_ARROW)) {
      car.position.x = car.position.x + 10;
    }
    if (keyIsDown(LEFT_ARROW)) {
      car.position.x = car.position.x - 10;
    }

    if(obstaclesGroup.isTouching(car)){
      gameState = END;
    }

    car.collide(wall);

    car.collide(wall1);

    //car.collide(car1);

    //car.collide(car2);

    //car.collide(car3);

    spawnObstacles();

    spawnObstacles1();

    spawnObstacles2();
  }
    else if (gameState === END) {    
      ground.velocityY = 0;
      car.velocityY = 0;
      obstaclesGroup.setVelocityYEach(0);
      obstaclesGroup.setLifetimeEach(-1);

      gameOver.visible = true;
      restart.visible = true;
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }

  /*if (keyIsDown(UP_ARROW)) {
    car.position.y = car.position.y - 50;
    score = score + 1;
  }
 
  if (keyIsDown(DOWN_ARROW)) {
    car.position.y = car.position.y + 50;
    score = score - 1;
  }*/

  if (score>0&&score%100===0) {
    checkPointSound.play();
  }

  drawSprites();

  fill(99, 255, 64);
  textFont(font);
  textSize(30);
  text("Your score: " + score, 500, 50);
}

function spawnObstacles() {
  if(frameCount%60===0) {
    var obstacle = createSprite(200,0,10,40);
    obstacle.velocityY = 12;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnObstacles1() {
  if(frameCount%100===0) {
    var obstacle = createSprite(310,0,10,40);
    obstacle.velocityY = 5;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle4);
              break;
      case 2: obstacle.addImage(obstacle5);
              break;
      case 3: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnObstacles2() {
  if(frameCount%150===0) {
    var obstacle = createSprite(550,0,10,40);
    obstacle.velocityY = 3;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle7);
              break;
      case 2: obstacle.addImage(obstacle8);
              break;
      case 3: obstacle.addImage(obstacle9);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  gameState = PLAY;
  ground.velocityY = 20;

  score = 0;
}