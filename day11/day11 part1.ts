const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

const octoGrid = convertRawInputTextToLineArrays('day11/day11 input.txt');
console.log('total flashes:', countFlashesAfterXSteps(100, octoGrid));
console.log('\ntotal ms: ', performance.now() - startMS);

// const octoGrid = convertRawInputTextToLineArrays('day11/day11 input.txt');
// for (let i = 0; i < 10000; i++) {
//     countFlashesAfterXSteps(100, octoGrid);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface Point {
    x: number;
    y: number;
}

function convertRawInputTextToLineArrays(fileName: string): number[][] {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    let lineArray: number[][] = [];
    for (let row of textRows) {
        lineArray.push(row.split('').map((char) => parseInt(char, 10)));
    }

    return lineArray;
}

function getAdjacentPoints(point: Point, octopusGrid: number[][]): Point[] {
    let adjacentPoints: Point[] = [];

    const maxX = octopusGrid[0].length - 1;
    const maxY = octopusGrid.length - 1;
    if (point.x > 0 && point.y > 0) adjacentPoints.push({ x: point.x - 1, y: point.y - 1 });
    if (point.x > 0) adjacentPoints.push({ x: point.x - 1, y: point.y });
    if (point.x > 0 && point.y < maxY) adjacentPoints.push({ x: point.x - 1, y: point.y + 1 });
    if (point.y < maxY) adjacentPoints.push({ x: point.x, y: point.y + 1 });
    if (point.x < maxX && point.y < maxY) adjacentPoints.push({ x: point.x + 1, y: point.y + 1 });
    if (point.x < maxX) adjacentPoints.push({ x: point.x + 1, y: point.y });
    if (point.x < maxX && point.y > 0) adjacentPoints.push({ x: point.x + 1, y: point.y - 1 });
    if (point.y > 0) adjacentPoints.push({ x: point.x, y: point.y - 1 });

    return adjacentPoints;
}

function getValueAtPointInGrid(point: Point, octopusGrid: number[][]): number {
    return octopusGrid[point.y][point.x];
}

function increaseAllOctopusEnergyValuesByOne(octopusGrid: number[][]): void {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            octopusGrid[y][x] += 1;
        }
    }
}

function octopusNeedsToFlash(point: Point, octopusGrid: number[][]): boolean {
    let value = getValueAtPointInGrid(point, octopusGrid);
    return value > 9 && value < 1000000000;
}

function flashOctopus(point: Point, octopusGrid: number[][]): void {
    octopusGrid[point.y][point.x] += 1000000000;
    increaseValueOfAdjacentOctopi(point, octopusGrid);
}

function increaseValueOfAdjacentOctopi(point: Point, octopusGrid: number[][]): void {
    let adjacentPoints = getAdjacentPoints(point, octopusGrid);
    for (let adjacentPoint of adjacentPoints) {
        octopusGrid[adjacentPoint.y][adjacentPoint.x] += 1;
    }
}

function countFlashedOctopi(octopusGrid: number[][]): number {
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

function atLeastOneOctopusNeedsToFlash(octopusGrid: number[][]): boolean {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            if (octopusNeedsToFlash({ x: x, y: y }, octopusGrid)) {
                return true;
            }
        }
    }
    return false;
}

function resetFlashedOctopiEnergyLevels(octopusGrid: number[][]): void {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            let value = getValueAtPointInGrid({ x: x, y: y }, octopusGrid);
            if (value > 9) {
                octopusGrid[y][x] = 0;
            }
        }
    }
}

function cascadeOctopusFlashesOnce(octopusGrid: number[][]): void {
    for (let y = 0; y < octopusGrid.length; y++) {
        for (let x = 0; x < octopusGrid[y].length; x++) {
            let point = { x: x, y: y };
            if (octopusNeedsToFlash(point, octopusGrid)) {
                flashOctopus(point, octopusGrid);
            }
        }
    }
}

function stepOctopusEnergyLevelsOnce(octopusGrid: number[][]): void {
    increaseAllOctopusEnergyValuesByOne(octopusGrid);
    while (atLeastOneOctopusNeedsToFlash(octopusGrid)) {
        cascadeOctopusFlashesOnce(octopusGrid);
    }
}

function countFlashesAfterXSteps(stepCount: number, octopusGrid: number[][]): number {
    let flashCount = 0;
    for (let i = 0; i < stepCount; i++) {
        stepOctopusEnergyLevelsOnce(octopusGrid);
        flashCount += countFlashedOctopi(octopusGrid);
        resetFlashedOctopiEnergyLevels(octopusGrid);
    }
    return flashCount;
}

console.log('==============================\n');
