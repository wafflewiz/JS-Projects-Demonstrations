/*
Name: Rami Aljanaby
Proj: Async functions
Date: 3/17/24
*/
async function main () {
    var runner1 = false;
    var runner2 = false;
    var loser = "";

    const runner1Go = new Promise((resolve, reject) => {
        setTimeout(() => {
            loser="Runner 1 lost";
            resolve(runner1 = true);}, 2000);
            
    });

    const runner2Go = new Promise((resolve, reject) => {
        setTimeout(() => {
            loser="Runner 2 lost";
            resolve(runner2 = true);}, 1500); 
            
    });
  
    return [
        result1 = await runner1Go,
        result2 = await runner2Go,
        loser,
    ];
}
var returnValue = [main()];

main().then((returnValue)=>{
    console.log(returnValue[2]);
}) 