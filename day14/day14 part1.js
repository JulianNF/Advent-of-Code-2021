"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let polymerTemplate = '';
let insertionRules = {};
convertRawInputTextToTemplateAndInsertionRules('day14/day14 input.txt');
let resultingPolymer = repeatedlyInsertPolymersIntoTemplate(polymerTemplate, insertionRules, 10);
console.log(findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(resultingPolymer));
console.log('\ntotal ms: ', performance.now() - startMS);
// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
// ------------------------------------------------------------ //
function convertRawInputTextToTemplateAndInsertionRules(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    polymerTemplate = textRows[0];
    for (let i = 2; i < textRows.length; i++) {
        let elementPair = textRows[i][0] + textRows[i][1];
        let insertionElement = textRows[i][6];
        insertionRules[elementPair] = insertionElement;
    }
}
function insertElementsIntoPolymer(startPolymer, insertionRules) {
    let newPolymer = '';
    for (let i = 0; i < startPolymer.length - 1; i++) {
        let polymerA = startPolymer[i];
        let polymerB = startPolymer[i + 1];
        let currentPair = polymerA + polymerB;
        newPolymer += polymerA + insertionRules[currentPair];
    }
    newPolymer += startPolymer[startPolymer.length - 1];
    return newPolymer;
}
function repeatedlyInsertPolymersIntoTemplate(startPolymer, insertionRules, numberOfRepetitions) {
    let polymer = startPolymer;
    for (let i = 1; i <= numberOfRepetitions; i++) {
        polymer = insertElementsIntoPolymer(polymer, insertionRules);
    }
    return polymer;
}
// TODO - what about doing that weird idea I had in bed about keeping track of insertions not only with +=1, but also by decreasing all other values -=1 if at most one of the inserted letters has a value of 0
// TODO - be smart and create the initial array based on the letters in the startTemplate + insertions in original rules
function findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(polymer) {
    let elementCounts = {};
    for (let element of polymer) {
        elementCounts[element] = (elementCounts[element] || 0) + 1;
    }
    let counts = Object.values(elementCounts);
    let maxCount = Math.max(...counts);
    let minCount = Math.min(...counts);
    return maxCount - minCount;
}
console.log('==============================\n');
