"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------
const lines = convertRawInputTextToLineArrays('day10 input.txt');
const uncorruptedLines = getUncorruptedLinesIn(lines);
console.log('total completion points:', calculateFinalStringCompletionScoreForIncompleteLines(uncorruptedLines));
console.log('\ntotal ms: ', performance.now() - startMS);
// const lines = convertRawInputTextToLineArrays('day10 input.txt');
// for (let i = 0; i < 10000; i++) {
//     getTotalSyntaxErrorPoints(lines);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
// ------
function convertRawInputTextToLineArrays(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let lineArray = [];
    for (let row of textRows) {
        lineArray.push(row.split(''));
    }
    return lineArray;
}
function isLineCorrupted(line) {
    const openings = ['[', '(', '{', '<'];
    const closings = [']', ')', '}', '>'];
    let recordedOpenings = [];
    for (let char of line) {
        let isOpeningChar = openings.includes(char);
        if (isOpeningChar) {
            recordedOpenings.push(char);
        }
        else {
            let matchingOpeningChar = openings[closings.indexOf(char)];
            let nextOpeningCharToClose = recordedOpenings.pop();
            if (nextOpeningCharToClose != matchingOpeningChar) {
                return true;
            }
        }
    }
    return false;
}
function getUncorruptedLinesIn(lines) {
    let uncorruptedLines = [];
    for (let line of lines) {
        if (!isLineCorrupted(line)) {
            uncorruptedLines.push(line);
        }
    }
    return uncorruptedLines;
}
function getMissingCharsOfIncompleteLine(line) {
    const openings = ['[', '(', '{', '<'];
    const closings = [']', ')', '}', '>'];
    let recordedOpeningChars = [];
    for (let char of line) {
        let isOpeningChar = openings.includes(char);
        isOpeningChar ? recordedOpeningChars.push(char) : recordedOpeningChars.pop();
    }
    let missingChars = recordedOpeningChars.reverse().map((char) => closings[openings.indexOf(char)]);
    return missingChars;
}
function calculateStringCompletionScoreForIncompleteLine(incompleteLine) {
    const points = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };
    const missingChars = getMissingCharsOfIncompleteLine(incompleteLine);
    let pointsSum = 0;
    for (let char of missingChars) {
        pointsSum *= 5;
        pointsSum += points[char];
    }
    return pointsSum;
}
function calculateFinalStringCompletionScoreForIncompleteLines(incompleteLines) {
    let pointScores = [];
    for (let incompleteLine of incompleteLines) {
        pointScores.push(calculateStringCompletionScoreForIncompleteLine(incompleteLine));
    }
    pointScores.sort((a, b) => a - b);
    let middleIndex = pointScores.length / 2 - 0.5;
    return pointScores[middleIndex];
}
console.log('==============================\n');
