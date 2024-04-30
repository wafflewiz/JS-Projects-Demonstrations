
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

}
class Tree{
    constructor(data){
        this.data=data;
        this.root=null;
    }

    //bubble sort algorithm
    sortData(){
        //first loop will end when nested loop resolves
        for (let i=0; i<=this.data.length; i++){

            //second loop will compare each element and bubble up if needed
            for (let j=0; j<=this.data.length - 1; j++){

                //values and indexes to be compared
                let currentIndex=j;
                let nextIndex= j+1;
                let currentVal=this.data[currentIndex];
                let nextVal=this.data[nextIndex];

                //swap values if this conidition is met
                if (nextVal < currentVal ){
                    this.data[currentIndex] = nextVal;
                    this.data[nextIndex] = currentVal;
                }      
            }
        }
    }

    generateTree(data) {

        for (let i =0; i <= data.length ; i++){
            const newNode = new TreeNode(this.data[i]);
                if (this.root === null) {
                    this.root = newNode;
                } else {
                    this.insertNode(this.root, newNode);
                }
                
        console.log(newNode.value);
        }   
    }

    insertNode(node, newNode) {
        if (newNode.value > node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

}