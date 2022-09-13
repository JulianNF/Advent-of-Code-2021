"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
const octoGrid = convertRawInputTextToLineArrays('day11/day11 input.txt');
console.log('first synchronization at:', findFirstStepWhenAllOctopiAreSynchronized(octoGrid));
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToLineArrays(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let lineArray = [];
    for (let row of textRows) {
        lineArray.push(row.split('').map((char) => parseInt(char, 10)));
    }
    return lineArray;
}
function getAdjacentPoints(point, octopusGrid) {
    let adjacentPoints = [];
    const maxX = octopusGrid[0].length - 1;
    const maxY = octopusGrid.length - 1;
    if (point.x > 0 && point.y > 0)
        adjacentPoints.push({ x: point.x - 1, y: point.y - 1 });
    if (point.x > 0)
        adjacentPoints.push({ x: point.x - 1, y: point.y });
    if (point.x > 0 && point.y < maxY)
        adjacentPoints.push({ x: point.x - 1, y: point.y + 1 });
    if (point.y < maxY)
        adjacentPoints.push({ x: point.x, y: point.y + 1 });
    if (point.x < maxX && point.y < maxY)
        adjacentPoints.push({ x: point.x + 1, y: point.y + 1 });
    if (point.x < maxX)
        adjacentPoints.push({ x: point.x + 1, y: point.y });
    if (point.x < maxX && point.y > 0)
        adjacentPoints.push({ x: point.x + 1, y: point.y - 1 });
    if (point.y > 0)
        adjacentPoints.push({ x: point.x, y: point.y - 1 });
    return adjacentPoints;
}
function getValueAtPointInGrid(point, octopusGrid) {
    return octopusGrid[point.y][point.x];
}
function increaseAllOctopusEnergyValuesByOne(octopusGrid) {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            octopusGrid[y][x] += 1;
        }
    }
}
function octopusNeedsToFlash(point, octopusGrid) {
    let value = getValueAtPointInGrid(point, octopusGrid);
    return value > 9 && value < 1000000000;
}
function flashOctopus(point, octopusGrid) {
    octopusGrid[point.y][point.x] += 1000000000;
    increaseValueOfAdjacentOctopi(point, octopusGrid);
}
function increaseValueOfAdjacentOctopi(point, octopusGrid) {
    let adjacentPoints = getAdjacentPoints(point, octopusGrid);
    for (let adjacentPoint of adjacentPoints) {
        octopusGrid[adjacentPoint.y][adjacentPoint.x] += 1;
    }
}
function countFlashedOctopi(octopusGrid) {
    let flashedOctopi = 0;
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            if (octopusGrid[y][x] > 9) {
                flashedOctopi += 1;
            }
        }
    }
    return flashedOctopi;
}
function atLeastOneOctopusNeedsToFlash(octopusGrid) {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            if (octopusNeedsToFlash({ x: x, y: y }, octopusGrid)) {
                return true;
            }
        }
    }
    return false;
}
function resetFlashedOctopiEnergyLevels(octopusGrid) {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            let value = getValueAtPointInGrid({ x: x, y: y }, octopusGrid);
            if (value > 9) {
                octopusGrid[y][x] = 0;
            }
        }
    }
}
function cascadeOctopusFlashesOnce(octopusGrid) {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            let point = { x: x, y: y };
            if (octopusNeedsToFlash(point, octopusGrid)) {
                flashOctopus(point, octopusGrid);
            }
        }
    }
}
function stepOctopusEnergyLevelsOnce(octopusGrid) {
    increaseAllOctopusEnergyValuesByOne(octopusGrid);
    while (atLeastOneOctopusNeedsToFlash(octopusGrid)) {
        cascadeOctopusFlashesOnce(octopusGrid);
    }
}
function findFirstStepWhenAllOctopiAreSynchronized(octopusGrid) {
    const numberOfPointsInGrid = octopusGrid.length * octopusGrid[0].length;
    let stepCounter = 0;
    while (true) {
        stepOctopusEnergyLevelsOnce(octopusGrid);
        stepCounter += 1;
        if (countFlashedOctopi(octopusGrid) == numberOfPointsInGrid) {
            break;
        }
        resetFlashedOctopiEnergyLevels(octopusGrid);
    }
    return stepCounter;
}
console.log('==============================\n');
