  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
  
  if (gameState === "play") {
    
    if(keyDown("LEFT")){
        ghost.x = ghost.x - 3;
      // write a code to move left when left arrow is pressed
    }
    if(keyDown("RIGHT")){
      ghost.x = ghost.x + 3;
      // write a code to move left when right arrow is pressed
    }
    if(keyDown("SPACE")){
      ghost.velocityY = -10;
      // write a code to move up when space arrow is pressed
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
      if (tower.y > 400) {
        tower.y = 300;
      }
    
      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
      if (climbersGroup.isTouching(ghost)) {
        ghost.velocityY = 0;
      }
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }

  drawSprites();
}
  if (gameState === "end"){
    background(0);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 220, 250)
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {

    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    var rand = Math.round(random(1,2));
    switch (rand) {
    //
    case 1: door.addImage(doorImg);
    break;
    case 2: climber.addImage(climberImg);
    break;
    default: break;
  }
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    ghost.depth = door.depth;
    ghost.depth += 1;
     
    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    door.lifetime = 300;
    climber.lifetime = 300;
    invisibleBlock.liftetime = 300;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

