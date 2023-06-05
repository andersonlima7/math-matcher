"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const operationsContainer = document.querySelector(".operations-div");

  const width = 5;
  const squares = [];
  const operations = ["=", "+"];
  const operationsSquares = [];
  const numberColors = [
    "#dc143c",
    "#F97B22",
    "#FFD700",
    "#7AA874",
    "#E893CF",
    "#4682b4",
    "#9376E0",
  ];

  // Generate numbers
  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate a 5x5 matrix with random numbers from 0 to 50
  const generateMatrix = () => {
    let matrix = [];

    for (let i = 0; i < width; i++) {
      let row = [];

      for (let j = 0; j < width; j++) {
        let randomNumber = getRandomNumber(0, 30);
        row.push(randomNumber);
      }

      matrix.push(row);
    }

    return matrix;
  };

  // Returns if an array has the passed array in it.
  const isArrayInArray = (array, item) => {
    const itemString = JSON.stringify(item);
    const contains = array.some((arr) => {
      return JSON.stringify(arr) === itemString;
    });
    return contains;
  };

  // Generating the matrix and results list
  const matrix = generateMatrix();

  //  Create board
  const createBoard = () => {
    let count = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        const square = document.createElement("div");
        let randomColor = Math.floor(Math.random() * numberColors.length);
        square.setAttribute("id", `${count}`);
        square.setAttribute("draggable", true);
        square.setAttribute("class", "square");
        square.style.backgroundColor = numberColors[randomColor];
        square.textContent = matrix[i][j];
        grid.appendChild(square);
        squares.push(square);
        count += 1;
      }
    }
  };

  const createOperations = () => {
    for (let i = 0; i < operations.length; i++) {
      const operation = document.createElement("div");
      operation.setAttribute("id", `10${i}`);
      operation.setAttribute("class", "square");
      operation.setAttribute("draggable", true);
      operation.textContent = operations[i];
      operation.style.backgroundColor = "black";
      operationsContainer.appendChild(operation);
      operationsSquares.push(operation);
    }
  };

  createBoard();
  createOperations();

  // PLayer actions, drag and drop the numbers.

  let colorBeingDragged;
  let colorBeingReplaced;
  let numberBeingDragged;
  let numberBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    console.log(colorBeingDragged);
    numberBeingDragged = this.textContent;
    squareIdBeingDragged = parseInt(this.id);
  }
  function dragEnd() {
    console.log(numberBeingDragged);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor;
    numberBeingReplaced = this.textContent;
    squareIdBeingReplaced = parseInt(this.id);

    this.style.backgroundColor = colorBeingDragged;
    this.textContent = numberBeingDragged;

    let array;
    let index = squareIdBeingDragged;

    if (squareIdBeingDragged >= 100) {
      array = operationsSquares;
      index -= 100;
    } else {
      array = squares;
    }
    const currentSquare = array[index];
    currentSquare.style.backgroundColor = colorBeingReplaced;
    currentSquare.textContent = numberBeingReplaced;
  }

  function findSumPairs(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const num1 = arr[i];

      for (let j = i + 1; j < arr.length; j++) {
        const num2 = arr[j];
        const sum = num1 + num2;

        if (arr.includes(sum)) {
          result.push([num1, num2]);
        }
      }
    }

    return result;
  }

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  operationsSquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  operationsSquares.forEach((square) =>
    square.addEventListener("dragend", dragEnd)
  );
  operationsSquares.forEach((square) =>
    square.addEventListener("dragover", dragOver)
  );
  operationsSquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  operationsSquares.forEach((square) =>
    square.addEventListener("dragleave", dragLeave)
  );
  operationsSquares.forEach((square) =>
    square.addEventListener("drop", dragDrop)
  );
  // console.log(usedNumbers);

  const numSquares = squares.map((square) => parseInt(square.textContent));

  console.log(findSumPairs(numSquares));
});
