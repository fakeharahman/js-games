const grid = document.querySelector('.grid');
const btn = document.getElementById("btn");
const score = document.querySelector("#score");
const width = 20;
const noOfItems = 400;
const squares = [];

function create() {
    for (let i = 0; i < noOfItems; i++) {
        // console.log(i)
        const square = document.createElement("div");
        squares.push(square);
        grid.appendChild(square);
        // squares[i].ClassList.add("snake")
    }

}
// console.log(squares[0]);
create();
let curIndex = 0;
let speed = 0.8;
let curSnake = [2, 1, 0];
let direction = 1;
let intervalTime = 1000;
let interval = 0;
let appleIndex = 0
let curScore = 0;

function start() {
    console.log(appleIndex);
    squares[appleIndex].classList.remove("apple");
    curSnake.forEach(item => squares[item].classList.remove("snake"));
    clearInterval(interval);
    appleIndex = 0;
    score.innerHTML = "0"
    curIndex = 0;
    speed = 0.95;
    curSnake = [2, 1, 0];
    direction = 1;
    intervalTime = 700;
    curScore = 0;
    randomApple();
    interval = 0;
    curSnake.forEach(item => squares[item].classList.add("snake"));
    interval = setInterval(move, intervalTime);
    // console.log(curSnake);

}

function control(e) {
    e.preventDefault();
    if (e.keyCode === 38) {
        direction = -width;
    }
    if (e.keyCode === 39) {
        direction = +1;
    }
    if (e.keyCode === 40) {
        direction = width;
    }
    if (e.keyCode === 37) {
        direction = -1;
    }
}

function move() {
    if (
        (curSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
        (curSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
        (curSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (curSnake[0] - width < 0 && direction === -width) || //if snake hits the top
        squares[curSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
        score.innerHTML = (`\t ${curScore} <br> Game over  `)
        // squares[appleIndex].classList.remove("apple");

        return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    let tail = curSnake.pop();
    squares[tail].classList.remove("snake");
    curSnake.unshift(curSnake[0] + direction);


    if (squares[curSnake[0]].classList.contains("apple")) {
        curScore++;
        squares[curSnake[0]].classList.remove("apple");
        randomApple();
        squares[tail].classList.add("snake");
        curSnake.push(tail);
        score.innerHTML = curScore;
        clearInterval(interval);
        intervalTime *= speed;
        interval = setInterval(move, intervalTime);

    }
    squares[curSnake[0]].classList.add("snake");

}

function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * noOfItems);

        // console.log(appleIndex)
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

btn.addEventListener("click", start);
window.addEventListener("keyup", control);