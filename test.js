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
const animLoops= {
    alP1Idle: [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6],  
    alP1Jab: [0, 1, 0, 2],
    alP1Kick: [0, 1, 0, 2, 0, 3, 0, 4],
    alP1Hurt: [],
    alP1Dead: [],
};

console.log(images[5])
console.log()
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

function animateP1() {
            p1FrameCount++;
            if (p1FrameCount < 10) {
            window.requestAnimationFrame(animateP1);
            return;
            }
            p1FrameCount = 0;
            context.clearRect(0, 128, scaledWidth, scaledHeight);
            switch (player1.currentAnimState) {              
                case "Jabbing":
                    p1DrawFrame(animLoops.alP1Jab[p1CurrentLoopIndex], 0, 0, 0);
                    //p1NextMoveRdy=false;
                break;
            }
            p1CurrentLoopIndex++;
            if (!p1NextMoveRdy && p1CurrentLoopIndex < animLoops.alP1Jab.length){
                window.requestAnimationFrame(animateP1);
            }
            else{
                p1DefaultState();
            }  
}