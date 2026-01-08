class Node {
    constructor(row, col, isWall, div) {
        this.row = row;
        this.col = col;
        this.isWall = isWall;
        this.div = div; // HTML-elementet

        this.g = 999;    // Afstand fra start
        this.f = 999;    // Samlet estimeret pris (g + h)
        this.parent = null;   // Bruges til at huske vejen tilbage
    }
}

const grid = [];
const gridVisual = document.getElementById("grid");

// 0 = vej, 1 = mur
const maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0]
];

// Opretter grid og noder baseret på maze arrayet
for (let row = 0; row < 10; row++) {
    grid[row] = [];
    for (let col = 0; col < 10; col++) {
        let div = document.createElement("div");
        div.classList.add("node");
        
        let isWall = false;
        if (maze[row][col] === 1) {
            isWall = true;
        }
        if (isWall) {
            div.classList.add("wall");
        }

        gridVisual.appendChild(div); // Tilføjer feltet til HTML visningen
        grid[row][col] = new Node(row, col, isWall, div); // Gemmer node objektet i arrayet
    }
}

// Vælger hvor start og slut skal være
let startNode = grid[0][0];
let endNode = grid[9][9];
startNode.div.classList.add("start");
endNode.div.classList.add("end");

// Beregner Manhattan distancen mellem to noder (heuristik)
function getDistance(nodeA, nodeB) {
    let x = Math.abs(nodeA.row - nodeB.row);
    let y = Math.abs(nodeA.col - nodeB.col);
    return x + y;
}

// Finder de gyldige naboer
function getValidNeighbors(current) {
    let neighbors = [];
    let row = current.row;
    let col = current.col;

    // Tjek op
    if (row > 0) {
        let upNode = grid[row - 1][col];
        if (upNode.isWall === false) {
            neighbors.push(upNode);
        }
    }

    // Tjek ned
    if (row < 9) {
        let downNode = grid[row + 1][col];
        if (downNode.isWall === false) {
            neighbors.push(downNode);
        }
    }

    // Tjek venstre
    if (col > 0) {
        let leftNode = grid[row][col - 1];
        if (leftNode.isWall === false) {
            neighbors.push(leftNode);
        }
    }

    // Tjek højre
    if (col < 9) {
        let rightNode = grid[row][col + 1];
        if (rightNode.isWall === false) {
            neighbors.push(rightNode);
        }
    }

    return neighbors;
}

// Tegner slutruten ved hjælp af parent
function drawPath(current) {
    let temp = current;
    while (temp !== null) {
        if (temp !== startNode && temp !== endNode) {
            temp.div.classList.add("path");
        }
        temp = temp.parent;
    }
}


async function startAStar() {
    let frontier = []; // Ting vi mangler at kigge på
    let explored = []; // Færdige noder


    // Sætter start noden
    startNode.g = 0;
    startNode.f = getDistance(startNode, endNode);
    frontier.push(startNode);

    while (frontier.length > 0) {
        // Find noden med den laveste f-score
        let currentIndex = 0;
        for (let i = 0; i < frontier.length; i++) {
            if (frontier[i].f < frontier[currentIndex].f) {
                currentIndex = i;
            }
        }

        let current = frontier[currentIndex];

        // Ser om vi er nået til målet
        if (current === endNode) {
            drawPath(current);
            return;
        }

        // Flyt noden fra frontier til explored
        frontier.splice(currentIndex, 1);
        explored.push(current);

        // Farv feltet som "besøgt". Undtagen start og slut
        if (current !== startNode) {
            current.div.classList.add("visited");
        }

        // Hent naboer og tjek dem
        let neighbors = getValidNeighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            // Hvis vi allerede har undersøgt denne nabo, så springer vi den over
            if (explored.includes(neighbor)) {
                continue;
            }

            // Prisen for at gå til en nabo er altid 1 i dette grid
            let tentativeG = current.g + 1;

            // Ser om der er en bedre vej til naboen
            if (tentativeG < neighbor.g) {
                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.f = neighbor.g + getDistance(neighbor, endNode);

                if (!frontier.includes(neighbor)) {
                    frontier.push(neighbor);
                }
            }
        }

        // Pause så vi kan se visualiseringen i browseren
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}