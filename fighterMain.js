//If we were dealing with multiple images, we'd probably want to use Promises to wait for all of them to load before doing anything with them.

 const imgObject = {imgArray: [
    { name: "imgP1Jab", src: "assets/P1Sprite/Attack_1.png" },
    { name: "imgP1Kick", src: "assets/P1Sprite/Attack_3.png" },
    { name: "imgP1Idle", src: "assets/P1Sprite/Idle.png" },
    { name: "Imgp1Hurt", src: "assets/P1Sprite/Hurt.png" },
    { name: "ImgP1Dead", src: "assets/P1Sprite/Dead.png" }
]};

function preloadImages(images, callback) {
    let loadedImages = 0;
    const numImages = images.length;

    images.forEach(image => {
        const img = new Image();
        img.onload = function() {
            loadedImages++;
            if (loadedImages === numImages) {
                callback();
            }
        };
        img.src = image.src;
    });
}
preloadImages(imgObject.imgArray, function() {
    init();
    defaultState();
});
  

const player1 = new Fighter("P1", 100, "", "", "Jab", "Low Kick");
const player2 = new Fighter("P2", 100, "", "", "Jab" , "Low Kick");
//size of img
const scale = 1.2;
//dimensions used for img and canvas
const width = 132;
const height = 132;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
cycleLoop= [0, 1, 0, 2];
//object containing move frame data within arrays 
//currentAnimState = ["Idle", "Jabbing", "Kicking", "Hurt", "Dead"];
const animLoops= {
  alP1Idle: [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6],  
  alP1Jab: [0, 1, 0, 2],
  alP1Kick: [0, 1, 0, 2, 0, 3, 0, 4],
  alP1Hurt: [],
  alP1Dead: [],
};

//index for the animation loop array
let currentImg = "";
let currentLoopIndex = 0;
nextMoveRdy = true;
var blocking = false;
let frameCount = 0;
// let p1JabImg = new Image();
// p1JabImg.src = "assets/P1Sprite/Attack_1.png";



//create a 2D canvas element 
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

//draws the 2D image onto canvas
function drawFrame(frameX, frameY, canvasX, canvasY) {
    context.drawImage(imgObject.imgArray.src,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
}
function defaultState(){
    currentLoopIndex=0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[1], 0, 0, 0);
    }
// main function
function init() {

    p1KeyInput = window.addEventListener("keydown", function (event) {
        if (event.key === "a") {
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
    while (nextMoveRdy){    
        frameCount++;
        if (frameCount < 7) {
        window.requestAnimationFrame(animateJab);
        return;
        }
        frameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        switch (player1.currentAnimState) {
            case "Standing":       
              break;
            case "Jabbing":
            drawFrame(animLoops.alP1Jab[currentLoopIndex], 0, 0, 0);  
              break;
          }
        //drawFrame(animLoops.alP1Jab[currentLoopIndex], 0, 0, 0);
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length+1) {
            nextMoveRdy=false;
            defaultState();
        }
        window.requestAnimationFrame(animateJab);
        break;
    }
}


function p1UpdateMove(useMove) {
  switch (useMove) {
    case "Low Kick":
      player1.currentMove = "Low Kick";
      p1Attack();
      player1.currentMove = "";

      break;
    case "Jab":
      nextMoveRdy=true;
      player1.currentMove = "Jab";
      p1Attack();
      window.requestAnimationFrame(animateJab);
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
          currentImg = imgObject.imgArray.src= "assets/P1Sprite/Attack_1.png"
          player1.currentAnimState="Jabbing";
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
