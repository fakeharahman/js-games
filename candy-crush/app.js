const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
const width = 8;
const height = 8;
const squares = [];

const colors = [
    "crimson",
    "yellow",
    "green",
    "blue",
    "pink",
    "purple"
]

function create() {
    let id = 0;
    for (let i = 0; i < height; i++) {
        let arr = []
        for (let j = 0; j < width; j++) {

            let square = document.createElement("div");
            square.setAttribute("draggable", true);
            let randomColor = Math.floor(Math.random() * colors.length)
            square.setAttribute("data-col", i);
            square.setAttribute("data-row", j);

            square.style.backgroundColor = colors[randomColor];
            grid.appendChild(square)
            id++;
            arr.push(square);

        }
        squares.push(arr);
    }
}
create();
squares.forEach(square => square.forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);


}));

let startColor;
let endColor;
let startRow;
let endRow;
let startCol;
let endCol;


function dragStart() {
    console.log(this.style.backgroundColor, "start")
    startColor = this.style.backgroundColor;
    startCol = parseInt(this.dataset.col);
    startRow = parseInt(this.dataset.row);

}



function dragOver(e) {
    e.preventDefault()

}

function dragEnter(e) {
    e.preventDefault()

}

function dragLeave() {
    console.log(this.style.backgroundColor, "leave")
    // this.style.backgroundColor = "";
}

function dragDrop() {
    //  console.log(squares[startId].style.backgroundColor)
    endColor = this.style.backgroundColor;
    endRow = parseInt(this.dataset.row);
    endCol = parseInt(this.dataset.col);
    this.style.backgroundColor = startColor;
    squares[startCol][startRow].style.backgroundColor = endColor;
}

function dragEnd() {

}