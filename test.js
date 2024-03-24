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