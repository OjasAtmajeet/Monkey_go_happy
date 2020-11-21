var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var gameState = 1;
var grass, grassI, forest, forestI, restart, restartI, go, goI;
var block;

function preload() {
    monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
    goI = loadImage("GameOver.png");
    restartI = loadImage("restart.png");
    bananaImage = loadImage("banana.png");
    grassI = loadImage("ground1.png");
    stoneImage = loadImage("obstacle.png");
    forestI = loadImage("forest.png");    
}

function setup() {
    forest = createSprite(600, 200, 10, 10);
    forest.addImage("forest", forestI);
    forest.scale = 1.5;
    forest.velocityX = -4;
    forest.x = 600;

    monkey = createSprite(50, 300, 10, 10);
    monkey.addAnimation("animation", monkey_running);
    monkey.scale = 0.15;

    ground = createSprite(300, 375, 600, 10);
    ground.visible = false;

    grass = createSprite(300, 360, 600, 10);
    grass.addImage("grass", grassI);
    grass.scale = 1.5;

    go = createSprite(300, 150, 600, 10);
    go.addImage("gameo", goI);
    go.scale = 0.4;
    go.visible = false;

    restart = createSprite(300, 300, 600, 10);
    restart.addImage("restart", restartI);
    restart.scale = 0.25;
    restart.visible = false;

    block = createSprite(300, 300, 200, 200);
    block.visible = false;

    bananaGroup = new Group();
    stoneGroup = new Group();
}
function draw() {
    createCanvas(600, 400)
    background(0)
    drawSprites();
    if (gameState === 1) {
        Things1();
        grass.velocityX = -4;
        forest.velocityX = -4;
        if (forest.x == 100) {
            forest.x = 600;
        }
        if (grass.x == 192) {
            grass.x = grass.width / 2;
        }
        if (keyDown("a") && monkey.y === 323.95) {
            monkey.velocityY = -20;
        }
        monkey.velocityY = monkey.velocityY + 0.8;
        monkey.collide(ground);
        if (bananaGroup.isTouching(monkey)) {
            score = score + 1;
            bananaGroup.destroyEach();
        }
        if (stoneGroup.isTouching(monkey)) {
            gameState = 0;
        }
    }
    if (gameState === 0) {
        monkey.velocityY = 0;
        forest.velocityX = 0;
        grass.velocityX = 0;
        bananaGroup.setVelocityXEach(0);
        stoneGroup.setVelocityXEach(0);
        forest.visible = false;
        grass.visible = false;
        monkey.visible = false;
        bananaGroup.setVisibleEach(false);
        stoneGroup.setVisibleEach(false);
        go.visible = true;
        restart.visible = true;
    }
    if (mousePressedOver(block)) {
        reset();
        forest.visible = true;
        grass.visible = true;
        monkey.visible = true;
        bananaGroup.setVisibleEach(true);
        stoneGroup.setVisibleEach(true);
        bananaGroup.destroyEach();
        stoneGroup.destroyEach();
        go.visible = false;
        restart.visible = false;
    }
}
function Things1() {
    if (frameCount % 135 == 0) {
        banana = createSprite(600, 100, 10, 10);
        banana.addImage("banana", bananaImage);
        banana.scale = 0.1;
        banana.y = Math.round(random(50, 200));;
        banana.velocityX = -4;
        banana.lifetime = 300;
        bananaGroup.add(banana);
    }
    if (frameCount % 175 == 0) {
        stone = createSprite(600, 360, 10, 10);
        stone.addImage("stone", stoneImage);
        stone.scale = 0.1;
        stone.velocityX = -4;
        stone.lifetime = 300;
        stoneGroup.add(stone);
    }
}
function reset() {
    gameState = 1;
    
}