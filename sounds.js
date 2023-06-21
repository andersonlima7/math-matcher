// Create sound effect
const createSound = (src, loop = false) => {
  const sound = document.createElement("audio");
  sound.src = src;
  if (loop) sound.setAttribute("loop", "true");
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);

  return sound;
};

// Background sound
export const backgroundSound = createSound(
  "./assets/sounds/background.mp3",
  true
);

// Level win and lose sounds
export const levelCompleted = createSound(
  "./assets/sounds/level-completed.wav"
);
export const levelFailed = createSound("./assets/sounds/level-failed.mp3");

// Timer tick tack
export const timerSound = createSound("./assets/sounds/timer.mp3");

// Negative switch
export const negativeSwitch = createSound(
  "./assets/sounds/negative-switch.mp3"
);

// Match sounds
export const matchForTwo = createSound("./assets/sounds/match-2.mp3");
export const matchForThree = createSound("./assets/sounds/match-3.mp3");
export const matchForFour = createSound("./assets/sounds/match-4.mp3");
export const matchLine = createSound("./assets/sounds/match-line.mp3");
