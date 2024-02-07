/*
Name: Rami Aljanaby
Date: 2/5/24
Description: This web app changes the background by cycling through an array of colors.
             The user may control the speed at which the colors cycle via a slider control. 
*/

//TODO: use a node for document.body - consider changing the color of a small area instead of background

// Initialize array, document objects, and variables to manipulate the DOM
const colors =["red", "blue", "green", "white", "purple", "orange", "yellow", "pink", "brown","Chartreuse"];

//Variable for the button to begin changing the background colors
const button = document.querySelector("button");

//Variable to store the slider which will be used to change color strobe speed
var slider = document.getElementById("mySlider");
colorIndex = 0;

//Warns the user 
var dialogbox = window.alert("CAUTION! This web app contains rapidly flashing colors!");

//This function changes the background color by iterating through the colors array
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


// Add event listener to button that runs the changeColor function on click
button.addEventListener("click", changeColor);
 







