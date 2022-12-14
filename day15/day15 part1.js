"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
const rawInput = fs_1.readFileSync('day15/day15 input.txt', 'utf-8');
const textRows = splitTextIntoRows(rawInput, '\n');
const graphWidth = getGraphWidth(textRows);
const graphHeight = getGraphHeight(textRows);
let riskGraph = generateStartingRiskGraph(textRows);
calculateLowestRiskToReachEachVertex(riskGraph);
let exitVertexId = generateVertexId(graphWidth - 1, graphHeight - 1);
console.log('lowest risk to end: ', findVertexById(exitVertexId));
function generateVertexId(x, y) {
    return x + ',' + y;
}
function splitTextIntoRows(text, delimiter) {
    // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    return text.replace(/\r\n/g, '\n').split(delimiter);
}
function getGraphWidth(textRows) {
    return textRows[0].length;
}
function getGraphHeight(textRows) {
    return textRows.length;
}
function getAdjacentVerteces(x, y) {
    let verteces = [];
    if (x < graphWidth - 1)
        verteces.push(generateVertexId(x + 1, y));
    if (x > 0)
        verteces.push(generateVertexId(x - 1, y));
    if (y < graphHeight - 1)
        verteces.push(generateVertexId(x, y + 1));
    if (y > 0)
        verteces.push(generateVertexId(x, y - 1));
    return verteces;
}
function generateStartingRiskGraph(textRows) {
    let riskGraph = [];
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
function identifyUnvisitedVertexWithLowestTotalRisk() {
    let unvisitedVerteces = riskGraph.filter((vertex) => vertex.visited === false);
    return unvisitedVerteces.reduce((prevVertex, currentVertex) => (currentVertex.totalRisk < prevVertex.totalRisk ? currentVertex : prevVertex));
}
function atLeastOneVertexNotVisited() {
    return riskGraph.find((vertex) => vertex.visited === false) ? true : false;
}
function findVertexById(id) {
    return riskGraph.find((vertex) => vertex.id == id);
}
function getVertecesByIds(ids) {
    let verteces = [];
    ids.forEach((id) => {
        let vertex = findVertexById(id);
        if (vertex)
            verteces.push(vertex);
    });
    return verteces;
}
function calculateLowestRiskToReachEachVertex(graph) {
    // Dijkstra's shortest path algorithm
    while (atLeastOneVertexNotVisited()) {
        let currentVertex = identifyUnvisitedVertexWithLowestTotalRisk();
        let adjacentVerteces = getVertecesByIds(currentVertex.adjacentVerteces);
        adjacentVerteces.forEach((adjacentVertex) => {
            if (adjacentVertex.visited === true)
                return;
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
