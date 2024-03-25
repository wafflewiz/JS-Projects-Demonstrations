//Create a fighter class
class Fighter{
    constructor(name, hp, currentMove, currentAnimState, ...moves) {  // Constructor
        this.name = name;
        this.hp = hp;
        this.currentMove=currentMove;
        this.currentAnimState=currentAnimState;
        this.moves= moves;
      }
}
