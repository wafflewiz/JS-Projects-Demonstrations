const imgArray = [
    imgP1Jab = ["assets/P1Sprite/Attack_1.png"],
    imgP1Kick = ["assets/P1Sprite/Attack_3.png"],
    imgP1Idle = ["assets/P1Sprite/Idle.png"],
    ImgP1Hurt = ["assets/P1Sprite/Hurt.png"],
    ImgP1Dead = ["assets/P1Sprite/Dead.png"]
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

console.log(images[0])
console.log(animLoops.alP1Idle[3])