const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;


const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 5;
const PLAYER_MAX_SPEED = 600;


const GAME_STATE = {

    lastTime: Date.now(),
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
    spacePressed: false,

    playerX: 0,
    playerY: 0,
    enemyX: 0,
    enemyY: 0,
    lasers: [],

}
function setPosition($el, x, y){

    $el.style.transform = `translate(${x}px, ${y}px)`;

}

function clamp(v, min, max){

    if (v<min){
        return min;
    } else if (v>max){
        return max;
    }else {
        return v;
    }

}

function createEnemy($container){
    GAME_STATE.enemyX  = GAME_WIDTH /2;
    GAME_STATE.enemyY = GAME_HEIGHT -50;
    const $enemy = document.createElement("img");
    $enemy.src = "img/nasty.jpg";
    $enemy.className = "enemy";
    $container.appendChild($enemy);
    setPosition($enemy, GAME_STATE.enemyX, GAME_STATE.enemyY);
}

function createPlayer($container) {

    GAME_STATE.playerX = GAME_WIDTH /2;
    GAME_STATE.playerY = GAME_HEIGHT -50;
    const $player = document.createElement("img");
    $player.src = "img/player-red-1.png";
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function init() {

    const $container = document.querySelector(".game");
    createPlayer($container);
}

function updatePlayer(dt, $container){
    if (GAME_STATE.leftPressed){
        GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;
    }
    if (GAME_STATE.rightPressed){
        GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
    }
    if (GAME_STATE.leftPressed){
        GAME_STATE.playerX -= 5;
    }
    if (GAME_STATE.rightPressed){
        GAME_STATE.playerX += 5;
    }
    if (GAME_STATE.upPressed){
        GAME_STATE.playerY -= 5;
    }
    if (GAME_STATE.downPressed){
        GAME_STATE.playerY += 5;
    }
    GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH, 
    GAME_WIDTH - PLAYER_WIDTH);

    GAME_STATE.playerY = clamp(
        GAME_STATE.playerY,
        PLAYER_HEIGHT, 
        GAME_HEIGHT - PLAYER_HEIGHT);

    if ( GAME_STATE.spacePressed){
        createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY); 
    }

    const $player = document.querySelector(".player");
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function createLaser ($container, x, y){

    const $element = document.createElement("img");
        $element.src = "img/laserBlue01.png";
        $element.className = "laser";
        $container.appendChild($element);
        const laser = {x, y, $element};
        GAME_STATE.lasers.push(laser);
        setPosition($element, x, y);
        const audio = new Audio ("sound/sfx_laser1.ogg");
        audio.play();
}

function update() {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000;

    const $container = document.querySelector(".game"); 
    updatePlayer(dt, $container);

    GAME_STATE.lastTime = currentTime;

    window.requestAnimationFrame(update);
}

function onKeyDown(e) {
if (e.keyCode === KEY_CODE_LEFT){

   GAME_STATE.leftPressed = true;

} else if(e.keyCode === KEY_CODE_RIGHT) {

   GAME_STATE.rightPressed = true;

   }
   else if(e.keyCode === KEY_CODE_SPACE) {

    GAME_STATE.spacePressed = true;

    }else if(e.keyCode === KEY_CODE_UP) {

        GAME_STATE.upPressed = true;
    
    } else if(e.keyCode === KEY_CODE_DOWN) {

        GAME_STATE.downPressed = true;
    
    }
}

function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT){
    
       GAME_STATE.leftPressed = false;
    
    } else if(e.keyCode === KEY_CODE_RIGHT) {
    
       GAME_STATE.rightPressed = false;
    
       } else if(e.keyCode === KEY_CODE_SPACE) {
    
        GAME_STATE.spacePressed = false;
    
    }
    else if(e.keyCode === KEY_CODE_UP) {

        GAME_STATE.upPressed = false;
    
    } else if(e.keyCode === KEY_CODE_DOWN) {

        GAME_STATE.downPressed = false;
    
    }
    console.log(e);
}

init ();

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
