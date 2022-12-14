"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
function convertRawInputTextToDepthMap(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.split('\n');
    // NB: With this approach, code runs in ~37ms/run, ~0.741 average/10000 runs:
    let depthMap = [];
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
function getPointDepthValues(point, map) {
    let depthValues = {
        point: NaN,
        up: NaN,
        down: NaN,
        left: NaN,
        right: NaN,
    };
    const maxX = map[0].length - 1;
    const maxY = map.length - 1;
    depthValues.point = map[point.y][point.x];
    if (point.y > 0)
        depthValues.up = map[point.y - 1][point.x];
    if (point.y < maxY)
        depthValues.down = map[point.y + 1][point.x];
    if (point.x > 0)
        depthValues.left = map[point.y][point.x - 1];
    if (point.x < maxX)
        depthValues.right = map[point.y][point.x + 1];
    return depthValues;
}
function isLowPoint(pointValues) {
    if (pointValues.point == 0)
        return true;
    if (pointValues.point == 9)
        return false;
    if (pointValues.point >= pointValues.up)
        return false;
    if (pointValues.point >= pointValues.down)
        return false;
    if (pointValues.point >= pointValues.left)
        return false;
    if (pointValues.point >= pointValues.right)
        return false;
    return true;
}
function riskLevelOfPoint(pointValue) {
    return pointValue + 1;
}
function getTotalRiskLevel(map) {
    let totalRiskLevel = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let pointData = getPointDepthValues({ x: x, y: y }, map);
            if (isLowPoint(pointData)) {
                totalRiskLevel += riskLevelOfPoint(pointData.point);
            }
        }
    }
    return totalRiskLevel;
}
const depthMap = convertRawInputTextToDepthMap('day09/day09 input.txt');
const totalRisk = getTotalRiskLevel(depthMap);
console.log('total risk:', totalRisk);
console.log('\ntotal ms, 1 run: ', performance.now() - startMS);
// for (let i = 0; i < 10000; i++) {
//     const depthMap = convertRawInputTextToDepthMap('day09 input.txt');
//     const totalRisk = getTotalRiskLevel(depthMap);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
console.log('==============================\n');
