var PLAY = 1;
var END = 0;
var gameState = PLAY;

var food,foodGroup;

var dory,doryImg;
var back,backImage;
var obstaclesGroup,bag1,bag2,bottle1,bottle2;

var score=0;

var gameOver,gameOverImg,restartImg, restart;


function preload(){
  bag1=loadImage("bag1.jpg");
  bag2=loadImage("bag2.jpg");
  bottle1=loadImage("bottle1.jpg");
  bottle2=loadImage("bottle2.png");
  
  doryImg=loadImage("dory.jpg");
  
  backImage=loadImage("background1.jpg");
  
  gameOverImg=loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);

  score = 0;
  
    back = createSprite(200,180,400,20);
  back.addImage("back",backImage);
  back.x = back.width /2;
  back.velocityX = -6;
  back.scale=1.2;
  
  dory= createSprite(100,350,40,80);
  
  dory.addImage("dory",doryImg);
  dory.scale = 0.3;
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup = new Group();
 foodGroup=new Group();

}

function draw() {
   
  background(255);
  background.scale=2.5;
  textSize(30);
  text("Score: "+ score, 500,50);
  fill="white";
  
  
  
  if (gameState===PLAY){
    
    back.velocityX = -(6 + 3*score/100);
  
    if(keyDown("left_arrow") ) {
      dory.velocityX=-3;
    }
    if (keyDown("up_arrow")){
      dory.velocityY=-3;
    }
  if (keyDown("down_arrow")){
    dory.velocityY=3;
  }
    if (keyDown("right_arrow")){
      dory.velocityX=3;
    }
    

  
    if (back.x < 0){
      back.x = back.width/2;
    }
  
    spawnObstacles();
  if (foodGroup.isTouching(dory)){
    score=score+1;
  }
    if(obstaclesGroup.isTouching(dory)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    back.velocityX = 0;
    dory.velocityY = 0;
   
    obstaclesGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setVelocityEach(0);
   
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(bag1);
              break;
      case 2: obstacle.addImage(bottle2);
              break;
      case 3: obstacle.addImage(bottle1);
              break;
      case 4: obstacle.addImage(bag2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnFood(){
  if(frameCount % 60 === 0) {
    var food = createSprite(300,165,20,20);
    food.velocityX=-4;
    food.shapeColor="white";
   }
  food.lifetime=200;
  foodGroup.add(food);
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
  
}