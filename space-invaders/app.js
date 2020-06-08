const width = 15;
const length = 225;
const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
let result = 0;
const squares = [];
const invaderIndex = 0
let shooterIndex = 217;

let invaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
let invadersShot = [];


function create() {
    for (let i = 0; i < length; i++) {
        const square = document.createElement("div");
        squares.push(square);
        grid.appendChild(square);
    }

    invaders.forEach(invader => squares[invader].classList.add("invader"));
    squares[shooterIndex].classList.add("shooter")
}
// console.log(squares[1]);

function moveShooter(e) {
    squares[shooterIndex].classList.remove("shooter");
    if (e.keyCode === 37 && (shooterIndex) % width > 0) {
        shooterIndex--;
    } else if (e.keyCode === 39 && (shooterIndex) % width < width - 1) {
        shooterIndex++
    }
    squares[shooterIndex].classList.add('shooter');

}
document.addEventListener("keyup", moveShooter);
let direction = 1;

function moveInvaders() {
    const rightWall = invaders[invaders.length - 1] % width === width - 1
    const leftWall = invaders[0] % width === 0;
    invaders.forEach(invader => squares[invader].classList.remove("invader"));
    // console.log(invaders);
    if (direction === 1 && rightWall) {
        direction = width;
    } else if (direction === -1 && leftWall) {
        direction = width;
    } else if (direction === width && rightWall) {
        direction = -1;
    } else if (direction === width && leftWall) {
        direction = 1;
    }
    for (let i = 0; i < invaders.length; i++) {
        invaders[i] = invaders[i] + direction; // foreach cant modify array
        if (!invadersShot.includes(i))
            squares[invaders[i]].classList.add("invader");

    }
    if (squares[shooterIndex].classList.contains("invader")) {
        score.innerHTML = (`\tGame Over! \n Score: ${result}`);
        squares[shooterIndex].classList.add('boom')
        clearInterval(interval)
        // clearInterval(shootInterval)
        document.removeEventListener("keyup", shoot);
        document.removeEventListener("keyup", moveShooter);




    }
    invaders.forEach(invader => {
        if (invader > width * width - (width - 1)) {
            score.innerHTML = (`\tGame Over! \n Score: ${result}`);
            squares[shooterIndex].classList.add('boom')
            clearInterval(interval)
            // clearInterval(shootInterval)
            document.removeEventListener("keyup", shoot);
            document.removeEventListener("keyup", moveShooter);



        }

    })
    if (invadersShot.length === invaders.length) {
        score.innerHTML = (`\tGame Won! \n Score: ${result}`);
        clearInterval(interval)
        // clearInterval(shootInterval)
        document.removeEventListener("keyup", shoot);
        document.removeEventListener("keyup", moveShooter);
    }


}

let interval = setInterval(moveInvaders, 500)

function shoot(e) {
    let shootInterval;



    let laserIndex = shooterIndex;
    if (e.keyCode === 32) {
        result--;
        score.innerHTML = result;
        shootInterval = setInterval(laserfun, 100)
    }

    function laserfun() {


        // console.log(laserIndex)
        squares[laserIndex].classList.remove("laser");
        // console.log(squares[laserIndex])
        laserIndex = laserIndex - width;

        if (laserIndex < 0) {
            // console.log(laserIndex)
            clearInterval(shootInterval);

        } else if (squares[laserIndex].classList.contains("invader")) {
            squares[laserIndex].classList.remove("invader");
            // squares[laserIndex].classList.remove("laser");
            squares[laserIndex].classList.add("boom");
            setTimeout(squares[laserIndex].classList.remove("boom"), 400);
            result += 5;
            score.innerHTML = result;
            clearInterval(shootInterval);
            let invaderShot = invaders.indexOf(laserIndex);
            invadersShot.push(invaderShot);
        } else {
            // console.log(laserIndex)
            squares[laserIndex].classList.add("laser");

        }


    }

}



document.addEventListener("keyup", shoot)

create();