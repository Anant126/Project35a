var balloon;
var bkg,balloonA;
var database,Height;
var BalloonB;

function preload(){
  bkg=loadImage("bkg.png")
  BalloonB = loadImage("Hot Air Ballon-02.png")
  balloonA = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(1200,1000);
  
  database=firebase.database()

 balloon = createSprite(950, 900, 0, 0);
 balloon.addAnimation("hotAirBalloon", BalloonB);
 balloon.scale="0.5"

 var balloonHeight=database.ref('balloon/height')
 balloonHeight.on("value",readHeight)
}

function draw() {
  background(bkg);  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonA);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonA);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonA);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonA);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();

  fill("violet")
  stroke("yellow")
  strokeWeight(7)
  text("USE ARROW KEYS TO MOVE THE HOT AIR BALLOON",20,20)
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readHeight(data){
  height=data.val();
  console.log(height.x);
  balloon.x=height.x;
  balloon.y=height.y;
}

