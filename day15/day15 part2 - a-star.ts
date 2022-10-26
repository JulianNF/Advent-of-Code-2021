const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

const rawInput = readFileSync('day15/day15 input.txt', 'utf-8');
const textRows = splitTextIntoRows(rawInput, '\n');
let expandedTextRows = expandInputTextLeftAndDownNTimes(textRows, 5);
console.log('rows expanded in', performance.now() - startMS, 'ms');

const graphWidth = getGraphWidth(expandedTextRows);
const graphHeight = getGraphHeight(expandedTextRows);

let riskGraph = generateInitialRiskGraph(expandedTextRows);
console.log('initial risk graph generated in', performance.now() - startMS, 'ms');
const startVertex = findVertexById('0,0');
const finishVertex = findVertexById(generateVertexId(graphWidth - 1, graphHeight - 1));

console.log('lowest risk path is:', calculateLowestRiskFromStartToFinish(startVertex, finishVertex, riskGraph));
// riskGraph.forEach((vertex) => {
//     console.log('vertex', vertex.id, '\trisk:', vertex.risk, 'tRisk:', vertex.totalRisk, 'dist:', vertex.distanceToEnd, 'cost:', vertex.totalRisk + vertex.distanceToEnd, 'visit?:', vertex.visited);
// });

console.log(
    'visited',
    riskGraph.reduce((total, vertex) => (vertex.visited === true ? (total += 1) : total), 0),
    '/',
    riskGraph.length
);

console.log('\ntotal ms: ', performance.now() - startMS);
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface vertex {
    id: string;
    visited: boolean;
    x: number;
    y: number;
    risk: number;
    totalRisk: number;
    distanceToEnd: number;
    // bestPath: string[];
}

function generateVertexId(x: number, y: number): string {
    return x + ',' + y;
}

function splitTextIntoRows(text: string, delimiter: string): string[] {
    // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    return text.replace(/\r\n/g, '\n').split(delimiter);
}

function generateNewRiskValue(integerString: string, incrementBy: number): string {
    let newValue = parseInt(integerString, 10) + incrementBy;
    let adjustedValue = newValue > 9 ? newValue - 9 : newValue;
    return adjustedValue.toString();
}

function expandInputTextLeftAndDownNTimes(originalTextRows: string[], repeatCount: number): string[] {
    let expandedInitialTextRows: string[] = [];
    originalTextRows.forEach((textRow) => {
        let initialRowChars = textRow.split('');
        let expandedTextRow = [...initialRowChars];
        for (let i = 1; i < repeatCount; i++) {
            expandedTextRow.push(...initialRowChars.map((char) => generateNewRiskValue(char, i)));
        }
        expandedInitialTextRows.push(expandedTextRow.join(''));
    });

    let expandedText: string[] = [...expandedInitialTextRows];
    for (let i = 1; i < repeatCount; i++) {
        expandedInitialTextRows.forEach((textRow) => {
            let rowChars = textRow.split('');
            let newRow: string[] = [];
            newRow = [...rowChars.map((char) => generateNewRiskValue(char, i))];
            expandedText.push(newRow.join(''));
        });
    }

    return expandedText;
}

function getGraphWidth(textRows: string[]): number {
    return textRows[0].length;
}

function getGraphHeight(textRows: string[]): number {
    return textRows.length;
}

function stepsToEndFrom(startX: number, startY: number): number {
    return graphWidth - 1 - startX + (graphHeight - 1 - startY);
}

function generateInitialRiskGraph(textRows: string[]): vertex[] {
    let riskGraph: vertex[] = [];
    for (let [rowIndex, row] of textRows.entries()) {
        row.split('').forEach((value, columnIndex) => {
            riskGraph.push({
                id: generateVertexId(columnIndex, rowIndex),
                visited: false,
                x: columnIndex,
                y: rowIndex,
                risk: parseInt(value, 10),
                totalRisk: Number.POSITIVE_INFINITY,
                distanceToEnd: stepsToEndFrom(columnIndex, rowIndex),
                // bestPath: columnIndex == 0 && rowIndex == 0 ? ['0,0'] : []
            });
        });
    }
    return riskGraph;
}

function identifyNextVertexToVisit(): vertex | undefined {
    // A-start shortest path algorithm - heuristic adjustment to priority using distance from a given vertex to finish vertex
    let unvisitedVerteces = riskGraph.filter((vertex) => vertex.visited === false);
    let nextVertex = unvisitedVerteces.reduce((prevVertex, currentVertex) => {
        return currentVertex.totalRisk + currentVertex.distanceToEnd < prevVertex.totalRisk + prevVertex.distanceToEnd ? currentVertex : prevVertex;
    });
    return nextVertex;
}

function findVertexById(id: string): vertex | undefined {
    return riskGraph.find((vertex) => vertex.id == id);
}

function getAdjacentVertexIds(x: number, y: number): string[] {
    let verteces: string[] = [];
    if (x < graphWidth - 1) verteces.push(generateVertexId(x + 1, y));
    if (x > 0) verteces.push(generateVertexId(x - 1, y));

    if (y < graphHeight - 1) verteces.push(generateVertexId(x, y + 1));
    if (y > 0) verteces.push(generateVertexId(x, y - 1));

    return verteces;
}

function getAdjacentVertecesTo(x: number, y: number): vertex[] {
    const adjacentVertexIds = getAdjacentVertexIds(x, y);
    let verteces: vertex[] = [];
    adjacentVertexIds.forEach((id) => {
        let vertex = findVertexById(id);
        if (vertex) verteces.push(vertex);
    });
    return verteces;
}

function calculateLowestRiskFromStartToFinish(startVertex: vertex, endVertex: vertex, graph: vertex[]): number {
    // A-start shortest path algorithm
    startVertex.totalRisk = 0; // The start vertex is considered to have no entering-cost

    let currentVertex: vertex;
    while (currentVertex != finishVertex) {
        currentVertex = identifyNextVertexToVisit();
        let adjacentVerteces = getAdjacentVertecesTo(currentVertex.x, currentVertex.y);

        adjacentVerteces.forEach((adjacentVertex) => {
            if (adjacentVertex.visited === true) return;
            let totalRiskWhenComingFromCurrentVertex = currentVertex.totalRisk + adjacentVertex.risk;
            if (totalRiskWhenComingFromCurrentVertex < adjacentVertex.totalRisk) {
                adjacentVertex.totalRisk = totalRiskWhenComingFromCurrentVertex;
                // adjacentVertex.bestPath = [...currentVertex.bestPath, generateVertexId(adjacentVertex.x, adjacentVertex.y)];
            }
        });

        currentVertex.visited = true;
    }

    return endVertex.totalRisk;
}

console.log('==============================\n');
