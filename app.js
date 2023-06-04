"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 5;
  const squares = [];

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

  // Function to check if a number already exists in an array
  const numberExistsInArray = (number, array) => {
    return array.includes(number);
  };

  // Function to generate a 5x5 matrix with random numbers from 0 to 50
  const generateMatrix = () => {
    let matrix = [];

    for (let i = 0; i < 5; i++) {
      let row = [];

      for (let j = 0; j < 5; j++) {
        let randomNumber = getRandomNumber(0, 50);
        row.push(randomNumber);
      }

      matrix.push(row);
    }

    return matrix;
  };

  // Function to generate the list of expected results with the used numbers
  const generateResultsList = (matrix) => {
    const expectedResults = [];
    const usedPositions = [];
    const usedNumbers = [];

    for (let i = 0; i < 5; i++) {
      let result;
      let row1;
      let row2;
      let column1;
      let column2;

      do {
        row1 = getRandomNumber(0, 4);
        column1 = getRandomNumber(0, 4);
        let position2;
        const position1 = [row1, column1];
        do {
          row2 = getRandomNumber(0, 4);
          column2 = getRandomNumber(0, 4);
          position2 = [row2, column2];
        } while (
          [row1, column1].toString() === [row2, column2].toString() &&
          usedPositions.includes(position1) &&
          usedPositions.includes(position2)
        );

        const number1 = matrix[row1][column1];
        const number2 = matrix[row2][column2];
        result = number1 + number2;
      } while (expectedResults.includes(result));
      expectedResults.push(result);
      usedPositions.push([row1, column1], [row2, column2]);
      usedNumbers.push(
        `(${matrix[row1][column1]}), (${matrix[row2][column2]})`
      );
    }

    return { expectedResults, usedNumbers, usedPositions };
  };

  // Generating the matrix and results list
  const matrix = generateMatrix();
  const { expectedResults, usedNumbers, usedPositions } =
    generateResultsList(matrix);

  //  Create board
  const createBoard = () => {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        const square = document.createElement("div");
        let randomColor = Math.floor(Math.random() * numberColors.length);
        square.setAttribute("id", i);
        square.setAttribute("class", "square");
        square.style.backgroundColor = numberColors[randomColor];
        square.textContent = matrix[i][j];
        grid.appendChild(square);
        squares.push(square);
      }
    }
  };

  createBoard();
  console.log(expectedResults);
  console.log(usedNumbers);
  console.log(usedPositions);
});
