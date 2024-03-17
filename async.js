/*
Name: Rami
Proj: Async functions
*/

var runner1 = false;
var runner2 = false;
var loser = "";

const runner1Go = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("runner1");}, 2000); 
});

const runner2Go = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("runner2");
    }, 1500); 
});

