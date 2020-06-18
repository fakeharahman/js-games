const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;
let container = document.querySelectorAll(".container");
let inner = document.querySelector(".inner")

function fixedNav() {
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + "px";
        document.body.classList.add("fixed-nav");

    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove("fixed-nav");

    }
}

window.addEventListener("scroll", fixedNav);


var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function (event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function (e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function () {
        return "(" + this.x + ", " + this.y + ")";
    }
};

// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

//----------------------------------------------------

var counter = 0;
var refreshRate = 10;
var isTimeToUpdate = function () {
    return counter++ % refreshRate === 0;
};

//----------------------------------------------------

var onMouseEnterHandler = function (event) {
    update(event);
};

var onMouseLeaveHandler = function () {
    // console.log(inner)
    // console.log()
    this.children[0].style = "";
};

var onMouseMoveHandler = function (event) {
    // console.log(this)
    if (isTimeToUpdate()) {
        update(event, this);
    }
};

//----------------------------------------------------

var update = function (event, com) {
    mouse.updatePosition(event);
    // console.log(com, com.children[0])
    // console.log(event.clientY)
    if (com)
        updateTransformStyle(
            (event.clientY / com.children[0].offsetHeight / 2).toFixed(2),
            (event.clientX / com.children[0].offsetWidth / 2).toFixed(2), com
        );
};

var updateTransformStyle = function (x, y, com) {

    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    com.children[0].style.transform = style;
    com.children[0].style.webkitTransform = style;
    com.children[0].style.mozTranform = style;
    com.children[0].style.msTransform = style;
    com.children[0].style.oTransform = style;
};

// const heading = document.getElementById("heading");
// console.log(heading.value)
// var i = 0;
// var txt = 'Funities - All about having fun!'; /* The text */
// var speed = 50; /* The speed/duration of the effect in milliseconds */

// function typeWriter() {
//     if (i < txt.length) {
//         heading.innerHTML += txt.charAt(i);
//         i++;
//         setTimeout(typeWriter, speed);
//     }
// }

// typeWriter();

const heading = document.querySelector(".heading");
let txt = 'Funities - All about having fun!';
let i = 0;
for (i = 0; i < txt.length; i++) {
    const span = document.createElement("span");
    span.textContent = txt[i];
    span.setAttribute("id", i);
    heading.appendChild(span)
}
const spans = heading.querySelectorAll("span");

function setAnimation() {
    console.log(this)
    this.classList.add("h1-hover")
}
function deleteAnimation() {
    console.log(this)
    setTimeout(() => { this.classList.remove("h1-hover") }, 150)
}

spans.forEach(span => span.addEventListener("mouseenter", setAnimation));
spans.forEach(span => span.addEventListener("mouseleave", deleteAnimation));

container.forEach(container => container.addEventListener("mouseenter", onMouseEnterHandler));
container.forEach(container => container.addEventListener("mouseleave", onMouseLeaveHandler));
container.forEach(container => container.addEventListener("mousemove", onMouseMoveHandler));
