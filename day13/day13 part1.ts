const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

let dots = convertRawInputTextToDots('day13/day13 input.txt');

foldMapAlongX(655);

console.log('number of dots left:', dots.length);

console.log('\ntotal ms: ', performance.now() - startMS);

// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface dot {
    x: number;
    y: number;
}

function convertRawInputTextToDots(fileName: string): dot[] {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    let dots: dot[] = [];

    for (let row of textRows) {
        let [x, y] = row.split(',');
        let newDot = {
            x: parseInt(x, 10),
            y: parseInt(y, 10),
        };
        dots.push(newDot);
    }

    return dots;
}

function findDotsBelowLine(lineY: number): dot[] {
    return dots.filter((dot) => dot.y > lineY);
}

function findDotsRightOfLine(lineX: number): dot[] {
    return dots.filter((dot) => dot.x > lineX);
}

function findDot(x: number, y: number): dot | undefined {
    return dots.find((coordinate) => coordinate.x == x && coordinate.y == y);
}

function removeDotFromMap(dot: dot): void {
    let dotIndex = dots.indexOf(dot);
    dots.splice(dotIndex, 1);
}

function foldMapAlongY(lineY: number): void {
    let dotsBelowLine = findDotsBelowLine(lineY);
    for (let dot of dotsBelowLine) {
        let newY = lineY - (dot.y - lineY);

        let dotAtNewCoordinates = findDot(dot.x, newY);
        if (dotAtNewCoordinates === undefined) {
            dot.y = newY;
        } else {
            removeDotFromMap(dot);
        }
    }
}

function foldMapAlongX(lineX: number): void {
    let dotsRightOfLine = findDotsRightOfLine(lineX);
    for (let dot of dotsRightOfLine) {
        let newX = lineX - (dot.x - lineX);

        let dotAtNewCoordinates = findDot(newX, dot.y);
        if (dotAtNewCoordinates === undefined) {
            dot.x = newX;
        } else {
            removeDotFromMap(dot);
        }
    }
}

console.log('==============================\n');
