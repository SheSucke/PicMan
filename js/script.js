const SIZE = 20;
const TRESHOLD = 0.3;
const WIDTH = 600;
const HEIGHT = 600;
const BLOCK_SIZE = 30;

let nmbOfBlocks = WIDTH/BLOCK_SIZE;
let nmbOfTargets = 6;

let limit = 60000;

let ctx = canvas.getContext('2d');
let score = document.getElementById('score');
let time = document.getElementById('time');
let startBlock = document.getElementById('start');
let endBlock = document.getElementById('end');
let msg = document.getElementById('message');
let btn_playAgain = document.getElementById('btn-playAgain');

let timer = new Date(limit);

canvas.width = WIDTH;
canvas.height = HEIGHT;

// let board = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
//     [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//     [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
//     [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
//     [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
//     [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
//     [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
//     [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
//     [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
//     [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
//     [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
//     [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
//     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];

let board = generateLabyrinth(TRESHOLD);

let wall = new Image();
wall.src =  '../src/wall.png'

let hero = new Image();
hero.src = '../src/down.png';

let targetsImg = [
    new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(), new Image()
];

targetsImg[0].src = '../src/pill1.png';
targetsImg[1].src = '../src/pill2.png';
targetsImg[2].src = '../src/pill3.png';
targetsImg[3].src = '../src/pill4.png';
targetsImg[4].src = '../src/fruit1.png';
targetsImg[5].src = '../src/fruit2.png';
targetsImg[6].src = '../src/tea.png';

let player = getInitPlayerPosition();

let targets = createTargets(nmbOfTargets);

function getInitPlayerPosition() {
    let p;
    do {
        p = {
            x: Math.floor(Math.random() * board.length),
            y: Math.floor(Math.random() * board.length)
        };
    } while (board[p.x][p.y] === 1);
    return p;
};

let keys = [];

function startGame() {
    targets = createTargets(nmbOfTargets);
    timer = new Date(limit);
    time.textContent = `${timer.getMinutes()}:${timer.getSeconds()}`;
    score.textContent = `0/${nmbOfTargets}`;
    draw();
    drawTargets();
    startTimer();
}

function setValues(numbTrgts, timelimit) {
    nmbOfTargets = numbTrgts;
    limit = timelimit;
    startBlock.style.display = 'none';
    startGame();
}

function renderBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++){
            board[row][col] === 1 ? ctx.drawImage(wall, row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE):null;    
        }
    }
};

function renderScore() {
    score.textContent = (nmbOfTargets - targets.length).toString() + '/' + nmbOfTargets.toString();
}

function startTimer() {
    let countDown = setInterval(function () {
        timer = new Date(timer.getTime() - 1000);
        time.textContent = `${timer.getMinutes()}:${timer.getSeconds()}`;
        if (targets.length === 0) {
            clearInterval(countDown);
            endGame('win');
        }
        if (timer <= 0) {
            clearInterval(countDown);
            endGame('lose');
        }
    },1000);
}

function endGame(state) {
    if (state === 'win') {
        endBlock.style.display = 'block';
        msg.textContent = 'Vyhrál jsi ty fageto-bageto-rageto!¡!';
        msg.classList.add('text-success');
        btn_playAgain.classList.add('btn-success');
    } else if (state === 'lose') {
        endBlock.style.display = 'block';
        msg.textContent = 'Jsi jouda-bouda!!!';
        msg.classList.add('text-danger');
        btn_playAgain.classList.add('btn-danger');
    } else {
        console.log('wrong state');
    }
}

function draw() {
    ctx.clearRect(player.x * BLOCK_SIZE, player.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    renderBoard();
    movement();
    collect();
    ctx.drawImage(hero, player.x * BLOCK_SIZE, player.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
};

function movement() {
    if (keys[39]) {
        // šipka doprava
        hero.src = "../src/right.png";
        canMove(player.x + 1, player.y) ? player.x++:null;
    }
 
    if (keys[37]) {
        // šipka doleva
        hero.src = "../src/left.png";
        canMove(player.x - 1, player.y) ? player.x--:null;
    }
 
    if (keys[38]) {
        // šipka nahoru
        hero.src = "../src/up.png";
        canMove(player.x, player.y - 1) ? player.y--:null;
    }
 
    if (keys[40]) {
        // šipka dolů
        hero.src = "../src/down.png";
        canMove(player.x, player.y + 1) ? player.y++:null;
    }
};

function canMove(row, col) {
    return row > 0 && col > 0 && (row < board.length - 1) && (col < board.length - 1) && board[row][col] != 1;
};

function collect() {
    for (let i = 0; i < targets.length; i++) {
        if (player.x === targets[i].x && player.y === targets[i].y) {
            targets.splice(i, 1);
            renderScore();
        }
    }
}

function createTargets(n) {
    let trg = [];
    for (let i = 0; i < n; i++) {
        trg.push(getTarget());
    }
    return trg;
};

function getTarget() {
    let singleTarget;
    do {
        singleTarget = {
            x: Math.floor(Math.random() * board.length),
            y: Math.floor(Math.random() * board.length),
            img: targetsImg[Math.floor(Math.random() * targetsImg.length)]
        };
    } while (board[singleTarget.x][singleTarget.y] === 1 || (player.x === singleTarget.x && player.y === singleTarget.y));
    return singleTarget;
};

function drawTargets() {
    targets.forEach(t => {
        ctx.drawImage(t.img, t.x * BLOCK_SIZE, t.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    });
}

// window.addEventListener('load', startGame);
window.addEventListener('load', draw);
window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    draw();
});
window.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
    draw();
});
/*
function generateLabyrinth(size, threshold) {
    function getBoard(size) {
        return [...Array(size)].map(i => Array(size).fill(0));
    }

    function getBorderedBoard(size) {
        let b = getBoard(size);
        for (let col = 0; col < size; col++){
            b[0][col] = 1;
            b[size - 1][col] = 1;
        }
        
        for (let row = 0; row < size; row++){
            b[row][0] = 1;
            b[row][size - 1] = 1;
        }
        return b; //with boarders
    }

    function rankNode(board, row, col) {
        if (board[row][col] === 1) {
            return 1;
        }
        let neib = 0;
        neib += board[row + 1][col - 1];
        neib += board[row + 1][col];
        neib += board[row + 1][col + 1];
        neib += board[row][col - 1];
        neib += board[row][col + 1];
        neib += board[row - 1][col - 1];
        neib += board[row - 1][col];
        neib += board[row - 1][col + 1];
        return neib / 8;
    }
    
    function rankBoard(board) {
        rB = getBoard(board.length);
        for (let row = 0; row < board.length; row++){
            for (col = 0; col < board.length; col++){
                rB[row][col] = rankNode(board, row, col);
            }
        }
        return rB;
    }
    
    function getRandomMinCoord(rB){
        let min = 1;
        let minList = [];
        for (let row = 1; row < rB.length - 1; row++){
            for (col = 1; col < rB.length - 1; col++){
                if (min > rB[row][col]) {
                    min = rB[row][col];
                    minList = [{'row': row, 'col': col}];
                } else if (min === rB[row][col]) {
                    minList.push({row, col});
                }
            }
        }    
        return minList[Math.floor(Math.random() * minList.length)];
    }

    let board = getBorderedBoard(size);
    let boardMin = 0;
    let Rb;
    while (boardMin <= threshold) {
        rB = rankBoard(board);
        minCoord = getRandomMinCoord(rB);
        board[minCoord.row][minCoord.col] = 1;
        boardMin = rB[minCoord.row][minCoord.col];
    }
    return board;
}
*/