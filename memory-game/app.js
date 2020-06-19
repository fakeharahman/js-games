const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
const restart = document.getElementById("restart")
let items = [{
    name: "star",
    src: "images/1.jpg"
}, {
    name: "ghost",
    src: "images/2.jpg"

}, {
    name: "eye",
    src: "images/3.jpg"
}, {
    name: "mug",
    src: "images/4.jpg"

}, {
    name: "cat",
    src: "images/6.jpg"
}, {
    name: "tree",
    src: "images/7.jpg"

}, {
    name: "star",
    src: "images/1.jpg"
}, {
    name: "ghost",
    src: "images/2.jpg"

}, {
    name: "eye",
    src: "images/3.jpg"
}, {
    name: "mug",
    src: "images/4.jpg"

}, {
    name: "cat",
    src: "images/6.jpg"
}, {
    name: "tree",
    src: "images/7.jpg"

}];

items.sort(() => 0.5 - Math.random());

function create() {
    for (let i = 0; i < items.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", "images/blank1.jpg");
        card.setAttribute('data-id', i)
        card.addEventListener("click", flipCard)
        grid.appendChild(card);
    }
}
let cardsChosen = [];
let cardsWon = [];
let chosenCardsId = [];
let result = 0;

function flipCard() {
    if (cardsChosen.length < 2) {
        result--;
        score.innerHTML = result;
        var cardId = this.getAttribute("data-id");
        chosenCardsId.push(cardId);
        cardsChosen.push(items[cardId].name);
        this.setAttribute("src", items[cardId].src)
        // console.log(this)
        if (cardsChosen.length == 2) {
            setTimeout(checkWin, 500);

        }
    }

}


function checkWin() {
    const imgs = document.querySelectorAll("img");
    let first = chosenCardsId[0];
    let second = chosenCardsId[1];
    // console.log(imgs)
    if (first !== second && items[first].name === items[second].name) {
        result += 10;
        score.innerHTML = result;
        imgs[first].setAttribute("src", "images/black.jpg")
        imgs[second].setAttribute("src", "images/black.jpg")
        imgs[first].removeEventListener("click", flipCard);
        imgs[second].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);

    } else {
        imgs[first].setAttribute("src", "images/blank1.jpg")
        imgs[second].setAttribute("src", "images/blank1.jpg")
    }
    // console.log(cardsWon)
    if (cardsWon.length === items.length / 2) {
        score.innerHTML = `${result}<br>YOU WIN!`;
        restart.innerHTML = "Press ctrl+shift+R to restart"

    }
    cardsChosen = [];
    chosenCardsId = [];
}

create();

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