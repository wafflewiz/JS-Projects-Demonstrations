
const submitButton = document.getElementById('addButton');
let data = [];
let tree = new Tree(data);



function handleClick(value) {
    tree.sortData(data);
    tree.generateTree(tree.data);
    data.push(value);
    console.log(data.values);
    renderTree();
    
}

submitButton.addEventListener('click', ()=> {
    const inputValue = document.getElementById('inputTxtBx').value;
    handleClick(inputValue);
});

function createTreeVisualization(node) {
    const divNode = document.createElement('div');
    divNode.classList.add('node');
    if (node !== null) {
        const spanValue = document.createElement('span');
        spanValue.classList.add('node-value');
        spanValue.textContent = node.value;
        divNode.appendChild(spanValue);
        const childrenContainer = document.createElement('div');
        childrenContainer.classList.add('node-children');
        childrenContainer.appendChild(createTreeVisualization(node.left));
        childrenContainer.appendChild(createTreeVisualization(node.right));
        divNode.appendChild(childrenContainer);
    }
    return divNode;
}
function renderTree() {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = ''; // Clear previous content
    const rootNodeElement = createTreeVisualization(tree.root);
    treeContainer.appendChild(rootNodeElement);
}

