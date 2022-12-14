"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
const rawInput = fs_1.readFileSync('day15/day15 input.txt', 'utf-8');
const textRows = splitTextIntoRows(rawInput, '\n');
let expandedTextRows = expandInputTextLeftAndDownNTimes(textRows, 5);
console.log('rows expanded in', performance.now() - startMS, 'ms');
const graphWidth = getGraphWidth(expandedTextRows);
const graphHeight = getGraphHeight(expandedTextRows);
let riskGraph = generateStartingRiskGraph(expandedTextRows);
console.log('initial risk graph generated in', performance.now() - startMS, 'ms');
calculateLowestRiskToReachEachVertex(riskGraph);
let exitVertexId = generateVertexId(graphWidth - 1, graphHeight - 1);
console.log('lowest risk to end: ', findVertexById(exitVertexId)?.totalRisk);
console.log('visited', riskGraph.reduce((total, vertex) => (vertex.visited ? (total += 1) : total), 0), '/', riskGraph.length);
console.log('\ntotal ms: ', performance.now() - startMS);
function generateVertexId(x, y) {
    return x + ',' + y;
}
function splitTextIntoRows(text, delimiter) {
    // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    return text.replace(/\r\n/g, '\n').split(delimiter);
}
function calculateIncrementedRiskValue(integerString, incrementBy) {
    let newValue = parseInt(integerString, 10) + incrementBy;
    let adjustedValue = newValue > 9 ? newValue - 9 : newValue;
    return adjustedValue.toString();
}
function expandInputTextLeftAndDownNTimes(originalTextRows, repeatCount) {
    let expandedInitialTextRows = [];
    originalTextRows.forEach((textRow) => {
        let initialRowChars = textRow.split('');
        let expandedTextRow = [...initialRowChars];
        for (let i = 1; i < repeatCount; i++) {
            expandedTextRow.push(...initialRowChars.map((char) => calculateIncrementedRiskValue(char, i)));
        }
        expandedInitialTextRows.push(expandedTextRow.join(''));
    });
    let expandedText = [...expandedInitialTextRows];
    for (let i = 1; i < repeatCount; i++) {
        expandedInitialTextRows.forEach((textRow) => {
            let rowChars = textRow.split('');
            let newRow = [];
            newRow = [...rowChars.map((char) => calculateIncrementedRiskValue(char, i))];
            expandedText.push(newRow.join(''));
        });
    }
    return expandedText;
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
            riskGraph.push({
                id: generateVertexId(columnIndex, rowIndex),
                risk: parseInt(value, 10),
                visited: false,
                totalRisk: columnIndex == 0 && rowIndex == 0 ? 0 : Number.POSITIVE_INFINITY,
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
            }
        });
        currentVertex.visited = true;
    }
}
console.log('==============================\n');
