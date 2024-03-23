//If we were dealing with multiple images, we'd probably want to use Promises to wait for all of them to load before doing anything with them.

const player1 = new Fighter("P1", 100, "Jab", "Low Kick");
const player2 = new Fighter("P2", 100, "Jab", "Low Kick");
//size of img
const scale = 1.4;
//dimensions used for img and canvas
const width = 132;
const height = 132;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const cycleLoop = [0, 1, 0, 2];

//index for the animation loop array
let currentMoveIndex = 0;
let currentLoopIndex = 0;
var blocking = false;
let frameCount = 0;
let p1JabImg = new Image();
p1JabImg.src = "assets/P1Sprite/Attack_1.png";
p1JabImg.onload = function () {
  init();
};

//create a 2D canvas element 
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

//draws the 2D image onto canvas
function drawFrame(frameX, frameY, canvasX, canvasY) {
    context.drawImage(p1JabImg,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
}

// main function
function init() {
    drawFrame(cycleLoop[0], 0, 0, 0);

    p1KeyInput = window.addEventListener("keydown", function (event) {
        if (event.key === "a") {
            window.requestAnimationFrame(animateJab);
            p1UpdateMove("Jab");
        } else if (event.key === "s") {
          p1UpdateMove("Low Kick");
          console.log("s was pressed");
        } else if (event.key === " ") {
          // Perform player attack
        }
      });
      
      p2KeyInput = window.addEventListener("keydown", function (event) {
        if (event.key === "j") {
          console.log("j was pressed");
          p2UpdateMove("Jab");
        } else if (event.key === "k") {
          p2UpdateMove("Low Kick");
          console.log("j was pressed");
        } else if (event.key === " ") {
          // Perform player attack
        }
      });
}
//
function animateJab() {
    frameCount++;
    if (frameCount < 7) {
      window.requestAnimationFrame(animateJab);
      return;
    }
    frameCount = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= (cycleLoop.length)+1) {
    //currentLoopIndex = 0;    
   // context.clearRect(0, 0, canvas.width, canvas.height);
   return;
    }
    window.requestAnimationFrame(animateJab);
}


function p1UpdateMove(useMove) {
  switch (useMove) {
    case "Low Kick":
      player1.currentMove = "Low Kick";
      p1Attack();
      player1.currentMove = "";

      break;
    case "Jab":
      player1.currentMove = "Jab";
      p1Attack();
      player1.currentMove = "";

      break;
    default:
      //player1.currentMove = "";
      break;
  }
}
function p2UpdateMove(useMove) {
  switch (useMove) {
    case "Low Kick":
      player2.currentMove = "Low Kick";
      p2Attack();
      player2.currentMove = "";

      break;
    case "Jab":
      player2.currentMove = "Jab";
      p2Attack();
      player2.currentMove = "";

      break;
    default:
      //player1.currentMove = "";

      break;
  }
}
function p1Attack() {
  return new Promise((resolve, reject) => {
    while (blocking === false) {
      switch (player1.currentMove) {
        case "Jab":
          player2.hp -= 5;
          console.log("P2 -5 HP!");
          break;
        case "Low Kick":
          player2.hp -= 10;
          console.log("P2 -10 HP!");
          break;
        default:
          p1UpdateMove(keyInput);
          break;
      }
      break;
    }
    resolve();
  });
}
function p2Attack() {
  return new Promise((resolve, reject) => {
    while (blocking === false) {
      switch (player2.currentMove) {
        case "Jab":
          player1.hp -= 5;
          console.log("P1 -5 HP!");
          break;
        case "Low Kick":
          player1.hp -= 10;
          console.log("P1 -10 HP!");
          break;
        default:
          p1UpdateMove(keyInput);
          break;
      }
      break;
    }
    resolve();
  });
}
