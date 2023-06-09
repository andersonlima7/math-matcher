"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const accounts = document.querySelector(".accounts");
  const header = document.querySelector(".header");

  const width = 5;
  const goal = 200; // The minimum number of points to win the game.
  let rounds = 5; // The maximum number of rounds move the numbers.
  let score = 0;
  let maxScorePossible = 0;
  let moved = false;
  const roundsElement = document.createElement("span");
  roundsElement.setAttribute("class", "rounds");

  const scoreElement = document.createElement("span");
  scoreElement.setAttribute("class", "score");

  const squares = [];
  const numberColors = [
    "linear-gradient(90deg, rgba(188,124,255,1) 23%, rgba(135,32,241,1) 83%)",
    "linear-gradient(90deg, rgba(255,145,77,1) 23%, rgba(255,49,49,1) 83%)",
    "linear-gradient(90deg, rgba(122,221,144,1) 23%, rgba(18,121,9,1) 83%)",
    "linear-gradient(90deg, rgba(124,174,241,1) 23%, rgba(0,74,173,1) 83%)",
  ];

  const updateRounds = () => {
    rounds -= 1;
    roundsElement.textContent = rounds;
    console.log(rounds, "rounds");
    if (rounds === 0) {
      grid.classList.add("hidden");
      accounts.classList.remove("hidden");
    }
  };
  const updateScore = (value) => {
    if (moved) {
      score += value;
      scoreElement.textContent = score;
      console.log(score, "score");
    }
  };

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

  // Generating the matrix
  const matrix = generateMatrix();

  //  Create board
  const createHeader = () => {
    const goalElement = document.createElement("span");
    goalElement.setAttribute("class", "goal");

    goalElement.textContent = goal;
    roundsElement.textContent = rounds;
    scoreElement.textContent = score;

    header.appendChild(scoreElement);
    header.appendChild(goalElement);
    header.appendChild(roundsElement);
  };

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
        square.style.backgroundImage = numberColors[randomColor];
        square.textContent = matrix[i][j];
        grid.appendChild(square);
        squares.push(square);
        count += 1;
      }
    }
  };

  createHeader();
  createBoard();

  // PLayer actions, drag, drop and click on numbers.

  let colorBeingDragged;
  let colorBeingReplaced;
  let numberBeingDragged;
  let numberBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;
  let isMoving = false;

  const checkRowForFour = () => {
    const numbers = [];
    for (let i = 0; i <= 21; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValidRowFour = [
        2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 18, 19, 22, 23, 24,
      ];
      if (notValidRowFour.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        updateScore(4);
        rowOfFour.forEach((index) => {
          const currentSquare = squares[index];
          numbers.push(parseInt(currentSquare.textContent));
          currentSquare.style.backgroundImage = "";
          currentSquare.textContent = "";
        });
        return numbers;
      }
    }
    return numbers;
  };

  const checkColumnForFour = () => {
    const numbers = [];
    for (let i = 0; i <= 9; i++) {
      const columnOfFour = [i, i + 5, i + 10, i + 15];
      const decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        updateScore(4);
        columnOfFour.forEach((index) => {
          const currentSquare = squares[index];
          numbers.push(parseInt(currentSquare.textContent));
          currentSquare.style.backgroundImage = "";
          currentSquare.textContent = "";
        });
        return numbers;
      }
    }
    return numbers;
  };

  const checkRowForThree = () => {
    const numbers = [];
    for (let i = 0; i <= 22; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValidRowThree = [3, 4, 8, 9, 13, 14, 18, 19, 23, 24];
      if (notValidRowThree.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        updateScore(3);
        rowOfThree.forEach((index) => {
          const currentSquare = squares[index];
          numbers.push(parseInt(currentSquare.textContent));
          currentSquare.style.backgroundImage = "";
          currentSquare.textContent = "";
        });
        return numbers;
      }
    }
    return numbers;
  };

  const checkColumnForThree = () => {
    const numbers = [];
    for (let i = 0; i <= 14; i++) {
      const columnOfThree = [i, i + 5, i + 10];
      const decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        updateScore(3);
        columnOfThree.forEach((index) => {
          const currentSquare = squares[index];
          numbers.push(parseInt(currentSquare.textContent));
          currentSquare.style.backgroundImage = "";
          currentSquare.textContent = "";
        });
        return numbers;
      }
    }
    return numbers;
  };

  function waitForAnimationEnd(element) {
    console.log(element.classList.length);
    if (element.classList.length < 2) return;
    return new Promise((resolve) => {
      element.addEventListener("animationend", () => {
        resolve();
      });
    });
  }

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    numberBeingDragged = this.textContent;
    squareIdBeingDragged = parseInt(this.id);

    // const canvas = document.createElement("canvas");
    // e.dataTransfer.setDragImage(canvas, 0, 0);
    // canvas.remove();
  }

  async function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    numberBeingReplaced = this.textContent;
    squareIdBeingReplaced = parseInt(this.id);
    console.log(squareIdBeingReplaced);
    console.log(squareIdBeingDragged);

    const draggedSquare = squares[squareIdBeingDragged];
    const replacedSquare = squares[squareIdBeingReplaced];

    const validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    if (validMoves.includes(squareIdBeingReplaced)) {
      isMoving = true;
      if (squareIdBeingReplaced === squareIdBeingDragged + 1) {
        draggedSquare.classList.add("dragging-right");
        replacedSquare.classList.add("dragging-left");
      } else if (squareIdBeingReplaced === squareIdBeingDragged - 1) {
        draggedSquare.classList.add("dragging-left");
        replacedSquare.classList.add("dragging-right");
      } else if (squareIdBeingReplaced === squareIdBeingDragged + width) {
        draggedSquare.classList.add("dragging-down");
        replacedSquare.classList.add("dragging-up");
      } else {
        draggedSquare.classList.add("dragging-up");
        replacedSquare.classList.add("dragging-down");
      }
      await waitForAnimationEnd(draggedSquare);
    } else return;

    this.style.backgroundImage = colorBeingDragged;
    this.textContent = numberBeingDragged;

    draggedSquare.style.backgroundImage = colorBeingReplaced;
    draggedSquare.textContent = numberBeingReplaced;
  }

  function removeLastClass(element) {
    if (!element) return;
    const classList = element.classList;

    if (classList.length > 0 && classList.length >= 2) {
      const lastClass = classList[classList.length - 1];
      element.classList.remove(lastClass);
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function createAccountElement(matchNumbers) {
    const account = document.createElement("div");
    account.setAttribute("class", "account");

    for (let i = 0; i < matchNumbers.length; i++) {
      const number = matchNumbers[i];
      const operand = document.createElement("span");
      operand.textContent = number;
      operand.setAttribute("class", "account-operand");
      account.appendChild(operand);

      const operator = document.createElement("span");
      if (i !== matchNumbers.length - 1) {
        operator.textContent = "+";
      } else operator.textContent = "=";
      account.appendChild(operator);
    }

    const result = document.createElement("input");
    result.setAttribute("class", "account-result");
    result.setAttribute("type", "number");
    result.setAttribute("placeholder", "___");
    account.appendChild(result);

    return account;
  }

  async function dragEnd() {
    // Adjacent squares
    moved = true;
    await waitForAnimationEnd(squares[squareIdBeingDragged]);

    const validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    const fourColumnMatch = checkColumnForFour();
    const fourRowMatch = checkRowForFour();
    const treeColumnMatch = checkColumnForThree();
    const treeRowMatch = checkRowForThree();

    const isAColumnOfFour = fourColumnMatch.length > 0;
    const isARowOfFour = fourRowMatch.length > 0;
    const isAColumnOfThree = treeColumnMatch.length > 0;
    const isARowOfThree = treeRowMatch.length > 0;

    console.log(fourColumnMatch, fourRowMatch, treeColumnMatch, treeRowMatch);

    const validMove =
      validMoves.includes(squareIdBeingReplaced) &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree);

    const isSquareIdBeingReplaced =
      squareIdBeingReplaced >= 0 && squareIdBeingReplaced !== null;

    const draggedSquare = squares[squareIdBeingDragged];
    const replacedSquare = squares[squareIdBeingReplaced];
    // Valid move
    if (isSquareIdBeingReplaced && validMove) {
      // Create account
      const matchTypes = [
        { isMatch: isAColumnOfFour, matchNumbers: fourColumnMatch },
        { isMatch: isARowOfFour, matchNumbers: fourRowMatch },
        { isMatch: isAColumnOfThree, matchNumbers: treeColumnMatch },
        { isMatch: isARowOfThree, matchNumbers: treeRowMatch },
      ];

      for (let matchType of matchTypes) {
        if (matchType.isMatch) {
          const account = createAccountElement(matchType.matchNumbers);
          accounts.appendChild(account);
        }
      }
      removeLastClass(draggedSquare);
      removeLastClass(replacedSquare);

      updateRounds();
    } else if (isSquareIdBeingReplaced && !validMove) {
      // Trying move square to a position that is not allowed.
      removeLastClass(draggedSquare);
      removeLastClass(replacedSquare);

      await sleep(0);
      if (squareIdBeingReplaced === squareIdBeingDragged + 1) {
        draggedSquare.classList.add("dragging-right");
        replacedSquare.classList.add("dragging-left");
      } else if (squareIdBeingReplaced === squareIdBeingDragged - 1) {
        draggedSquare.classList.add("dragging-left");
        replacedSquare.classList.add("dragging-right");
      } else if (squareIdBeingReplaced === squareIdBeingDragged + width) {
        draggedSquare.classList.add("dragging-down");
        replacedSquare.classList.add("dragging-up");
      } else if (squareIdBeingReplaced === squareIdBeingDragged - width) {
        draggedSquare.classList.add("dragging-up");
        replacedSquare.classList.add("dragging-down");
      }

      await waitForAnimationEnd(draggedSquare);

      replacedSquare.style.backgroundImage = colorBeingReplaced;
      draggedSquare.style.backgroundImage = colorBeingDragged;
      replacedSquare.textContent = numberBeingReplaced;
      draggedSquare.textContent = numberBeingDragged;
      removeLastClass(draggedSquare);
      removeLastClass(replacedSquare);
    } else {
      // Moving square outside board
      draggedSquare.style.backgroundImage = colorBeingDragged;
      draggedSquare.textContent = numberBeingDragged;
    }

    squareIdBeingReplaced = null;
    squareIdBeingDragged = null;
    isMoving = false;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave(e) {
    // const square = squares[squareIdBeingDragged];
    // square.style.backgroundImage = "none";
    // square.textContent = "";
    e.preventDefault();
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
      clickedColor = this.style.backgroundImage;
      console.log(firstNumber);
      return;
    } else {
      const currentSquareId = parseInt(this.id);
      const currentSquareColor = this.style.backgroundImage;

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
      // The result is a sum of the two numbers
      const firstNumberSquare = squares[firstSquareID];
      const secondNumberSquare = squares[secondSquareID];

      // Clear the first number square
      firstNumberSquare.style.backgroundImage = "";
      firstNumberSquare.style.color = "";
      firstNumberSquare.textContent = "";

      // Clear the second number square
      secondNumberSquare.style.backgroundImage = "";
      secondNumberSquare.style.color = "";
      secondNumberSquare.textContent = "";

      // Create account
      const account = document.createElement("div");
      account.setAttribute("class", "account");

      // Create operand 1
      const operand1 = document.createElement("span");
      operand1.textContent = firstNumber;
      operand1.setAttribute("class", "account-operand");
      account.appendChild(operand1);

      // Create sum operator
      const sumOperator = document.createElement("span");
      sumOperator.textContent = "+";
      account.appendChild(sumOperator);

      // Create operand 2
      const operand2 = document.createElement("span");
      operand2.textContent = secondNumber;
      operand2.setAttribute("class", "account-operand");
      account.appendChild(operand2);

      // Create equal operator
      const equalOperator = document.createElement("span");
      equalOperator.textContent = "=";
      account.appendChild(equalOperator);

      // Create result input
      const result = document.createElement("input");
      result.setAttribute("class", "account-result");
      result.setAttribute("type", "number");
      result.setAttribute("placeholder", "___");
      account.appendChild(result);

      // Append account to accounts container
      accounts.appendChild(account);
      updateRounds();
      updateScore(2);
    }
    firstClick = true;
    firstNumber = -1;
    firstSquareID = "";
    secondNumber = -1;
    secondSquareID = "";
  }

  // Check if the account is correct.
  const verifyResult = (accountElement) => {
    const operandElements =
      accountElement.getElementsByClassName("account-operand");
    const resultElement =
      accountElement.getElementsByClassName("account-result")[0];

    let sum = 0;
    for (let i = 0; i < operandElements.length; i++) {
      const operandValue = parseInt(operandElements[i].textContent);
      if (isNaN(operandValue)) {
        return false; // Se algum operando não for um número válido, retorna falso
      }
      sum += operandValue;
    }

    const expectedResult = parseInt(resultElement.value);
    if (isNaN(expectedResult)) {
      return false; // Se o resultado esperado não for um número válido, retorna falso
    }

    return sum === expectedResult;
  };

  const blockGrid = () => {
    // Check if a moving is happening and block the grid accordingly.
    if (isMoving) grid.classList.add("blocked");
    else grid.classList.remove("blocked");
  };

  // Drop new numbers once some have been cleared
  const dropNewNumbers = () => {
    for (let i = 0; i <= width * width - width - 1; i++) {
      const currentSquare = squares[i];
      const nextSquare = squares[i + width];
      if (nextSquare.style.backgroundImage === "" && !squareIdBeingDragged) {
        nextSquare.style.backgroundImage = currentSquare.style.backgroundImage;
        nextSquare.textContent = currentSquare.textContent;
        currentSquare.style.backgroundImage = "";
        currentSquare.textContent = "";
        const isFirstRow = i < width;
        if (isFirstRow && currentSquare.style.backgroundImage === "") {
          const randomColor = Math.floor(Math.random() * numberColors.length);
          const randomNumber = getRandomNumber(0, 30);
          currentSquare.style.backgroundImage = numberColors[randomColor];
          currentSquare.textContent = randomNumber;
        }
      } else if (
        currentSquare.style.backgroundImage === "" &&
        nextSquare.style.backgroundImage !== "" &&
        !squareIdBeingDragged
      ) {
        const randomColor = Math.floor(Math.random() * numberColors.length);
        const randomNumber = getRandomNumber(0, 30);
        currentSquare.style.backgroundImage = numberColors[randomColor];
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
    if (rounds > 0) {
      checkRowForFour();
      checkColumnForFour();
      checkRowForThree();
      checkColumnForThree();
      dropNewNumbers();
      blockGrid();
    }
  }, 100);
});
