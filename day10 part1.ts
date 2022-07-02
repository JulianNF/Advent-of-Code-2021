const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------
const lines = convertRawInputTextToLineArrays('day10 input.txt');
console.log(getTotalSyntaxErrorPoints(lines));

// const lines = convertRawInputTextToLineArrays('day10 input.txt');
// for (let i = 0; i < 10000; i++) {
//     getTotalSyntaxErrorPoints(lines);
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
// ------

function convertRawInputTextToLineArrays(fileName: string): string[][] {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    // NB: With this approach, code runs in ~37ms/run, ~0.741 average/10000 runs:
    let lineArray: string[][] = [];
    for (let row of textRows) {
        lineArray.push(row.split(''));
    }

    return lineArray;
}

function getSyntaxErrorPointsForLine(line: string[]): number {
    const openings = ['(', '[', '{', '<'];
    const closings = [')', ']', '}', '>'];
    const points = [3, 57, 1197, 25137];

    let recordedOpeningChars: string[] = [];
    for (let char of line) {
        let isOpeningChar = openings.includes(char);
        if (isOpeningChar) {
            recordedOpeningChars.push(char);
        } else {
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

function getTotalSyntaxErrorPoints(lines: string[][]): number {
    let points: number = 0;
    for (let line of lines) {
        points += getSyntaxErrorPointsForLine(line);
    }

    return points;
}

console.log('==============================\n');
