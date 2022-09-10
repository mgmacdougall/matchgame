// Find items on page to deal with
const imageOne = document.getElementById("img1");
const imageTwo = document.getElementById("img2");
const imageThree = document.getElementById("img3");
const imageContainer = document.getElementById("game-container");
const imageContainers = document.getElementsByClassName("img-container");

const images = ["img-1", "img-2", "img-3"];

// for holding the images selected
let imageState = [];
let clickCount = 0;

/** Get a random image */
const getRandomImage = () => {
  let randomImage = images[Math.floor(Math.random() * 3)];
  return `${randomImage}.png`;
};

/**
 * Create the image container with class and add as child of img-container
 */
const createImage = (source, container) => {
  const imageItem = document.createElement("img");
  imageItem.src = source;
  return container.appendChild(imageItem);
};

// not working atm
const checkWinner = () => {
  let matched = imageState.every(elm => elm === imageState[0]);
  return matched;
};

const updateScore = points => {
  let score = document.getElementById("current-score");
  return (score.innerText = points);
};

const deleteGameMessage = () => {
  let span = document.getElementById("game-message");
  if (span) {
    let childMessage = document.querySelector("#game-message>span");
    span.removeChild(childMessage);
  }
};

const newGameBtn = () => {
  let gameMessage = document.getElementById("restart-game");
  const restartBtn = document.createElement("button");
  restartBtn.id = "new-game";
  restartBtn.innerText = "New Game?";
  return gameMessage.append(restartBtn);
};

const playerMessage = message => {
  let gameMessage = document.getElementById("game-message");
  const _message = document.createElement("span");
  _message.innerText = message;
  return gameMessage.append(_message);
};

const endGame = () => {
  if (checkWinner()) {
    playerMessage("You win 100");
    return updateScore(100);
  } else {
    return playerMessage("You lose");
  }
};

const newTurn = () => {
  document.getElementById("new-game").addEventListener("click", e => {
    resetGameState();
    resetBoard();
    deleteGameMessage();
  });
};

const resetGameState = () => {
  clickCount = 0;
  imageState = [];
};

const resetBoard = () => {
  //  Deletes children
  for (let img of imageContainers) {
    img.firstChild.remove();
  }

  // Deletes the new Game button
  document.getElementById("new-game").remove();

  // Recreates
  for (let img of imageContainers) {
    console.log("recreating");
    let randomImage = getRandomImage();
    console.log(img, randomImage);
    createImage(randomImage, img);
    img.style.backgroundColor = "black";
    imageState.push(randomImage);
  }
};

/** Gets the main container for the amge - user this to get the item clicked. */
imageContainer.addEventListener("click", event => {
  console.log(event.target)
  
  // let t = event.target.firstChild.style.visibility;
  console.log(event.target.tagName==="IMG");
  if (event.target.tagName === "IMG") {
    return;
  }else{
    event.target.style.backgroundColor = "white";
    event.target.firstChild.style.visibility = "visible";
    event.target.firstChild.setAttribute("img", "visible");
    clickCount++;
    if (clickCount === 3) {
      endGame();
      newGameBtn();
      newTurn();
    }
    
  }
  // if (event.target.id !== "game-container") {
  // }
});

document.addEventListener("DOMContentLoaded", e => {
  for (let img of imageContainers) {
    let randomImage = getRandomImage();
    createImage(randomImage, img);
    img.style.backgroundColor = "black";
    imageState.push(randomImage);
  }
});
