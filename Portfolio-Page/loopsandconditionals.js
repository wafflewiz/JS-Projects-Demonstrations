function newFunction (i){
    if (i % 2 == !0){
        console.log(i);   
    }
   
    return i++
}

var y = 1;

for ( n = y ; n < 9 ; n++){
    newFunction(n);
}

console.log(n);