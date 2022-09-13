"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let polymerTemplate = '';
let insertionRules = {};
convertRawInputTextToTemplateAndInsertionRules('day14/day14 input.txt');
console.log('insertionRUles:', insertionRules);
generateAdditionalRules();
console.log('insertionRUlessss:', insertionRules);
// let resultingPolymer = repeatedlyInsertPolymersIntoTemplate(polymerTemplate, 10);
// console.log(findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(resultingPolymer));
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToTemplateAndInsertionRules(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    polymerTemplate = textRows[0];
    for (let i = 2; i < textRows.length; i++) {
        let initialPair = textRows[i][0] + textRows[i][1];
        // let result = textRows[i][0] + textRows[i][6] + textRows[i][1];
        let newRule = {
            x1Insertions: textRows[i][6],
            x5Insertions: undefined,
        };
        insertionRules[initialPair] = newRule;
    }
}
function generate5xInsertionRules() {
    for (let rule of Object.keys(insertionRules)) {
        let result = repeatedlyInsertPolymersIntoTemplate(rule, 2);
        console.log('new result:', result);
        insertionRules[rule] = result;
    }
}
function insertElementsIntoPolymer(startPolymer) {
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
function repeatedlyInsertPolymersIntoTemplate(startPolymer, numberOfRepetitions) {
    let polymer = startPolymer;
    for (let i = 1; i <= numberOfRepetitions; i++) {
        polymer = insertElementsIntoPolymer(polymer);
    }
    return polymer;
}
function findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(polymer) {
    let elementCounts = {};
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
