//board
let board;
let boardWidth =  1200;
let boardHeight = 980;
let context;

//mario
let marioWidth = 54;
let marioHeight = 54;
let marioX = boardWidth/8;
let marioY = boardHeight *17/20;
let marioRightImg;
let marioLeftImg;

let mario ={
    img : null,
    x: marioX,
    y: marioY,
    width: marioWidth,
    height: marioHeight
}

//spiny
let spinyArray = [];
let spinyWidth = 34;
let spinyHeight = 34;
let spinyX = boardWidth;
let spinyY= boardHeight *9/10.3;
let spinyImg;

//gem
let gemArray = [];
let gemWidth = 24;
let gemHeight = 24;
let gemX = boardWidth;
let gemY= boardHeight*3/4;
let gemImg;

//game physics
let velocityX = 0;
let velocityY = 0;
let spinyVelocity = -2;
let gemVelocity = -1;
let initialVelocityY = 0;
let gravity = 4;

//score
let score = 0;

let gameOver = false;

window.onload =function(){
    board = document.getElementById("board");
    board.height =  boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw mario
    marioRightImg = new Image();
    marioRightImg.src = "images/mario-right.png"

    spinyImg = new Image();
    spinyImg.src = "images/spiny.png";

    gemImg = new Image();
    gemImg.src = "images/gem.gif";

    marioRightImg.onload = function(){
        context.drawImage(marioRightImg,mario.x,mario.y,mario.width,mario.height);
        mario.img  = marioRightImg;
    } 

    marioLeftImg = new Image();
    marioLeftImg.src = "images/mario-left.png";

    requestAnimationFrame(update);
    document.addEventListener("keydown",moveMario);
    setInterval(placeSpiny, 1500);
    setInterval(placeGem, 1500);
    
}
function update(){
    requestAnimationFrame(update);

    if(gameOver==true){
        return;
    }

    context.clearRect(0,0, board.width,board.height);

    mario.x +=  velocityX;
    mario.y +=  velocityY;
    if(mario.x > boardWidth){
        mario.x = 0;
    }
    else if(mario.x + mario.width<0){
        mario.x = boardWidth;
    }
    if (mario.y < boardHeight*3/4) {
        velocityY = 4;
    }
    if(mario.y > marioY){
        mario.y = marioY;
    }
    // velocityY += gravity;
    // mario.y += velocityY;

    context.drawImage(mario.img,mario.x,mario.y,mario.width,mario.height);

    //spiny 
    for (let i = 0; i < spinyArray.length; i++) 
    {
        let spiny = spinyArray[i];
        spiny.x += spinyVelocity;
        context.drawImage(spinyImg,spiny.x,spiny.y,spiny.width,spiny.height);
        if(detectCollision(mario,spiny)){
            gameOver = true;
        }

    }
    for (let i = 0; i < gemArray.length; i++) 
    {
        let gem = gemArray[i];
        gem.x += gemVelocity;
        context.drawImage(gemImg,gem.x,gem.y,gem.width,gem.height);

        if(detectCollision(mario,gem)){
            gem.y = -20
            score ++;
        }
    }
    context.fillStyle = "black";
    context.font="40px sans-serif";
    context.fillText("Score:"+ score,70, 70);
    if(gameOver == true){
        context.fillText("Game Over: Press 'space' to restart", boardWidth/7, boardHeight * 7/8);
    }
}
function moveMario(e){
    if(e.code == "ArrowRight"){
        velocityX= 2;
        if (velocityY == 4) {
            velocityX =2;
        }
        mario.img = marioRightImg;
    }
    else if(e.code == "ArrowLeft"){
        velocityX = -2;
        if (velocityY == 4) {
            velocityX =-2;
        }
        mario.img  = marioLeftImg;
    }
    else if(mario.y == marioY){
    if(e.code == "ArrowUp"){
        velocityY =-4;
    }}

    else if(e.code == "Space" &&  gameOver){
        //reset
        mario = {
            img : marioRightImg,
            x: marioX,
            y: marioY,
            width : marioWidth,
            height : marioHeight
        }
        velocityX = 0;
        velocityY = 0;
        score = 0;
        gameOver = false ; 
        placeSpiny();
        placeGem();
        gemArray =[];
        spinyArray  = [];
        }
    }

function placeSpiny(){
    let randomSpinyX = spinyX;
    let openingSpace = board.width/4;
    let spiny={
        img: spinyImg,
        x : spinyX,
        y: spinyY,
        width : spinyWidth,
        height : spinyHeight
    }
    spiny={
        img: spinyImg,
        x : spinyX + Math.floor(Math.random()*90),
        y: spinyY,
        width : spinyWidth,
        height : spinyHeight
    }
    spinyArray.push(spiny);
}
function placeGem(){
    let gem={
        img: gemImg,
        x : gemX,
        y: gemY,
        width : gemWidth,
        height : gemHeight
    }
    gem={
        img: gemImg,
        x : gemX + Math.floor(Math.random()*100),
        y: gemY,
        width : gemWidth,
        height : gemHeight
    }
    gemArray.push(gem);
}
function detectCollision(a,b) {
    return a.x < b.x + b.width && a.x+a.width >b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }


