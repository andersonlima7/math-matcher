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
  const musicButton = document.getElementById("musicButton");
  let muted = false;

  const handleMusicButtonClick = () => {
    muted = !muted;
    const musicButton = document.getElementById("musicButton");
    musicButton.className = "";
    if (muted)
      musicButton.setAttribute("class", "fa-solid fa-volume-xmark fa-2x");
    else musicButton.setAttribute("class", "fa-solid fa-volume-high fa-2x");
    backgroundSound.muted = muted;
  };

  backgroundSound.play();

  musicButton.addEventListener("click", handleMusicButtonClick);
});
