//initialize function closure
function createChar(Name, HP, ...moves){
    //variables are private because local scope
    let hp = HP;
    let name = Name;
    let movesArray = moves;

    //what the function will output
    return{
        returnHp: ()=>{
            return hp;
        },

        returnName: ()=>{
            return name;
        },

        //displays elements of the moves array on the page
        appendMove: ()=>{
            //for each move in the moves array...
            for (const move of movesArray){
                //create a p element node
                const node = document.createElement("p");

                //create a text node of the move text
                const textnode = document.createTextNode(move);

                //find the moves class in the html
                const movesEl = document.querySelector(".moves");

                // add the text node to the p node 
                node.appendChild(textnode);

                //add the p node to the div node
                movesEl.appendChild(node);
            }
        }
    }
}

//new character, assign args 
let Bob = createChar("Bob", 100, "Jab", "Kick", "Overhead", "Low Jab", "Low Kick", "Block");

//run the appendMove method of the object Bob to display moves on page
Bob.appendMove();

console.log("Name:", Bob.returnName());
console.log("HP:", Bob.returnHp());
