
//Load Sprite images into an array
const imgArray = [
    "assets/P1Sprite/Attack_1.png",
    "assets/P1Sprite/Attack_3.png",
    "assets/P2Sprite/Attack_1.png",
    "assets/P2Sprite/Attack_3.png",
];

//Creates an object for each image after theyre loaded into an array
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

// Call the function to load images, then run this code
loadImages().then((images) => {
    const player1 = new Fighter("P1", 100, "Idle", "Standing", "Jab", "Kick");
    const player2 = new Fighter("P2", 100, "Idle", "Standing" , "Kick");
    //size of img
    const scale = 1.2;
    //dimensions used for img and canvas
    const width = 132;
    const height = 132;
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;
    const animLoops= {
      alP1Jab: [0, 1, 0, 2, 0, 3],
      alP1Kick: [0, 1, 0, 2, 0, 3], 
      alP2Jab: [0, 1, 0, 2, 0, 3],
      alP2Kick: [0, 1, 0, 2, 0, 3],
    }; 
    let p1CurrentImg;
    let p2CurrentImg;
    let p1CurrentLoopIndex = 0;
    let p2CurrentLoopIndex = 0;
    p1NextMoveRdy = true;
    p2NextMoveRdy = true;    
    let p1FrameCount = 0;
    let p2FrameCount = 0;
    let lengthOfArray = 0;
    
    //create a 2D canvas element 
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");

    //Creates P1 Health bar
    function p1DrawHealthBar() {
        console.log("p1DrawHealthBar");
    
        // Clear the area for player 1's health bar
        context.clearRect(20, 50, 200, 15);

    
        // Draw the health bar for player 1
        context.fillStyle = "aqua";
        context.fillRect(20, 50, player1.hp * 2, 15);
    }
    function p2DrawHealthBar() {
        var newX = 450 - (player2.hp * 2) - 10
        console.log("p2DrawHealthBar");
    
        // Clear the area for player 2's health bar
        context.clearRect(20 + (player1.maxHp * 2) - (player1.hp * 2), 50, player2.hp*2 , 15);
    
        // Calculate the width of the health bar based on player 2's current health
        var healthBarWidth = Math.max(0, player2.hp * 2);
    
        // Draw the health bar for player 2
        context.fillStyle = "aqua";
        context.fillRect(20 + (player2.maxHp * 2) - (player1.hp * 2), 50, player2.hp , 15);
    }
 

    init();
 
    //draws the 2D image onto canvas
    function p1DrawFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(p1CurrentImg,
                      frameX * width, frameY * height, width, height,
                      150, 128, scaledWidth, scaledHeight);
    }
    function p2DrawFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(p2CurrentImg,
                      frameX * width, frameY * height, width, height,
                     200 , 128, scaledWidth, scaledHeight);
    }

    //Resets to neutral by setting Index to 0
    function p1DefaultState(){
        p1CurrentLoopIndex=0;    
    }
    function p2DefaultState(){
        p2CurrentLoopIndex=0;
    }

    // Main Game Loop
    function init() {
        p1DrawHealthBar();
        p2DrawHealthBar();
        //Listens for a keyboard input
        KeyInput = window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "a":
                    p1UpdateMove("Jab");
                    break;
                case "s":
                    p1UpdateMove("Kick");
                    break;
                case "j":
                    p2UpdateMove("Jab");
                    break;
                case "k":
                    p2UpdateMove("Kick");
                    break;
            }
        });

    }
    //Animate the frames
    function animateP1() {
        p1FrameCount++;
        if (p1FrameCount < 15) {
            window.requestAnimationFrame(animateP1);
            return;
        }
        p1FrameCount = 0;
        context.clearRect(150, 128, scaledWidth, scaledHeight);
        switch (player1.currentAnimState) {              
            case "Jabbing":
                p1DrawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
                p1NextMoveRdy=false;
                lengthOfArray=animLoops.alP1Jab.length;
            break;
            case "Kicking":
                p1DrawFrame(animLoops.alP1Kick[p1CurrentLoopIndex], 0, 0, 0);
                p1NextMoveRdy=false;
                lengthOfArray=animLoops.alP1Kick.length;
            break;

        }
        p1CurrentLoopIndex++;
        if (!p1NextMoveRdy && p1CurrentLoopIndex < lengthOfArray){
            window.requestAnimationFrame(animateP1);
        }
        else{
            p1DefaultState();
        }  
}
    function animateP2() {
        p2FrameCount++;
        if (p2FrameCount < 15) {
            window.requestAnimationFrame(animateP2);
            return;
        }
        p2FrameCount = 0;
        context.clearRect(scaledWidth, scaledHeight, 300 , 300);
        switch (player2.currentAnimState) {              
            case "Jabbing":
                p2DrawFrame(animLoops.alP2Jab[p2CurrentLoopIndex], 0, 0, 0);
                p2NextMoveRdy=false;
                lengthOfArray=animLoops.alP2Jab.length;
            break;
            case "Kicking":
                p2DrawFrame(animLoops.alP2Kick[p2CurrentLoopIndex], 0, 0, 0);
                p2NextMoveRdy=false;
                lengthOfArray=animLoops.alP2Kick.length;
            break;

        }
        p2CurrentLoopIndex++;
        if (!p2NextMoveRdy && p2CurrentLoopIndex < lengthOfArray){
            window.requestAnimationFrame(animateP2);
        }
        else{
            p2DefaultState();
        }  
    }
    
    //Update Current Move
    function p1UpdateMove(useMove) {
      switch (useMove) {
        case "Kick":
          p1NextMoveRdy=true;
          player1.currentMove = "Kick";
          p1Attack();
          player1.currentMove = "";
    
          break;
        case "Jab":
          p1NextMoveRdy=true;
          player1.currentMove = "Jab";
          p1Attack();
          player1.currentMove = "";
    
          break;
        }
    }
    function p2UpdateMove(useMove2) {
      switch (useMove2) {
        case "Kick":
            p2NextMoveRdy=true;
            player2.currentMove = "Kick";
            p2Attack();
            player2.currentMove = "";
    
          break;
        case "Jab":
            p2NextMoveRdy=true;
            player2.currentMove = "Jab"
            p2Attack();
            player2.currentMove = "";
    
          break;
      }
    }
    //Grab spritesheet and animate the attack
    function p1Attack() {

          switch (player1.currentMove) {
            case "Jab":
              player2.hp -= 5;
              p1CurrentImg=images[0];
              player1.currentAnimState="Jabbing";
              p2DrawHealthBar();
              window.requestAnimationFrame(animateP1);
              console.log("finna drawg p2 healthbar")
              console.log(player2.hp);
            break;
            case "Kick":
              player2.hp -= 5;
              p1CurrentImg=images[1];
              player1.currentAnimState="Kicking";
              p2DrawHealthBar();
              window.requestAnimationFrame(animateP1);
            break;
            
         }
    }
    function p2Attack() {
          switch (player2.currentMove) {
            case "Jab":
              player1.hp -= 5;
              console.log(player1.hp);
              p2CurrentImg = images[2];
              player2.currentAnimState="Jabbing";
              window.requestAnimationFrame(animateP2);
              p1DrawHealthBar();
              break;
            case "Kick":
              player1.hp -= 10;
              p2CurrentImg = images[3];
              player2.currentAnimState="Kicking";
              window.requestAnimationFrame(animateP2);
              p1DrawHealthBar();
              break;
          }         
    }
})

