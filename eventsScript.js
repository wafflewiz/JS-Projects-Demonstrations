/*
Name: Rami Aljanaby
Date: 1/31/24
Description: This site demonstrates features of the DOM 
*/

var body = document.querySelector(".body");
var para = document.createElement("p");
var node = document.createTextNode("\nThis is a new paragraph.\n");
var element = document.getElementById("container");
//Loop that creates a new paragraph 5 times within the class "container"
for (let i = 0; i < 5; i++){
    element.appendChild(para);
    para.appendChild(node.cloneNode());
}

//Changes colors of the page based on current colors
function changeColour(){
    if(document.body.style.backgroundColor == "yellow"&&
       element.style.backgroundColor == "aqua"){

    document.body.style.backgroundColor = "white";
    element.style.backgroundColor = "white";
    }
    else{
        element.style.backgroundColor = "aqua"
        document.body.style.backgroundColor = "yellow"
    }
}

