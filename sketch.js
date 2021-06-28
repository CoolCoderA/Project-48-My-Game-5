var PLAY = 1;
var END = 0;

var gameState = PLAY;

var cat, cat_running, cat_collided;

var dog, dog_running, dog_collided;

var obstacleImg;
var backgroundImg, background;
var jumpSound, collidedSound;

var obstacle;
var score;
function preload(){
  
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  
  backImg = loadImage("assets/grass_bg.jpg");
  
  cat_running = loadAnimation("assets/cat_running.png","assets/cat_running2.png","assets/cat_running3.png");
  cat_collided = loadAnimation("assets/cat_running.png");
  
  dog_running = loadAnimation("assets/dog_runningnew.png","assets/dog_runningnew2.png","assets/dog_runningnew3.png");
  dog_collided = loadAnimation("assets/dog_runningnew2.png");
  
  obstacleImg = loadImage("assets/Obstacle.png");

  collidedSound = loadSound("assets/explosion.mp3");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImg);
  backgr.scale=3;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  cat = createSprite(100,300,20,50);
  dog = createSprite(100,150,20,50);
  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2
  ground.visible = false;
  cat.addAnimation("running", cat_running);
  cat.addAnimation("collided", cat_collided);
  cat.setCollider('circle',0,0,40)
  //elephant.scale = 0.08
   //cat.debug=true
   //dog.debug = true
  // background=createSprite(200,200,windowWidth,windowHeight);
  // background.addImage(backgroundImg);
  // background.scale=2.5;
  // invisibleGround.visible =false
  dog.addAnimation("running", dog_running);
  dog.addAnimation("collided", dog_collided);
  dog.setCollider('circle',0,0,200)

  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

}

function draw() {
  //elephant.debug = true;
  background(255);



if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
  if(keyDown('enter') && cat.y>=100){
    cat.velocityY = -12;

  }

  if(keyDown('space') && dog.y>=100){
    dog.velocityY = -15;

  }

  cat.velocityY = cat.velocityY+1
  dog.velocityY = dog.velocityY+1

  if(backgr.x<100){
    backgr.x=backgr.width/2;

  
  }
}
}
if(obstacle.isTouching(cat)){
  collidedSound.play()
  gameState = END;
}

if(obstacle.isTouching(dog)){
collidedSound.play()
gameState = END;

}
else if (gameState === END) {
  textSize(20);
  fill("black")
  text("Game Over");

  cat.velocityY = 0;
  dog.velocityY = 0;
  obstacleImg.velocityX = 0;

  cat.changeAnimation("collided", cat_collided);
  dog.changeAnimation("collided", dog_collided);

  


Obstacles();
cat.collide(ground);
dog.collide(ground);
  drawSprites();
}

function Obstacles(){
if (frameCount%300===0){
var obstacle = createSprite(500,-10,40,10);
obstacle.y = Math.round(random(80,300))
obstacle.addImage(obstacleImg)
obstacle.velocityX = -3;
obstacle.scale = 0.3;
}
}
