// Create sound effect
const createSound = (src) => {
  const sound = document.createElement("audio");
  sound.src = src;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);

  return sound;
};

// Background sound
export const backgroundTheme = createSound("./assets/sounds/background.mp3");

// Negative switch
export const negativeSwitch = createSound(
  "./assets/sounds/negative-switch.mp3"
);

// Match sounds
export const matchForTwo = createSound("./assets/sounds/match-2.mp3");
export const matchForThree = createSound("./assets/sounds/match-3.mp3");
export const matchForFour = createSound("./assets/sounds/match-4.mp3");
export const matchLine = createSound("./assets/sounds/match-line.mp3");
