"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const solutions = document.querySelector(".solutions");
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

  // Function to generate a 5x5 matrix with random numbers from 0 to 50
  const generateMatrix = () => {
    let matrix = [];

    for (let i = 0; i < 5; i++) {
      let row = [];

      for (let j = 0; j < 5; j++) {
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
        let position1;
        let position2;
        do {
          row1 = getRandomNumber(0, 4);
          column1 = getRandomNumber(0, 4);
          position1 = [row1, column1];
          row2 = getRandomNumber(0, 4);
          column2 = getRandomNumber(0, 4);
          position2 = [row2, column2];
        } while (
          [row1, column1].toString() === [row2, column2].toString() ||
          isArrayInArray(usedPositions, position1) ||
          isArrayInArray(usedPositions, position2)
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
        square.setAttribute("id", `s-${i}${j}`);
        square.setAttribute("class", "square");
        square.style.backgroundColor = numberColors[randomColor];
        square.textContent = matrix[i][j];
        grid.appendChild(square);
        squares.push(square);
      }
    }
  };

  // Phase solutions
  const createSolutions = () => {
    for (let i = 0; i < expectedResults.length; i++) {
      const result = document.createElement("span");
      result.setAttribute("id", `r-${expectedResults[i]}`);
      result.textContent = expectedResults[i];
      solutions.appendChild(result);
    }
  };

  createBoard();
  createSolutions();

  // PLayer actions

  let firstClick = true;
  let firstNumber = -1;
  let firstSquareID;
  let secondNumber = -1;
  let secondSquareID;

  function handleClick() {
    if (firstClick) {
      firstNumber = parseInt(this.textContent);
      firstSquareID = this.id;
      firstClick = false;
    } else {
      secondNumber = parseInt(this.textContent);
      secondSquareID = this.id;
    }

    console.log(firstNumber);
    console.log(secondNumber);
    console.log(firstSquareID);
    console.log(secondSquareID);

    if (firstNumber >= 0 && secondNumber >= 0) {
      // The result is a sum of the tow numbers
      const result = firstNumber + secondNumber;

      console.log(result);

      if (expectedResults.includes(result)) {
        const resultNumber = solutions.querySelector(`#r-${result}`);
        resultNumber.style.color = "red";

        console.log("acertou");

        const currentNumber1 = document.querySelector(`#${firstSquareID}`);
        const currentNumber2 = document.querySelector(`#${secondSquareID}`);

        currentNumber1.style.backgroundColor = "";
        currentNumber1.style.color = "";
        currentNumber1.textContent = "";
        currentNumber2.style.backgroundColor = "";
        currentNumber2.style.color = "";
        currentNumber2.textContent = "";
      } else {
        console.log("errou");
      }

      firstClick = true;
      firstNumber = -1;
      firstSquareID = "";
      secondNumber = -1;
      secondSquareID = "";
    }
  }

  /**
   * Find the combinations of the target thar are present in the list
   */
  const findCombinations = (list, target) => {
    const combinations = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i; j < list.length; j++) {
        if (list[i] + list[j] === target && i !== j) {
          combinations.push([list[i], list[j]]);
        }
      }
    }
    return combinations;
  };

  // Drop new numbers when some are cleared
  const dropNewNumbers = () => {
    for (let i = 0; i < width * width - width - 1; i++) {
      const nextSquare = squares[i + width];
      const currentSquare = squares[i];

      const getNewNumbers = () => {
        let randomColor = Math.floor(Math.random() * numberColors.length);
        currentSquare.style.backgroundColor = numberColors[randomColor];

        const numbersOnBoard = squares.map((square) =>
          parseInt(square.textContent)
        );

        for (let j = 0; j < expectedResults.length; j++) {
          const currentNumber = expectedResults[j];
          const combinations = findCombinations(numbersOnBoard, currentNumber);
          if (combinations.length > 0) {
            currentSquare.textContent = getRandomNumber(0, 30);
            console.log("aleatorio");
          } else {
            // assure that the expected results are possible to be found.

            console.log("calculando novos numeros");
            const randomNumber =
              numbersOnBoard[getRandomNumber(0, numbersOnBoard.length - 1)];

            console.log(currentNumber);
            console.log(randomNumber);
            currentSquare.textContent =
              randomNumber > currentNumber
                ? randomNumber - currentNumber
                : currentNumber - randomNumber;
          }
        }
      };

      if (
        nextSquare.style.backgroundColor === "" &&
        currentSquare.style.backgroundColor !== ""
      ) {
        nextSquare.style.backgroundColor = currentSquare.style.backgroundColor;
        nextSquare.textContent = currentSquare.textContent;
        currentSquare.style.backgroundColor = "";
        currentSquare.textContent = "";

        if (i < width && currentSquare.style.backgroundColor === "")
          getNewNumbers();
      } else if (
        currentSquare.style.backgroundColor === "" &&
        nextSquare.style.backgroundColor !== ""
      ) {
        getNewNumbers();
      }
    }
  };

  squares.forEach((square) => square.addEventListener("click", handleClick));
  console.log(usedNumbers);

  console.log(squares.map((square) => square.textContent));

  // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
  window.setInterval(function () {
    dropNewNumbers();
  }, 100);
});
