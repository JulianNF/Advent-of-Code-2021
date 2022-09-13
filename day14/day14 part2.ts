const startMS = performance.now();
import { count } from 'console';
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

let polymerTemplate: string = '';
let insertionRules: insertionRules = {};
convertRawInputTextToTemplateAndInsertionRules('day14/day14 input.txt');

console.log('insertionRUles:', insertionRules);

generateAdditionalRules();
console.log('insertionRUlessss:', insertionRules);

// let resultingPolymer = repeatedlyInsertPolymersIntoTemplate(polymerTemplate, 10);
// console.log(findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(resultingPolymer));

console.log('\ntotal ms: ', performance.now() - startMS);

// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface insertionRule {
	oneInsertion: string;
	fiveInsertions?: string;
}

interface insertionRules {
	[key: string]: insertionRule
}

function convertRawInputTextToTemplateAndInsertionRules(fileName: string): void {
	const rawText = readFileSync(fileName, 'utf-8');
	const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

	polymerTemplate = textRows[0];

	for (let i = 2; i < textRows.length; i++) {
		let initialPair = textRows[i][0] + textRows[i][1];
		// let result = textRows[i][0] + textRows[i][6] + textRows[i][1];

		let newRule: insertionRule = {
			oneInsertion: textRows[i][0] + textRows[i][6] + textRows[i][1],
			fiveInsertions: undefined,
		};
		insertionRules[initialPair] = newRule;
	}
}

function generate5xInsertionRules(): void {
	for (let rule of Object.keys(insertionRules)) {
		let result = repeatedlyInsertPolymersIntoTemplate(rule, 2);
		console.log('new result:', result);
		insertionRules[rule] = result;
	}
}

function insertElementsIntoPolymer(startPolymer: string): string {
	let newPolymer: string = '';

	for (let i = 0; i < startPolymer.length - 1; i++) {
		let polymerA = startPolymer[i];
		let polymerB = startPolymer[i + 1];
		let currentPair = polymerA + polymerB;
		newPolymer += polymerA + insertionRules[currentPair];
	}
	newPolymer += startPolymer[startPolymer.length - 1];

	return newPolymer;
}

function repeatedlyInsertPolymersIntoTemplate(startPolymer: string, numberOfRepetitions: number): string {
	let polymer = startPolymer;
	for (let i = 1; i <= numberOfRepetitions; i++) {
		polymer = insertElementsIntoPolymer(polymer);
	}
	return polymer;
}

function findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(polymer: string): number {
	let elementCounts: { [key: string]: number } = {};

	for (let element of polymer) {
		elementCounts[element] = (elementCounts[element] || 0) + 1;
	}
	console.log('counts:', elementCounts);

	let counts = Object.values(elementCounts);
	let maxCount = Math.max(...counts);
	let minCount = Math.min(...counts);

	return maxCount - minCount;
}

console.log('==============================\n');
