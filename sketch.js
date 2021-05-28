//Create variables here
var dog, dogImg, happyDodImg, database, foods, foodStockRef,database;
var feed, addFood,fedTime,lastFed,foodObj
var currentTime, milk,input,name;
var frameCountNow = 0;
var gameState = "hungry";
var gameStateRef;
var input, button;
var bedroomImg, gardenImg, washroomImg, sleepingImg, runImg;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
  bedroomImg = loadImg("images/bed Room.png")
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png ");
  sleepingImg = loadImage("images/Lazy.png");
  runImg = loadImage("images/running.png");
}


function setup() {  
  database = firebase.database();
createCanvas(1200,500);


foodObj = new Food();

dog = createSprite(width/2+250,height/2,10,10);
dog.addAnimation("hungry",hungryDog);
dog.scale = 0.3;
dog.addAnimation("happy",happyDog)
dog.addAnimation("sleeping",sleepingImg);
dog.addAnimation("run",runImg);

getGameState();

feed = createSprite("Feed the Dog")
feed.position(1050,95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addfoods);
  
input = createInput("Prt name");
input.position(950,120);

button = createButton("Confirm");
button.position(1000,145);
button.mousePressed(createName);

}
function draw() {
background("yellow")

foodObj.display();
writeStock(foods);

if(foods == 0){
  dog.addImage(happyDog);
  milkbottle2.visible = false;
}else{
  dog.addImage(sadDog);
  milkBottle2.visible = true;
}


foodObj.getFoodStock();
//console.log(foodStock);
getGameState();



  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

  if(gameState==="hungry"){
    feed.show();
    addFood.show();
    dog.addAnimation("hungry",hungryDog);
  }

  else{
    feed.hide();
    addFood.hide();
    dog.remove();
  }

  drawSprites();

  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.175;
    milkBottle2.visible=false;
    dog.y=250;
  }
  var Bath=createButton("I want to take bath");
  Bath.position(500,125);
  if(Bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var Sleep = createButton("I am very sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var Play = createButton("Lets Play 1");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  var PlayInGarden=createButton("Lets Play in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBottle2.visible=false;
  }
  
  //add styles here
  textSize(32);
  fill('red');
  //text ("press the ip arrow key to feed the the dog!",width/2-200,100);
  text("time science last fed: "+(currentTime- lastFed),300,125);

  function feedDog(){
    foodObj.deductFood();
    foodObj.updateFoodStock();
  }
  function addFood(){
    foodObj.addFood();
    foodObj.updateFoodStock();
  }
  async function hour(){
 var site = await fetch();
 var siteJSON = await site.json();
 var datetime = siteJSON.datetime;
 var hourTime = datetime.slice(11,13);
 return hourTime;
  }
  function createName(){
    input.hide();
    button.hide();

    name = input.value();
    var greeting = createElement("h3");
    greeting.html("Pet's name:"+name);
    greeting.position(width/2+850,height/2+200);
  }
  function updateGameState(){
    database.ref('/').update({
      gameState:gameState
    })
  }
  function readStock(data)
  {
    foods = data.val();
  }
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
}