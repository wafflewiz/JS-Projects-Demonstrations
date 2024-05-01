
const submitButton = document.getElementById('addButton');
const sortButton = document.getElementById('sortButton');
const clearButton = document.getElementById('clearButton');
const treeContainer = document.getElementById('tree-container');
const arrayContainer = document.getElementById('array-container');

let data = [];
let tree = new Tree(data);
let treeExists = false;


function submitBtnClick(value) {

    if(treeExists === true){
        tree.sortData(data);
        data.push(value);
        tree.generateTree(data)
        renderTree('tree-container');
    }
    else{
        tree.sortData(data);
        data.push(value);
        tree.generateTree(data)
        renderTree('tree-container');
        treeExists = true;
    } 
}
function sortBtnClick() {
    tree.sortData(tree.data)
    const treeVisualization = drawArrayElements(data);
    treeContainer.innerHTML = '';
    document.body.appendChild(treeVisualization);

}
clearButton.addEventListener('click', ()=> {
   location.reload();

});

submitButton.addEventListener('click', ()=> {
    const inputValue = document.getElementById('inputTxtBx').value;
    submitBtnClick(inputValue);
});
sortButton.addEventListener('click', ()=> {

    sortBtnClick(data);
});
function createTreeNodeVisualization(node) {
    const divNode = document.createElement('div');
    divNode.classList.add('node');

    if (node !== null) {
        const spanValue = document.createElement('span');
        spanValue.classList.add('node-value');
        spanValue.textContent = node.value;
        divNode.appendChild(spanValue);

        if (node.left || node.right) {
            const childrenContainer = document.createElement('div');
            childrenContainer.classList.add('node-children');

            if (node.left) {
                childrenContainer.appendChild(createTreeNodeVisualization(node.left));
            }

            if (node.right) {
                childrenContainer.appendChild(createTreeNodeVisualization(node.right));
            }

            divNode.appendChild(childrenContainer);
        }
    }
    return divNode;
}

function renderTree() {
    //console.log("Render Tree is being called!!!")
    treeContainer.innerHTML = '';

    const rootNodeElement = createTreeNodeVisualization(tree.root);
    treeContainer.appendChild(rootNodeElement);
}

function drawArrayElements(array) {
    const container = document.createElement('div');
    container.classList.add('array-container');
    array=tree.data;

    array.forEach(element => {
        const divElement = document.createElement('div');
        divElement.classList.add('array-element');
        divElement.textContent = element;
        container.appendChild(divElement);
    });

    return container;
}



