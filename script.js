/*
Name: Rami Aljanaby
Date: 2/5/24
Description: This web app changes the background by cycling through an array of colors.
             The user may control the speed at which the colors cycle via a slider control. 
*/
addEventListener("DOMContentLoaded", (event) => {});


//TODO: use a node for document.body - consider changing the color of a small area instead of background

// Initialize array, document objects, and variables to manipulate the DOM
const colors =["red", "blue", "green", "white", "purple", "orange", "yellow", "pink", "brown","Chartreuse"];

//Variable for the button to begin changing the background colors
const button = document.getElementById("button");
const stopButton = document.getElementById("button2");
const paragraph = document.getElementById("paragraph");

//Variable to store the slider which will be used to change color strobe speed
var slider = document.getElementById("colorslider");
const createPara = document.createElement("p");



//var paragraph = document.getElementsById("paragraph");
colorIndex = 0;
let text = "";


//Warns the user 
//window.alert("CAUTION! This web app contains rapidly flashing colors!");

//This function expression changes the background color by iterating through the colors array
const changeColor = function () {
        const currentColorTxt = document.createTextNode(colors[colorIndex]);
        const currentSliderValue = document.createTextNode(slider.value);

        while (colorIndex <= colors.length ){
            
            paragraph.appendChild(currentColorTxt);

            break;
        }
        // Sets background color to the color at current index
        document.body.style.backgroundColor = colors[colorIndex];
        
        // Increments array index
        colorIndex++;
        
        // Reset colorIndex to 0 if it exceeds the length of colors array
        if (colorIndex === colors.length) 
        {
            colorIndex = 0;
        }
        
        // Call setTimeout recursively to change color after a delay based on slider input
        setTimeout(changeColor, slider.value*1000); 

        // Display the current color as text
        

        stopButton.addEventListener("click", () => {
            location.reload();
        });

    
}




// Add event listener to button that runs the changeColor function on click
button.addEventListener("click", changeColor);

 







