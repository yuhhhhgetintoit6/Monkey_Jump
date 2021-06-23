var back;
var backimg;
var monkey;
var monkeyimg;
var ground;
var groundimg
var invisibleGround;
var bananaimg
var bananagroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var rockimg;
var score = 0;
var rockgroup;
var sizeincreased = false;
var sizedecreased = false;
var mybanana;
var gameOver;
//Global Variables
var bc = 0;


function preload() {
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  groundimg = loadImage("ground.jpg");
  bananaimg = loadImage("Banana.png");
  rockimg = loadImage("stone.png");
  backimg = loadImage("jungle.jpg");
  gameOverImg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600, 300);
  back = createSprite(300, 100);
  back.addImage("back", backimg);
  back.scale = 1;
  bananagroup = new Group();
  ground = createSprite(300, 600, 3000, 200);
  ground.addImage("ground", groundimg);
  ground.scale = 0.5;
  invisibleGround = createSprite(200, 295, 600, 5);
  invisibleGround.visible = false;
  monkey = createSprite(60, 280);
  monkey.addAnimation("monkey", monkeyimg);
  monkey.scale = 0.17;
  rockgroup = new Group();

  gameOver = createSprite(300, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

}

function draw() {
  background(255);
  if (gameState === PLAY) {
    score = Math.round(score + 0.5);
    ground.velocityX = -6;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    back.velocityX = -(6 + 1.5 * score / 100);
    if (back.x < 90) {
      back.x = back.width / 2;
    }
    if (keyDown("space") && monkey.y >= 230) {
      monkey.velocityY = -12;
      //playSound("jump.mp3");
    }
    monkey.velocityY = monkey.velocityY + 0.7;
    spawnbanana();
    spawnrocks();
    for (var i = 0; i < bananagroup.length; i++) {
      mybanana = bananagroup.get(i);
      if (mybanana.isTouching(monkey)) {
        mybanana.destroy();
        //playSound("sound://category_achievements/lighthearted_bonus_objective_5.mp3");
        //var plus = createSprite(200,200,1000,10) ;
        //plus.setAnimation("plus");
        //plus.scale = 0.2;
        //plus.velocityY = -5;
        //plus.lifetime = 100;
        bc = bc + 1;
      }
    }
    if (rockgroup.isTouching(monkey)) {
     gameState = END;
     gameOver.visible = true;
    }

    if (rockgroup.isTouching(monkey) == false) {
      sizedecreased = false;
    }
    if (bc % 5 === 0 && bc > 0) {
      if (sizeincreased === false) {
        monkey.scale = monkey.scale + 0.05;
        sizeincreased = true;
      }
    } else {
      sizeincreased = false;
    }
  }
  else if(gameState === END){
    rockgroup.setVelocityXEach(0);
    bananagroup.setVelocityXEach(0);
    monkey.visible = false;
    ground.velocityX = 0;
    back.velocityX = 0;
  }

  monkey.collide(invisibleGround);
  drawSprites();
  fill("black");
  textSize(25);
  text("Bananas Collected: "+bc,170,25);
  stroke("black");
  
  
}

function spawnbanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(650, random(200, 90));
    banana.addImage("banana", bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -(random(3, 15) + 1.5 * score / 100);
    banana.lifetime = 230;
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    bananagroup.add(banana);
  }
}

function spawnrocks() {
  if (frameCount % 80 === 0) {
    var rock = createSprite(random(650, 800), 280, 10, 40);
    rock.addImage("rock", rockimg);
    rock.scale = 0.15;
    rock.velocityX = -(6 + 1.5 * score / 100);
    rock.lifetime = 130;
    rockgroup.add(rock);
  }
}