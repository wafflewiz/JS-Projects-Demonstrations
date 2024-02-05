/*
Name: Rami Aljanaby
Date: 2/5/24
Description: This project demonstrates usage of JS in combination with HTML to manipulate the DOM.
*/
const colors =[];

const randomColor = () => {
    const randomizer = "#" + Math.floor(Math.random()*19777215).toString(16);
    colors.push(randomizer);
}

console.log(colors);