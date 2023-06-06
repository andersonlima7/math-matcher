"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  const width = 5;
  const squares = [];
  const numberColors = [
    "#dc143c",
    // "#F97B22",
    "#FFD700",
    "#7AA874",
    // "#E893CF",
    "#4682b4",
    // "#9376E0",
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

  createBoard();

  // PLayer actions, drag, drop and click on numbers.

  let colorBeingDragged;
  let colorBeingReplaced;
  let numberBeingDragged;
  let numberBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  const checkRowForFour = () => {
    for (let i = 0; i <= 21; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      const notValidRowFour = [
        2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 18, 19, 22, 23, 24,
      ];
      if (notValidRowFour.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        // score += 4;
        // scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
        return true;
      }
    }
    return false;
  };

  const checkColumnForFour = () => {
    for (let i = 0; i <= 9; i++) {
      const columnOfFour = [i, i + 5, i + 10, i + 15];
      const decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        // score += 4;
        // scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
        return true;
      }
    }
    return false;
  };

  const checkRowForThree = () => {
    for (let i = 0; i <= 22; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      const notValidRowThree = [3, 4, 8, 9, 13, 14, 18, 19, 23, 24];
      if (notValidRowThree.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        // score += 3;
        // scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
        return true;
      }
    }
    return false;
  };

  const checkColumnForThree = () => {
    for (let i = 0; i <= 14; i++) {
      const columnOfThree = [i, i + 5, i + 10];
      const decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        // score += 3;
        // scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundColor = "";
        });
        return true;
      }
    }
    return false;
  };

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    numberBeingDragged = this.textContent;
    squareIdBeingDragged = parseInt(this.id);
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor;
    numberBeingReplaced = this.textContent;
    squareIdBeingReplaced = parseInt(this.id);

    this.style.backgroundColor = colorBeingDragged;
    this.textContent = numberBeingDragged;

    const currentSquare = squares[squareIdBeingDragged];
    currentSquare.style.backgroundColor = colorBeingReplaced;
    currentSquare.textContent = numberBeingReplaced;
  }

  function dragEnd() {
    // Adjacent squares

    const validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    const isAColumnOfFour = checkColumnForFour();
    const isARowOfFour = checkRowForFour();
    const isAColumnOfThree = checkColumnForThree();
    const isARowOfThree = checkRowForThree();

    const validMove =
      validMoves.includes(squareIdBeingReplaced) &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
      squareIdBeingDragged = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
      squares[squareIdBeingReplaced].textContent = numberBeingReplaced;
      squares[squareIdBeingDragged].textContent = numberBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
      squares[squareIdBeingDragged].textContent = numberBeingDragged;
    }
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    squares[squareIdBeingDragged].style.backgroundColor = "";
  }

  let firstClick = true;
  let firstNumber = -1;
  let clickedColor = "";
  let firstSquareID;
  let secondNumber = -1;
  let secondSquareID;

  // Matches

  // Player can click on two adjacent squares to do the sum.
  function handleClick() {
    if (firstClick) {
      firstNumber = parseInt(this.textContent);
      firstSquareID = parseInt(this.id);
      firstClick = false;
      clickedColor = this.style.backgroundColor;
      console.log(firstNumber);
      return;
    } else {
      const currentSquareId = parseInt(this.id);
      const currentSquareColor = this.style.backgroundColor;

      const validMoves = [
        firstSquareID - 1,
        firstSquareID - width,
        firstSquareID + 1,
        firstSquareID + width,
      ];
      const validMove = validMoves.includes(currentSquareId);
      const validColor = currentSquareColor === clickedColor;

      if (validMove && validColor) {
        secondNumber = parseInt(this.textContent);
        secondSquareID = currentSquareId;
        console.log(secondNumber);
      }
    }

    if (firstNumber >= 0 && secondNumber >= 0) {
      // The result is a sum of the tow numbers
      const result = firstNumber + secondNumber;

      console.log(result);
      const firstNumberSquare = squares[firstSquareID];
      const secondNumberSquare = squares[secondSquareID];
      firstNumberSquare.style.backgroundColor = "";
      firstNumberSquare.style.color = "";
      firstNumberSquare.textContent = "";
      secondNumberSquare.style.backgroundColor = "";
      secondNumberSquare.style.color = "";
      secondNumberSquare.textContent = "";
    }
    firstClick = true;
    firstNumber = -1;
    firstSquareID = "";
    secondNumber = -1;
    secondSquareID = "";
  }

  // const checkRowForFive = () => {
  //   for (let i = 0; i < 21; i++) {
  //     const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
  //     const decidedColor = squares[i].style.backgroundColor;
  //     const isBlank = squares[i].style.backgroundColor === "";

  //     const notValidRowFive = [
  //       0, 1, 2, 3, 4, 5, 10, 11, 15, 20, 21, 22, 23, 24,
  //     ];
  //     if (notValidRowFive.includes(i)) continue;

  //     if (
  //       rowOfFive.every(
  //         (index) =>
  //           squares[index].style.backgroundColor === decidedColor && !isBlank
  //       )
  //     ) {
  //       // score += 5;
  //       // scoreDisplay.innerHTML = score;
  //       rowOfFive.forEach((index) => {
  //         squares[index].style.backgroundColor = "";
  //       });
  //     }
  //   }
  // };

  // const checkColumnForFive = () => {
  //   for (let i = 0; i < 5; i++) {
  //     const columnOfFive = [i, i + 5, i + 10, i + 15, i + 20];
  //     const decidedColor = squares[i].style.backgroundColor;
  //     const isBlank = squares[i].style.backgroundColor === "";

  //     const notValidColumnFive = [20, 21, 22, 23, 24];
  //     if (notValidColumnFive.includes(i)) continue;

  //     if (
  //       columnOfFive.every(
  //         (index) =>
  //           squares[index].style.backgroundColor === decidedColor && !isBlank
  //       )
  //     ) {
  //       // score += 5;
  //       // scoreDisplay.innerHTML = score;
  //       columnOfFive.forEach((index) => {
  //         squares[index].style.backgroundColor = "";
  //       });
  //     }
  //   }
  // };

  // drop new numbers once some have been cleared
  const dropNewNumbers = () => {
    for (let i = 0; i <= width * width - width - 1; i++) {
      const currentSquare = squares[i];
      const nextSquare = squares[i + width];
      if (nextSquare.style.backgroundColor === "" && !squareIdBeingDragged) {
        nextSquare.style.backgroundColor = currentSquare.style.backgroundColor;
        nextSquare.textContent = currentSquare.textContent;
        currentSquare.style.backgroundColor = "";
        currentSquare.textContent = "";
        const isFirstRow = i < width;
        if (isFirstRow && currentSquare.style.backgroundColor === "") {
          const randomColor = Math.floor(Math.random() * numberColors.length);
          const randomNumber = getRandomNumber(0, 30);
          currentSquare.style.backgroundColor = numberColors[randomColor];
          currentSquare.textContent = randomNumber;
        }
      } else if (
        currentSquare.style.backgroundColor === "" &&
        nextSquare.style.backgroundColor !== "" &&
        !squareIdBeingDragged
      ) {
        const randomColor = Math.floor(Math.random() * numberColors.length);
        const randomNumber = getRandomNumber(0, 30);
        currentSquare.style.backgroundColor = numberColors[randomColor];
        currentSquare.textContent = randomNumber;
      }
    }
  };

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));
  squares.forEach((square) => square.addEventListener("click", handleClick));

  window.setInterval(() => {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    dropNewNumbers();
    // checkHadMatch();
    // checkRowForFive();
    // checkColumnForFive();
  }, 100);
});
