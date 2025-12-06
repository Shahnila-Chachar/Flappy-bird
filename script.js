let board;
let boardwidth = 360;
let boardheight = 640;
let context;

let birdwidth = 34;
let birdheight = 24;
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



window.onload = function() {
    board = document.getElementById("board");
    board.width = boardwidth;
    board.height = boardheight;
    context = board.getContext("2d");

    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

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

}

function update() {
        this.requestAnimationFrame(update);
        context.clearRect(0, 0, board.width, board.height);
        context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
        for (let i = 0; i < pipes.length; i++) {
            let pipe = pipes[i];
            pipe.x -= 2;
            context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);
        }
    }
function placePipes() {
    let randompipeY = pipey - pipeheight/4 - Math.random() * (pipeheight/2);
    let toppipe = {
        image: topPipeimage,
        x: pipex,
        y: randompipeY,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipes.push(toppipe);
    }
