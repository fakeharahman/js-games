document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const width = 17; //17x17=289
    const score = document.querySelector("#score")

    //0 pac-dot
    //1 wall
    //2 ghost lair
    //3 power pellet
    //4 empty
    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 3, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 3, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1,
        4, 4, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 4, 4,
        4, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4, 4,
        1, 1, 1, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0, 0, 1, 1, 1,
        0, 0, 0, 0, 1, 0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0,
        1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4,
        1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1,
        1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1,
        1, 3, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

    ]
    // var k = 0;
    // for (var i = 0; i < layout.length; i++) {
    //     if (layout[i] === 0 || layout[i] === 3) k++;
    // }
    // console.log(k);

    let pellets = 0;

    const squares = [];

    function create() {
        for (var i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);
            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot');
            } else if (layout[i] === 1) {
                squares[i].classList.add("walls");
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellets");
            } else if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair");
            }

        }
    }
    create();

    let curIndex = 178;
    squares[curIndex].classList.add("pacman");



    function move(e) {


        squares[curIndex].classList.remove("pacman");
        if (curIndex === 152 && e.keyCode === 39) {
            curIndex = 136;
        } else if (curIndex === 136 && e.keyCode === 37) {
            curIndex = 152;
        } else if (e.keyCode === 38 && !squares[curIndex - width].classList.contains('walls')) {
            curIndex -= width;

        } else if (e.keyCode === 40 && !squares[curIndex + width].classList.contains('walls') && !squares[curIndex + width].classList.contains('ghost-lair')) {
            curIndex += width;

        } else if (e.keyCode === 37 && !squares[curIndex - 1].classList.contains('walls')) {
            curIndex -= 1;
        } else if (e.keyCode === 39 && !squares[curIndex + 1].classList.contains('walls')) {
            curIndex += 1;
        }
        squares[curIndex].classList.add("pacman");

        ghosts.forEach(ghost => ghostEaten);
        pacEaten();
        powerUp();
        gameover();
        gameWon();
    }
    let curscore = 0;

    function pacEaten() {
        if (squares[curIndex].classList.contains('pac-dot')) {
            squares[curIndex].classList.remove("pac-dot");
            curscore++;
            score.innerHTML = curscore;
            pellets++;
        }
    }

    class Ghost {
        constructor(name, startIndex, speed) {
            this.name = name;
            this.startIndex = startIndex;
            this.speed = speed;
            this.curIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }
    const ghosts = [
        new Ghost("inky", 144, 250),
        new Ghost("pinky", 145, 300),
        new Ghost("bluy", 143, 400),
        new Ghost("purr", 127, 500)
    ]
    ghosts.forEach(ghost => {
        squares[ghost.curIndex].classList.add(ghost.name);
        squares[ghost.curIndex].classList.add("ghost");

    })
    ghosts.forEach(ghost => {
        moveGhost(ghost);
    })

    function gameover() {
        if (squares[curIndex].classList.contains('ghost') &&
            !squares[curIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            setTimeout(() => alert(`Game over \n Score: ${curscore}`));
            document.removeEventListener("keyup", move);

        }
    }

    function gameWon() {
        if (pellets == 132) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            setTimeout(() => alert(`Game Won \n Score: ${curscore}`));
            document.removeEventListener("keyup", move);
        }

    }

    function powerUp() {
        if (squares[curIndex].classList.contains("power-pellets")) {
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unscare, 10000);
            squares[curIndex].classList.remove("power-pellets");
            curscore += 10;
            pellets++;
        }
    }

    function unscare() {
        ghosts.forEach(ghost => ghost.isScared = false);

    }

    function ghostEaten(ghost) {
        if (ghost.isScared && squares[ghost.curIndex].classList.contains("pacman")) {
            squares[ghost.curIndex].classList.remove('scared-ghost', 'ghost', ghost.name);
            ghost.curIndex = ghost.startIndex;
            curscore += 100;
            squares[ghost.startIndex].classList.add("ghost", ghost.name);
            ghost.isScared = false;
        }
    }

    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function () {
            if (!squares[ghost.curIndex + direction].classList.contains("walls") && !squares[ghost.curIndex + direction].classList.contains("ghost")) {
                squares[ghost.curIndex].classList.remove("ghost", ghost.name, "scared-ghost");
                squares[ghost.curIndex + direction].classList.add("ghost", ghost.name);
                ghost.curIndex = ghost.curIndex + direction;
            } else direction = directions[Math.floor(Math.random() * directions.length)];
            if (ghost.isScared) {
                squares[ghost.curIndex].classList.add("scared-ghost");
            }
            if (ghost.isScared && squares[ghost.curIndex].classList.contains("pacman")) {
                squares[ghost.curIndex].classList.remove('scared-ghost', 'ghost', ghost.name);
                ghost.curIndex = ghost.startIndex;
                curscore += 100;
                squares[ghost.startIndex].classList.add("ghost", ghost.name);
                ghost.isScared = false;
            }
            gameover();
        }, ghost.speed)
    }

    document.addEventListener("keyup", move)
})