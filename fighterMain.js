const player1 = new Fighter("P1", 100, "Jab", "Low Kick" );
const player2 = new Fighter("P2", 100, "Jab", "Low Kick" );
var blocking = false;

//TODO figure out why keyinput isnt working
//     add stick figure canvas
//     add blocking logic
keyInput = window.addEventListener('keydown', function(event) {
    if (event.key === 'J') {
        console.log("J was pressed");
        p1UpdateMove("Jab")
    } else if (event.key === 'K') {
        p1UpdateMove("Low Kick");
        console.log("J was pressed")
    } else if (event.key === ' ') {
        // Perform player attack
    }
});
function p1Attack() {
    return new Promise((resolve, reject) => {
        while (blocking === false) {
            switch (player1.currentMove) {
                case "Jab":
                    player2.hp -= 5;
                    console.log("-5 HP!");
                    break;
                case "Low Kick":
                    player2.hp -= 10;
                    console.log("-10 HP!");
                    break;
                default:
                    p1UpdateMove(keyInput);
                    break;
            }
            break;
        }
        resolve();
    });
}
function p1UpdateMove(useMove){
    switch (useMove) {
        case "Low Kick":
            player1.currentMove = "Low Kick";
            p1Attack();
            player1.currentMove = "";

            break;
        case "Jab":
            player1.currentMove = "Jab";
            p1Attack();
            player1.currentMove = "";

            break;
        default:
            //player1.currentMove = "";

            break;
    }
}
p1UpdateMove("Jab");
p1UpdateMove("Low Kick");



//p1UpdateMove("Low Kick");
// function p2Attack(...p2CurrentMove) {
    
//         while(blocking == false){
//             if (player2.moves=="Jab"){
//                 player1.hp-=5;
//                 console.log("-5 HP!")
//             }
//             else if (player2.moves=="Low Kick"){
//                 player1.hp-=10;
//                 console.log("-10 HP!")
//             }
//             break;        
// }
//p1Attack();
