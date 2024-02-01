/*
Name: Rami Aljanaby
Date: 1/31/24
Description: This site demonstrates features of the DOM 
*/


var body = document.querySelector(".body");
var para = document.createcontainer("p");
var node = document.createTextNode("\nThis is a new paragraph.\n");
var container = document.getcontainerById("container");

//For loop to create a paragraph element and append it to "container"
for (let i = 0; i < 5; i++){
    container.appendChild(para);
    para.appendChild(node.cloneNode());
}

//This function changes the background color based on current colors
function changeColour(){
    if(document.body.style.backgroundColor == "yellow"&&
       container.style.backgroundColor == "aqua"){

        document.body.style.backgroundColor = "white";
        container.style.backgroundColor = "white";
    }
    else{
        container.style.backgroundColor = "aqua"
        document.body.style.backgroundColor = "yellow"
    }
}

