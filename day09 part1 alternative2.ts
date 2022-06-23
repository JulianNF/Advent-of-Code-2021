const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

interface Point {
    x: number;
    y: number;
}

// -------

const depthMap = convertRawInputTextToDepthMap('day09 input.txt');
const totalRisk = calculateTotalRiskLevel();
console.log('total risk:', totalRisk);
console.log('\ntotal ms, 1 run: ', performance.now() - startMS);

// const depthMap = convertRawInputTextToDepthMap('day09 input.txt');
// for (let i = 0; i < 10000; i++) {
//     const totalRisk = calculateTotalRiskLevel();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// -------

function convertRawInputTextToDepthMap(fileName: string): number[][] {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.split('\n');

    // NB: With this approach, code runs in ~37ms/run, ~0.741 average/10000 runs:
    let depthMap: number[][] = [];
    for (let row of textRows) {
        depthMap.push(row.split('').map((character) => parseInt(character, 10)));
    }

    // NB: With this approach, code runs in ~44ms/run, ~0.782 average/10000 runs:
    // for (let i = 0; i < textRows.length; i++) {
    //     depthMap[i] = [];
    //     for (let j = 0; j < textRows[i].length; j++) {
    //         depthMap[i][j] = parseInt(textRows[i].charAt(j), 10);
    //     }
    // }

    return depthMap;
}

function isLowPoint(point: Point): boolean {
    const value = depthMap[point.y][point.x];

    if (value == 0) return true;
    if (value == 9) return false;

    let valueLeft = 9;
    if (point.x > 0) valueLeft = depthMap[point.y][point.x - 1];
    if (value >= valueLeft) return false;

    let valueRight = 9;
    const maxX = depthMap[0].length - 1;
    if (point.x < maxX) valueRight = depthMap[point.y][point.x + 1];
    if (value >= valueRight) return false;

    let valueUp = 9;
    if (point.y > 0) valueUp = depthMap[point.y - 1][point.x];
    if (value >= valueUp) return false;

    let valueDown = 9;
    const maxY = depthMap.length - 1;
    if (point.y < maxY) valueDown = depthMap[point.y + 1][point.x];
    if (value >= valueDown) return false;

    return true;
}

function calculateTotalRiskLevel(): number {
    let totalRiskLevel: number = 0;
    for (let y = 0; y < depthMap.length; y++) {
        for (let x = 0; x < depthMap[y].length; x++) {
            if (isLowPoint({ x: x, y: y })) {
                const value = depthMap[y][x];
                totalRiskLevel += value + 1;
            }
        }
    }
    return totalRiskLevel;
}

console.log('==============================\n');
