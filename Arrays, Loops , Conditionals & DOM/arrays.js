const newArray = [1, 1, 1, 1, 4, 4, 4];

function newFunction(param){
    param+1;
    console.log(param);
}

function newerFunction(a, tempFunction){
    if (a % 2 == 0){
        tempFunction(a)
    }
   
    else {
        console.log("The number is odd!")
    }
}

for (let x in newArray){
newerFunction(x, newFunction)
}

