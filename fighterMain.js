//If we were dealing with multiple images, we'd probably want to use Promises to wait for all of them to load before doing anything with them.

const imgArray = [
    imgP1Jab = ["assets/P1Sprite/Attack_1.png"],
    imgP1Kick = ["assets/P1Sprite/Attack_3.png"],
    imgP1Idle = ["assets/P1Sprite/Idle.png"],
    imgP1Hurt = ["assets/P1Sprite/Hurt.png"],
    imgP1Dead = ["assets/P1Sprite/Dead.png"],

    imgP2Jab = ["assets/P2Sprite/Attack_1.png"],
    imgP2Kick = ["assets/P2Sprite/Attack_2.png"],
    imgP2Idle = ["assets/P2Sprite/Idle.png"],
    imgP2Hurt=["assets/P2Sprite/Hurt.png"],
    imgP2Dead=["assets/P2Sprite/Dead.png"],

];
const images = [];
imgArray.forEach(src => {
    const img = new Image();
    img.src = src;
    images.push(img);
});
function preloadImages(){

}
  

const player1 = new Fighter("P1", 100, "", "", "Jab", "Kick");
const player2 = new Fighter("P2", 100, "", "", "Jab" , "Kick");
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

  alP2Idle: [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6],  
  alP2Jab: [0, 1, 0, 2],
  alP2Kick: [0, 1, 0, 2, 0, 3, 0, 4],
  alP2Hurt: [],
  alP2Dead: [],
};

//index for the animation loop array
let p1CurrentImg;
let p2CurrentImg;
let p1CurrentLoopIndex = 0;
let p2CurrentLoopIndex = 0;
p1NextMoveRdy = true;
p2NextMoveRdy = true;

var blocking = false;
let p1FrameCount = 0;
let p2FrameCount = 0;

// let p1JabImg = new Image();
// p1JabImg.src = "assets/P1Sprite/Attack_1.png";



//create a 2D canvas element 
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
//defaultState();
init();

//draws the 2D image onto canvas
function drawFrame(frameX, frameY, canvasX, canvasY) {
    context.drawImage(p1CurrentImg,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
}
function defaultState(){
    p1CurrentLoopIndex=0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
    drawFrame(animLoops.alP2Jab[p2CurrentLoopIndex], 0, 10, 10);

    }
// main function
function init() {

    p1KeyInput = window.addEventListener("keydown", function (event) {
        if (event.key === "a") {
            p1UpdateMove("Jab");
        } else if (event.key === "s") {
          p1UpdateMove("Kick");
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
          p2UpdateMove("Kick");
          console.log("j was pressed");
        } else if (event.key === " ") {
          // Perform player attack
        }
      });
}
//
function animateP1() {
    while (p1NextMoveRdy){    
        p1FrameCount++;
        if (p1FrameCount < 3) {
        window.requestAnimationFrame(animateP1);
        return;
        }
        p1FrameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        switch (player1.currentAnimState) {
            case "Standing":       
              break;
            case "Jabbing":
            drawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);  
              break;
            case "Kicking":
            drawFrame(animLoops.alP1Kick[p1CurrentLoopIndex], 0, 0, 0);  
              break;
          }
        //drawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
        p1CurrentLoopIndex++;
        if (p1CurrentLoopIndex >= cycleLoop.length+1) {
            p1NextMoveRdy=false;
            defaultState();
        }
        window.requestAnimationFrame(animateP1);
        break;
    }
}
function animateP2() {
    while (p2NextMoveRdy){    
        p2FrameCount++;
        if (p2FrameCount < 3) {
        window.requestAnimationFrame(animateP2);
        return;
        }
        p2FrameCount = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        switch (player2.currentAnimState) {
            case "Standing":       
              break;
            case "Jabbing":
            drawFrame(animLoops.alP2Jab[p2CurrentLoopIndex], 0, 0, 0);
            p2CurrentLoopIndex++;
            if (p2CurrentLoopIndex >= animLoops.alP2Jab.length+1) {
                p2NextMoveRdy=false;
            defaultState();
            }  
              break;
            case "Kicking":
            drawFrame(animLoops.alP2Kick[p2CurrentLoopIndex], 0, 0, 0);
            p2CurrentLoopIndex++;
            if (p2CurrentLoopIndex >= animLoops.alP2Kick.length+1) {
                p2NextMoveRdy=false;
            defaultState();  
              break;
          }
        //drawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
        // p2CurrentLoopIndex++;
        // if (p2CurrentLoopIndex >= cycleLoop.length+1) {
        //     p1NextMoveRdy=false;
        //     defaultState();
        }
        window.requestAnimationFrame(animateP2);
        break;
    }
}


function p1UpdateMove(useMove) {
  switch (useMove) {
    case "Kick":
      p1NextMoveRdy=true;
      player1.currentMove = "Kick";
      p1Attack();
      window.requestAnimationFrame(animateP1);
      player1.currentMove = "";

      break;
    case "Jab":
      p1NextMoveRdy=true;
      player1.currentMove = "Jab";
      p1Attack();
      window.requestAnimationFrame(animateP1);
      player1.currentMove = "";

      break;
    default:
      //player1.currentMove = "";
      break;
  }
}
function p2UpdateMove(useMove) {
  switch (useMove) {
    case "Kick":
        p2NextMoveRdy=true;
        player2.currentMove = "Kick";
        p1Attack();
        window.requestAnimationFrame(animateP2);
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
          p1CurrentImg=images[0];
          player1.currentAnimState="Jabbing";
          console.log("P2 -5 HP!");
          break;
        case "Kick":
          player2.hp -= 10;
          p1CurrentImg=images[1];
          player1.currentAnimState="Kicking";
          console.log("P2 -10 HP!");

          break;
        default:
          p1UpdateMove(p1KeyInput);
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
          p1CurrentImg = images[7];
          console.log("P1 -5 HP!");
          break;
        case "Kick":
          player1.hp -= 10;
          p1CurrentImg = images[8];
          console.log("P1 -10 HP!");
          break;
        default:
          p2UpdateMove(keyInput);
          break;
      }
      break;
    }
    resolve();
  });
}
