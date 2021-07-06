
var monkey , monkey_running,monkey1_colllided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground,groundImg,invisibleGround
var PLAY=1
var END=0
var gameState=PLAY
var gameOver,gameOverimg,restart,restartImg
var checkpoints

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  restartImg=loadImage("download.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverimg=loadImage("images.jpg")
  groundImg=loadImage("k.jpg")
  monkey1_collided=loadAnimation("sprite_0.png")
 checkpoints=loadSound("mixkit-arcade-game-complete-or-approved-mission-205.mp3") 
}



function setup() {
  createCanvas(600,200);

  monkey=createSprite(50,145,20,50) 
  monkey.addAnimation("monkeyrunning",monkey_running)
  monkey.addAnimation("monkey_collided",monkey1_collided)
  monkey.scale=0.09
  
  ground=createSprite(300,220,600,20)
  ground.addImage(groundImg);
  ground.scale=1.1
  
  invisibleGround=createSprite(300,190,600,10)
  invisibleGround.visible=false
  
  gameOver=createSprite(300,60,20,20)
  gameOver.addImage(gameOverimg)
  gameOver.scale=0.3
  
  restart=createSprite(300,130,20,20)
  restart.addImage(restartImg)
  restart.scale=0.2
  
  monkey.setCollider("rectangle",0, 0,monkey.width,monkey.height)
    monkey .debug=true
  obstaclesGroup=new Group();
  fruitsGroup=new Group();
}


function draw() {
 background("white")
  
  textSize(18)
  text("Survival Time: "+score,250,20)
   

  if(gameState === PLAY){
    
    gameOver.visible=false;
    restart.visible=false;
    
    score = score+Math.round(getFrameRate()/62)
  
    if(keyDown("space")&& monkey.y>50){
  monkey.velocityY=-13
  }
    
    if(score>0 && score%100===0){
      checkpoints.play();
    }
  
  monkey.velocityY = monkey.velocityY +0.8
    
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END
   }
  
  }
  else if(gameState===END){
  
    gameOver.visible=true;
    restart.visible=true;
    
    monkey.changeAnimation("monkey_collided",monkey1_collided);
    
    obstaclesGroup.setVelocityXEach(0)
    fruitsGroup.setVelocityXEach(0)
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  bananal();
  obstacles();
  
  monkey.collide(ground);
  drawSprites();
}

function reset(){
  gameState=PLAY
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  fruitsGroup.destroyEach();
  score=0
  monkey.changeAnimation("running", monkey_running);
}

function bananal(){
   if(frameCount%80===0){
  banana=createSprite(600,40,15,15)
  banana.addImage(bananaImage)
  banana.scale=0.07
  banana.y=Math.round(random(40,80))
  banana.velocityX=-(3+score/200)
  banana.lifetime=200
     
  fruitsGroup.add(banana);
  }
}

function obstacles(){
   if(frameCount%95===0){
  obstacle=createSprite(600,160,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.09
  obstacle.velocityX=-(4+score/200)
  obstacles.lifetime=200
     
  obstaclesGroup.add(obstacle)
  } 
}





