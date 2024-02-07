/*
Name: Rami Aljanaby
Date: 2/5/24
Description: This project demonstrates usage of JS in combination with HTML to manipulate the DOM.
*/
// Initialize array, document objects, and variables to manipulate the DOM
const colors =["red", "blue", "green", "white", "purple", "orange", "yellow", "pink", "brown","Chartreuse"];
const button = document.querySelector("button");
var slider = document.getElementById("mySlider");
colorIndex = 0;


var dialogbox = window.alert("CAUTION! This web app contains rapidly flashing colors!");

function changeColor() {
    // Sets background color to the color at current index
    document.body.style.backgroundColor = colors[colorIndex];
    
    // Increments colorIndex
    colorIndex++;
    
    // Reset colorIndex to 0 if it exceeds the length of colors array
    if (colorIndex === colors.length) 
    {
        colorIndex = 0;
    }
    
    // Call setTimeout recursively to change color after a delay based on slider input
    setTimeout(changeColor, slider.value); 
}


// Add event listener to button
button.addEventListener("click", changeColor);
 







