var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg,zombieGroup;
var bullet,bulletGroup;

var score = 0;
var life = 3;
var bullets = 70;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg=loadImage("assets/zombie.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup=new Group();
   bulletGroup=new Group();

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting);

  bullet=createSprite(player.x+50,player.y-30,10,10);
  bullet.velocityX=15;
  
  bulletGroup.add(bullet);

  bullets=bullets-1;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(bulletGroup.isTouching(zombieGroup)){

  for (let index = 0; index < zombieGroup.length; index++) {
    const zob = zombieGroup[index];

    if(zob.isTouching(bulletGroup)){
      bulletGroup.destroyEach();
      zob.destroy();

      score=score+2;
    }
    
  }

}

if(zombieGroup.isTouching(player)){

  for (let index = 0; index < zombieGroup.length; index++) {
    const zob = zombieGroup[index];

    if(zob.isTouching(player)){

      zob.destroy();
      life=life-1;

    }
    
  }

}


enemy();




drawSprites();


//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)


}




//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
