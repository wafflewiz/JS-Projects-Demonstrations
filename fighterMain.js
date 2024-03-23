//If we were dealing with multiple images, we'd probably want to use Promises to wait for all of them to load before doing anything with them.

const player1 = new Fighter("P1", 100, "Jab", "Low Kick");
const player2 = new Fighter("P2", 100, "Jab", "Low Kick");
let p1JabImg = new Image();
p1JabImg.src = "assets/P1Sprite/Attack_1.png";
console.log(p1JabImg);
var blocking = false;
p1JabImg.onload = function () {
  init();
};

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

function init() {
  context.drawImage(p1JabImg, 0, 0, 32, 58, 0, 0, 32, 58);
}
p1KeyInput = window.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    console.log("a was pressed");
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
