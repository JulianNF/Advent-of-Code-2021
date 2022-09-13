"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let dots = convertRawInputTextToDots('day13/day13 input.txt');
foldMapAlongX(655);
console.log('number of dots left:', dots.length);
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToDots(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let dots = [];
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
function findDotsBelowLine(lineY) {
    return dots.filter((dot) => dot.y > lineY);
}
function findDotsRightOfLine(lineX) {
    return dots.filter((dot) => dot.x > lineX);
}
function findDot(x, y) {
    return dots.find((coordinate) => coordinate.x == x && coordinate.y == y);
}
function removeDotFromMap(dot) {
    let dotIndex = dots.indexOf(dot);
    dots.splice(dotIndex, 1);
}
function foldMapAlongY(lineY) {
    let dotsBelowLine = findDotsBelowLine(lineY);
    for (let dot of dotsBelowLine) {
        let newY = lineY - (dot.y - lineY);
        let dotAtNewCoordinates = findDot(dot.x, newY);
        if (dotAtNewCoordinates === undefined) {
            dot.y = newY;
        }
        else {
            removeDotFromMap(dot);
        }
    }
}
function foldMapAlongX(lineX) {
    let dotsRightOfLine = findDotsRightOfLine(lineX);
    for (let dot of dotsRightOfLine) {
        let newX = lineX - (dot.x - lineX);
        let dotAtNewCoordinates = findDot(newX, dot.y);
        if (dotAtNewCoordinates === undefined) {
            dot.x = newX;
        }
        else {
            removeDotFromMap(dot);
        }
    }
}
console.log('==============================\n');
