"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------
const lines = convertRawInputTextToLineArrays('day10 input.txt');
console.log(getTotalSyntaxErrorPoints(lines));
// for (let i = 0; i < 10000; i++) {
//     const depthMap = convertRawInputTextToDepthMap('day09 input.txt');
//     const totalRisk = getTotalRiskLevel(depthMap);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
// ------
function convertRawInputTextToLineArrays(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    // NB: With this approach, code runs in ~37ms/run, ~0.741 average/10000 runs:
    let lineArray = [];
    for (let row of textRows) {
        lineArray.push(row.split(''));
    }
    return lineArray;
}
// function isLineCorrupted(line: string[]): boolean {
//     const openings = ['[', '(', '{', '<'];
//     const closings = [']', ')', '}', '>'];
//     let recordedOpenings: string[] = [];
//     for (let char of line) {
//         let isOpeningChar = openings.includes(char);
//         if (isOpeningChar) {
//             recordedOpenings.push(char);
//         } else {
//             let matchingOpening = openings[closings.indexOf(char)];
//             let openingToClose = recordedOpenings.pop();
//             if (openingToClose != matchingOpening) {
//                 return false;
//             }
//         }
//     }
//     return true;
// }
function getSyntaxErrorPointsForLine(line) {
    const openings = ['(', '[', '{', '<'];
    const closings = [')', ']', '}', '>'];
    const points = [3, 57, 1197, 25137];
    let recordedOpeningChars = [];
    for (let char of line) {
        let isOpeningChar = openings.includes(char);
        if (isOpeningChar) {
            recordedOpeningChars.push(char);
        }
        else {
            let charIndex = closings.indexOf(char);
            let matchingOpeningChar = openings[charIndex];
            let nextOpeningCharToClose = recordedOpeningChars.pop();
            if (nextOpeningCharToClose != matchingOpeningChar) {
                return points[charIndex];
            }
        }
    }
    return 0;
}
function getTotalSyntaxErrorPoints(lines) {
    let points = 0;
    for (let line of lines) {
        points += getSyntaxErrorPointsForLine(line);
    }
    return points;
}
console.log('==============================\n');
