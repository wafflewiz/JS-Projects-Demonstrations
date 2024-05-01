
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
    //generate Tree based on user input (data)
    generateTree(data) {
        const lastElement = data[data.length - 1];
        const newNode = new TreeNode(lastElement);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
    refreshTree(){
        for (let i=0; i<=data.length; i++){
            const lastElement = data[data.length - 1];
            const newNode = new TreeNode(lastElement);
            if (this.root === null) {
                this.root = newNode;
            } else {
                this.insertNode(this.root, newNode);
            }
        }
    }

    insertNode(node, newNode) {
        //set to root by default
        const queue = [node];
    
        while (queue.length > 0) {
            //set current selection by resetting array
            const currentNode = queue.shift();
    
            if (currentNode.left === null) {
                currentNode.left = newNode;
                console.log(currentNode.left);
                return;
            } else if (currentNode.right === null) {
                currentNode.right = newNode;
                console.log(currentNode.right);
                return;
            }
    
            queue.push(currentNode.left, currentNode.right);
        }
    }
    //bubble sort algorithm
    sortData(){
        for (let i=0; i<this.data.length; i++){

            //inner loop will compare each element and bubble up if needed
            for (let j=0; j<this.data.length - 1; j++){

                let currentIndex=j;
                let nextIndex= j+1;
                let currentVal=this.data[currentIndex];
                let nextVal=this.data[nextIndex];

                //parse input, swap values if this conidition is met
                if (parseFloat(nextVal) < parseFloat(currentVal)) {
                    this.data[currentIndex] = nextVal;
                    this.data[nextIndex] = currentVal;
                }
                 
            }
        }
    }   
}