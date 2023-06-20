"use strict";
// Sound effects

import {
  backgroundSound,
  timerSound,
  levelCompleted,
  levelFailed,
  negativeSwitch,
  matchForFour,
  matchForThree,
  matchForTwo,
} from "./sounds.js";

document.addEventListener("DOMContentLoaded", () => {
  // Obtenha os elementos HTML relevantes
  const musicButton = document.getElementById("musicButton");
  const helpButton = document.getElementById("helpButton");
  const helpModal = document.getElementById("helpModal");
  const closeButton = document.getElementsByClassName("close")[0];
  let muted = true;

  // Action on click music button, toggle the muted state.
  const handleMusicButtonClick = () => {
    backgroundSound.play();
    muted = !muted;
    const musicButton = document.getElementById("musicButton");
    musicButton.className = "";
    if (muted)
      musicButton.setAttribute("class", "fa-solid fa-volume-xmark fa-2x");
    else musicButton.setAttribute("class", "fa-solid fa-volume-high fa-2x");
    backgroundSound.muted = muted;
  };

  // Action on click help button.
  helpButton.onclick = function () {
    helpModal.style.display = "block"; // Exibir o modal
  };

  // Action on click close modal
  closeButton.onclick = function () {
    helpModal.style.display = "none"; // Ocultar o modal
  };

  // Close the modal when clicks outside it
  window.onclick = function (event) {
    if (event.target == helpModal) {
      helpModal.style.display = "none"; // Ocultar o modal
    }
  };

  musicButton.addEventListener("click", handleMusicButtonClick);
});
