const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;


const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


const GAME_STATE = {

    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
    playerX: 0,
    playerY: 0,

}
function setPosition($el, x, y){

    $el.style.transform = `translate(${x}px, ${y}px)`;

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

function updatePlayer(){
    if (GAME_STATE.leftPressed){
        GAME_STATE.playerX -= 5;
    }
    if (GAME_STATE.rightPressed){
        GAME_STATE.playerX += 5;
    }

    const $player = document.querySelector(".player");
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function update() {

    updatePlayer();
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
}

init ();

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);
