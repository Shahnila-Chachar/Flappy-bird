let board;
let boardwidth = 1500;
let boardheight = 700;
let context;

let birdwidth = 54;
let birdheight = 34;
let birdx = boardwidth/8;
let birdy = boardheight/2;
let birdimage;

let bird = {
    x: birdx,
    y: birdy,
    width: birdwidth,
    height: birdheight
}

let pipes = [];
let pipewidth = 64;
let pipeheight = 512;
let pipex = boardwidth;
let pipey = 0;

let topPipeimage;
let bottomPipeimage;

let velocityY = 0;
let velocityX = -2;
let gravity = 0.4;

let gameover = false;
let score = 0;


window.onload = function() {
    board = document.getElementById("board");
    board.width = boardwidth;
    board.height = boardheight;
    context = board.getContext("2d");

    birdimage = new Image();
    birdimage.src = "images/flappyBird.png";
    birdimage.onload = function() {
    context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeimage = new Image();
    topPipeimage.src = "images/top.png";

    bottomPipeimage = new Image();
    bottomPipeimage.src = "images/bottom.png";

    this.requestAnimationFrame(update);
    this.setInterval(placePipes, 1500);

    document.addEventListener("keydown", moveBird);

}

function update() {
        this.requestAnimationFrame(update);
        if (gameover) {
            return;
        }
        context.clearRect(0, 0, board.width, board.height);

        velocityY += gravity;
        bird.y += velocityY;

    // Limit bird inside canvas
        if (bird.y < 0) bird.y = 0;
        if(bird.y > board.height){
            gameover = true;
        }
            
        context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
        if(bird.y > board.height){
            gameover = true;
        }
        
        for (let i = 0; i < pipes.length; i++) {
            let pipe = pipes[i];
            pipe.x -= 2;
            context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);

            if(!pipe.passed && pipe.x + pipe.width < bird.x) {
                score += 0.5;
                pipe.passed = true;
            }
            if(detectCollision(bird, pipe)) {
                gameover = true;
            }
        }

        while(pipes.length > 0 && pipes[0].x < -pipewidth) {
            pipes.shift();
        }

        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Score: " + score, 10, 25);

        if (gameover) {
        context.fillText("Game Over!", boardwidth / 2 - 50, boardheight / 2);
        }
    }
function placePipes() {
    if(gameover) {
        return;
    }
    let randompipeY = pipey - pipeheight/4 - Math.random() * (pipeheight/2);
    let openingspace = birdheight * 6;
    let toppipe = {
        image: topPipeimage,
        x: pipex,
        y: randompipeY,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipes.push(toppipe);

    let bottompipe = {
        image: bottomPipeimage,
        x: pipex,
        y: randompipeY + pipeheight + openingspace,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipes.push(bottompipe);
    }

    function moveBird(evt) {
        if (evt.code == "Space" || evt.code == "ArrowUp" || evt.code == "KeyW") {
            velocityY = -6;

            if (gameover) {
                bird.y = birdy;
                velocityY = 0;
                pipes = [];
                score = 0;
                gameover = false;
            }
        }
    }

    function detectCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }