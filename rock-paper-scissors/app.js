let userChosen;
let computerChosen;
const buttons = document.querySelectorAll(".choices");
buttons.forEach(button => button.addEventListener("click", main));
const user = document.getElementById("user-choice");
const comp = document.getElementById("computer-choice");
const res = document.getElementById("result");


function main(e) {
    comp.innerHTML = "";
    userChosen = e.target.id;
    computerChosen = computerChoice();
    let resultf = result();
    user.innerHTML = userChosen;
    setTimeout(() => { comp.innerHTML = computerChosen }, 200);
    setTimeout(() => { res.innerHTML = resultf }, 200);

}

function result() {
    if (userChosen === computerChosen) {
        return "Its a tie!";
    }
    if (userChosen == "scissors" && computerChosen == "rock") {
        return "You Lose!";
    }
    if (userChosen == "rock" && computerChosen == "scissors") {
        return "You Win!";
    }
    if (userChosen == "paper" && computerChosen == "rock") {
        return "You Win!";
    }
    if (userChosen == "rock" && computerChosen == "paper") {
        return "You Lose!";
    }
    if (userChosen == "scissors" && computerChosen == "paper") {
        return "You Win!";
    }
    if (userChosen == "paper" && computerChosen == "scissors") {
        return "You Lose!";

    }
}

function computerChoice() {
    let random = Math.round(Math.random() * 2);
    console.log(random);
    if (random == 1) {
        return "scissors";
    }
    if (random == 2) {
        return "paper";
    }
    if (random == 0) {
        return "rock";
    }
}

const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;


function fixedNav() {
    // console.log(window.scrollY)
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + "px";
        document.body.classList.add("fixed-nav");

    } if (window.scrollY == 0) {
        document.body.style.paddingTop = 0;
        document.body.classList.remove("fixed-nav");

    }
}

window.addEventListener("scroll", fixedNav);