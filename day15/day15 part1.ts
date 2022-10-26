const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

const rawInput = readFileSync('day15/day15 input.txt', 'utf-8');
const textRows = splitTextIntoRows(rawInput, '\n');

const graphWidth = getGraphWidth(textRows);
const graphHeight = getGraphHeight(textRows);

let riskGraph = generateStartingRiskGraph(textRows);
calculateLowestRiskToReachEachVertex(riskGraph);

let exitVertexId = generateVertexId(graphWidth - 1, graphHeight - 1);
console.log('lowest risk to end: ', findVertexById(exitVertexId));

// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface vertex {
    id: string;
    x: number;
    y: number;
    risk: number;
    visited: boolean;
    totalRisk: number;
    bestPath: string[];
    adjacentVerteces: string[];
}

function generateVertexId(x: number, y: number): string {
    return x + ',' + y;
}

function splitTextIntoRows(text: string, delimiter: string): string[] {
    // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    return text.replace(/\r\n/g, '\n').split(delimiter);
}

function getGraphWidth(textRows: string[]): number {
    return textRows[0].length;
}

function getGraphHeight(textRows: string[]): number {
    return textRows.length;
}

function getAdjacentVerteces(x: number, y: number): string[] {
    let verteces: string[] = [];
    if (x < graphWidth - 1) verteces.push(generateVertexId(x + 1, y));
    if (x > 0) verteces.push(generateVertexId(x - 1, y));

    if (y < graphHeight - 1) verteces.push(generateVertexId(x, y + 1));
    if (y > 0) verteces.push(generateVertexId(x, y - 1));

    return verteces;
}

function generateStartingRiskGraph(textRows: string[]): vertex[] {
    let riskGraph: vertex[] = [];
    for (let [rowIndex, row] of textRows.entries()) {
        row.split('').forEach((value, columnIndex) => {
            let key = generateVertexId(columnIndex, rowIndex);
            riskGraph.push({
                id: generateVertexId(columnIndex, rowIndex),
                x: columnIndex,
                y: rowIndex,
                risk: parseInt(value, 10),
                visited: false,
                totalRisk: columnIndex == 0 && rowIndex == 0 ? 0 : Number.POSITIVE_INFINITY,
                bestPath: columnIndex == 0 && rowIndex == 0 ? ['0,0'] : [],
                adjacentVerteces: getAdjacentVerteces(columnIndex, rowIndex),
            });
        });
    }
    return riskGraph;
}

function identifyUnvisitedVertexWithLowestTotalRisk(): vertex | undefined {
    let unvisitedVerteces = riskGraph.filter((vertex) => vertex.visited === false);
    return unvisitedVerteces.reduce((prevVertex, currentVertex) => (currentVertex.totalRisk < prevVertex.totalRisk ? currentVertex : prevVertex));
}

function atLeastOneVertexNotVisited(): boolean {
    return riskGraph.find((vertex) => vertex.visited === false) ? true : false;
}

function findVertexById(id: string): vertex | undefined {
    return riskGraph.find((vertex) => vertex.id == id);
}

function getVertecesByIds(ids: string[]): vertex[] {
    let verteces: vertex[] = [];
    ids.forEach((id) => {
        let vertex = findVertexById(id);
        if (vertex) verteces.push(vertex);
    });
    return verteces;
}

function calculateLowestRiskToReachEachVertex(graph: vertex[]): void {
    // Dijkstra's shortest path algorithm
    while (atLeastOneVertexNotVisited()) {
        let currentVertex = identifyUnvisitedVertexWithLowestTotalRisk();
        let adjacentVerteces = getVertecesByIds(currentVertex.adjacentVerteces);

        adjacentVerteces.forEach((adjacentVertex) => {
            if (adjacentVertex.visited === true) return;
            let totalRiskWhenComingFromCurrentVertex = currentVertex.totalRisk + adjacentVertex.risk;
            if (totalRiskWhenComingFromCurrentVertex < adjacentVertex.totalRisk) {
                adjacentVertex.totalRisk = totalRiskWhenComingFromCurrentVertex;
                adjacentVertex.bestPath = [...currentVertex.bestPath, generateVertexId(adjacentVertex.x, adjacentVertex.y)];
            }
        });

        currentVertex.visited = true;
    }
}

console.log('==============================\n');
