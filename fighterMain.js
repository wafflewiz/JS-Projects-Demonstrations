//If we were dealing with multiple images, we'd probably want to use Promises to wait for all of them to load before doing anything with them.

const imgArray = [
    "assets/P1Sprite/Attack_1.png",
    "assets/P1Sprite/Attack_3.png",
    "assets/P1Sprite/Idle.png",
    "assets/P1Sprite/Hurt.png",
    "assets/P1Sprite/Dead.png",
    "assets/P2Sprite/Attack_1.png",
    "assets/P2Sprite/Attack_2.png",
    "assets/P2Sprite/Idle.png",
    "assets/P2Sprite/Hurt.png",
    "assets/P2Sprite/Dead.png"
];

const loadImages = async () => {
    const images = [];

    // Map each image source to a promise that resolves when the image is loaded
    const promises = imgArray.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
            img.src = src;
        });
    });

    // Wait for all promises to resolve
    await Promise.all(promises).then((imgs) => {
        images.push(...imgs);
    }).catch((error) => {
        console.error("Error loading images:", error);
    });

    return images;
};

// Call the function to load images
loadImages().then((images) => {
    // Do something with the loaded images
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
      alP2Jab: [0, 1, 0, 2, 0, 3],
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
    
    var p1IsBlocking = false;
    var p2IsBlocking = false;

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
    function p1DrawFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(p1CurrentImg,
                      frameX * width, frameY * height, width, height,
                      10, 128, scaledWidth, scaledHeight);
    }
    function p2DrawFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(p2CurrentImg,
                      frameX * width, frameY * height, width, height,
                     300 , 128, scaledWidth, scaledHeight);
    }
    function defaultState(){
        p1CurrentLoopIndex=0;
        p2CurrentLoopIndex=0;
        context.clearRect(0, 128, scaledWidth, scaledHeight);
        context.clearRect(scaledWidth, scaledHeight, 300 , 300);

        //p1DrawFrame(animLoops.alP1Jab[1], 0, 0, 0);
        //p2DrawFrame(animLoops.alP2Jab[1], 0, 0, 0);
    
    }
    // main function
    function init() {
    
        KeyInput = window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "a":
                    p1UpdateMove("Jab");
                    break;
                case "s":
                    p1UpdateMove("Kick");
                    console.log("s was pressed");
                    break;
                case "j":
                    p2UpdateMove("Jab");
                    break;
                case "k":
                    p2UpdateMove("Kick");
                    break;
                default:
                    p1UpdateMove("Idle");
                    p2UpdateMove("Idle");
                    break;
            }
        });
        
          
        //   p2KeyInput = window.addEventListener("keydown", function (event) {
        //     if (event.key === "j") {
        //       console.log("j was pressed");
        //       p2UpdateMove("Jab");
        //     } else if (event.key === "k") {
        //       p2UpdateMove("Kick");
        //       console.log("j was pressed");
        //     } else if (event.key === " ") {
        //       // Perform player attack
        //     }
        //   });
    }
    //
    function animateP1() {
        while (p1NextMoveRdy){    
            p1FrameCount++;
            if (p1FrameCount < 10) {
            window.requestAnimationFrame(animateP1);
            return;
            }
            p1FrameCount = 0;
            context.clearRect(128, 0, scaledWidth, scaledHeight);
            switch (player1.currentAnimState) {
                case "Standing":       
                  break;
                case "Jabbing":
                context.beginPath();    
                p1DrawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
                p1CurrentLoopIndex++;
                if (p1CurrentLoopIndex >= animLoops.alP1Jab.length+1) {
                    p1NextMoveRdy=false;
                    defaultState();
                }  
                  break;
                case "Kicking":
                context.beginPath();   
                p1CurrentLoopIndex++;
                if (p1CurrentLoopIndex >= animLoops.alP1Jab.length+1) {
                    p1NextMoveRdy=false;
                    defaultState();
                } 

                p1DrawFrame(animLoops.alP1Kick[p1CurrentLoopIndex], 0, 0, 0);  
                  break;
            }
            //drawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
           
            window.requestAnimationFrame(animateP1);
            break;
        }
    }
    function animateP2() {
        while (p2NextMoveRdy){    
            p2FrameCount++;
            if (p2FrameCount < 7) {
            window.requestAnimationFrame(animateP2);
            return;
            }
            p2FrameCount = 0;
            context.clearRect(scaledWidth, scaledHeight, 10 , 128);
            switch (player2.currentAnimState) {
                case "Standing":       
                  break;
                case "Jabbing":
                context.beginPath();    
                p2DrawFrame(animLoops.alP2Jab[p2CurrentLoopIndex], 0, 0, 0);
                p2CurrentLoopIndex++;
                if (p2CurrentLoopIndex >= animLoops.alP2Jab.length+1) {
                    p2NextMoveRdy=false;
                defaultState();
                }  
                  break;
                case "Kicking":
                    context.beginPath();    

                p2DrawFrame(animLoops.alP2Kick[p2CurrentLoopIndex], 0, 0, 0);
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
    function p2UpdateMove(useMove2) {
      switch (useMove2) {
        case "Kick":
            p2NextMoveRdy=true;
            player2.currentMove = "Kick";
            p2Attack();
            window.requestAnimationFrame(animateP2);
            player2.currentMove = "";
    
          break;
        case "Jab":
            p2NextMoveRdy=true;
            player2.currentMove = "Kick";
            p2Attack();
            window.requestAnimationFrame(animateP2);
            player2.currentMove = "";
    
          break;
        default:
          //player1.currentMove = "";
    
          break;
      }
    }
    function p1Attack() {
      
        while (p2IsBlocking === false) {
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
              p1UpdateMove(KeyInput);
              break;
          }
          break;
        }
    }
    function p2Attack() {
        while (p1IsBlocking === false) {
          switch (player2.currentMove) {
            case "Jab":
              player1.hp -= 5;
              p2CurrentImg = images[5];
              player2.currentAnimState="Jabbing";
              console.log("P1 -5 HP!");
              break;
            case "Kick":
              player1.hp -= 10;
              p2CurrentImg = images[6];
              player2.currentAnimState="Kicking";
              console.log("P1 -10 HP!");
              break;
            default:
              p2UpdateMove(keyInput);
              break;
          }
          break;
        }
    }
    
}).catch((error) => {
    console.error("Error loading images:", error);
});

  

