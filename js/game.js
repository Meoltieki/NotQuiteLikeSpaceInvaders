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
const LASER_MAX_SPEED = 300;
const LASER_COOLDOWN = 0.1;

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;




const GAME_STATE = {

    lastTime: Date.now(),
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
    spacePressed: false,

    playerX: 0,
    playerY: 0,
    playerCooldown: 0,
    lasers: [],
    enemies: [],

}

function rectsIntersect(r1, r2) {
    return !(
        r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top
    );
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

    const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / 
    (ENEMIES_PER_ROW - 1);
    for (let j = 0; j < 3; j++) {
        const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
        for (let i = 0; i < ENEMIES_PER_ROW;) {
            const x = 0; i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
            createEnemy($container, x, y);
        }
    }
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

    if ( GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0){
        createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY); 
        GAME_STATE.playerCooldown = LASER_COOLDOWN;
    }

    if (GAME_STATE.playerCooldown > 0){

      GAME_STATE.playerCooldown -= dt;

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

function updateLasers(dt, $container){

    const lasers = GAME_STATE.lasers;
    for (let i = 0; i < lasers.length; i++){
        const laser = lasers[i];
        laser.y -= dt * LASER_MAX_SPEED;
     if (laser.y < 0){
         destroyLaser($container, laser);
     }
        setPosition(laser.$element, laser.x, laser.y);
    }
    GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}

function destroyLaser($container, laser){

    $container.removeChild(laser.$element);
    laser.isDead = true;
}

function createEnemy ($container, x, y){
    const $element = document.createElement("img");
    $element.src = "img/enemy-blue-1.png";
    $element.className = "enemy";
    $container.appendChild($element);
    const enemy = {
        x,
        y,
        $element
    };
    GAME_STATE.enemies.push(enemy);
    setPosition($element, x, y);
}

function eupdateEnemies(dt, $container){
    const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
    const dy = Math.sin (GAME_STATE.lastTime / 1000.0) * 10;

    const enemies = GAME_STATE.enemies;
    for (let i = 0; i < enemies.lenght; i++) {
        const enemy = enemies[i];
        const x = enemy.x + dx;
        const y = enemy.y + dy;
        setPosition(enemy.$element, x, y);
    }
}


function update() {
    const currentTime = Date.now();
    const dt = (currentTime - GAME_STATE.lastTime) / 1000;

    const $container = document.querySelector(".game"); 
    updatePlayer(dt, $container);
    updateLasers(dt, $container);
    updateEnemies(dt, $container);

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
