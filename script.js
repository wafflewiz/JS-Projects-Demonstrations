/*
Name: Rami Aljanaby
Date: 2/5/24
Description: This web app changes the background by cycling through an array of colors.
             The user may control the speed at which the colors cycle via a slider control. 
*/
addEventListener("DOMContentLoaded", (event) => {});


//TODO: use a node for document.body - consider changing the color of a small area instead of background

// Initialize array, document objects, and variables to manipulate the DOM
const colors =["Red", "Blue", "Green", "White", "Purple", "Orange", "Yellow", "Pink", "Brown","Chartreuse"];

//Variable for the button to begin changing the background colors
const stopButton = document.getElementById("button2");

//Variable to store the slider which will be used to change color change speed
var slider = document.getElementById("colorslider");

//User text prompts
const silderInfo = document.getElementById("sliderInfo");
const colorInfo = document.getElementById("colorInfo");

colorIndex = 0;

//This function expression changes the background color by iterating through the colors array
const changeColor = function () {
    
        const currentColorTxt = document.createTextNode("Current color is: " + colors[colorIndex]);
        const currentSliderTxt = document.createTextNode("Current interval is: " + slider.value + " seconds");

        while (colorIndex <= colors.length ){
            sliderInfo.textContent="";
            sliderInfo.appendChild(currentSliderTxt);

            colorInfo.textContent="";
            colorInfo.appendChild(currentColorTxt);

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

 







