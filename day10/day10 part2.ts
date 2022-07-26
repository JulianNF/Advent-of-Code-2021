const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

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

function convertRawInputTextToLineArrays(fileName: string): string[][] {
	const rawText = readFileSync(fileName, 'utf-8');
	const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

	let lineArray: string[][] = [];
	for (let row of textRows) {
		lineArray.push(row.split(''));
	}

	return lineArray;
}

function isLineCorrupted(line: string[]): boolean {
	const openings = ['[', '(', '{', '<'];
	const closings = [']', ')', '}', '>'];
	let recordedOpenings: string[] = [];

	for (let char of line) {
		let isOpeningChar = openings.includes(char);
		if (isOpeningChar) {
			recordedOpenings.push(char);
		} else {
			let matchingOpeningChar = openings[closings.indexOf(char)];
			let nextOpeningCharToClose = recordedOpenings.pop();
			if (nextOpeningCharToClose != matchingOpeningChar) {
				return true;
			}
		}
	}
	return false;
}

function getUncorruptedLinesIn(lines: string[][]): string[][] {
	let uncorruptedLines: string[][] = [];
	for (let line of lines) {
		if (!isLineCorrupted(line)) {
			uncorruptedLines.push(line);
		}
	}
	return uncorruptedLines;
}

function getMissingCharsOfIncompleteLine(line: string[]): string[] {
	// Feedback: note that creating these three static variable arrays in the function means that they get created each time the function is called. Better to define them in global scope and use them that way
	const openings = ['[', '(', '{', '<'];
	const closings = [']', ')', '}', '>'];
	let recordedOpeningChars: string[] = [];

	for (let char of line) {
		let isOpeningChar = openings.includes(char);
		isOpeningChar ? recordedOpeningChars.push(char) : recordedOpeningChars.pop();
	}

	let missingChars = recordedOpeningChars.reverse().map((char) => closings[openings.indexOf(char)]);
	return missingChars;
}

function calculateStringCompletionScoreForIncompleteLine(incompleteLine: string[]): number {
	// Feedback: Like above, note that creating this static variable array in the function means that it gets created each time the function is called. Better to define it in global scope
	const points: { [key: string]: number } = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	};

	const missingChars = getMissingCharsOfIncompleteLine(incompleteLine);
	let pointsSum: number = 0;
	for (let char of missingChars) {
		pointsSum *= 5;
		pointsSum += points[char];
	}
	return pointsSum;
}

function calculateFinalStringCompletionScoreForIncompleteLines(incompleteLines: string[][]): number {
	let pointScores: number[] = [];
	for (let incompleteLine of incompleteLines) {
		pointScores.push(calculateStringCompletionScoreForIncompleteLine(incompleteLine));
	}

	pointScores.sort((a, b) => a - b);
	let middleIndex = pointScores.length / 2 - 0.5;
	return pointScores[middleIndex];
}

console.log('==============================\n');
