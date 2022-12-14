"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let polymerTemplate = '';
let insertionRules = {};
let longestRule;
convertInputTextToTemplateAndInsertionRules('day14/day14 input.txt');
console.log('insertionRules:', insertionRules);
extendInitialRuleSet(2);
console.log('insertionRulessss:', insertionRules);
// let resultingPolymer = repeatedlyInsertPolymersIntoTemplate(polymerTemplate, 10);
// console.log(findQuantityDifferenceBetweenLeastAndMostCommonElementsInPolymer(resultingPolymer));
console.log('\ntotal ms: ', performance.now() - startMS);
function convertInputTextToTemplateAndInsertionRules(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    polymerTemplate = textRows[0];
    for (let i = 2; i < textRows.length; i++) {
        let initialPair = textRows[i][0] + textRows[i][1];
        let result = textRows[i][0] + textRows[i][6] + textRows[i][1];
        let newRule = {
            rootPair: initialPair,
            result: result,
        };
        insertionRules[initialPair] = newRule;
    }
}
function extendInitialRuleSet(loops) {
    for (let i = 1; i <= loops; i++) {
        for (let rule in insertionRules) {
            let newPolymer = insertElementsIntoPolymer(rule);
            addPolymerInsertionRule(newPolymer);
        }
    }
}
function addPolymerInsertionRule(newPolymer) {
    let newRule = {
        rootPair: newPolymer[0] + newPolymer[newPolymer.length - 1],
        result: insertElementsIntoPolymer(newPolymer),
    };
    insertionRules[newPolymer] = newRule;
}
// IDEA! We can ignore the first and last elements of a polymer resulting from a starting pair, because those are the starting pair
function insertElementsIntoPolymer(startPolymer) {
    let newPolymer = '';
    console.log('start polymer is:', startPolymer);
    for (let i = 0; i < startPolymer.length - 1; i++) {
        let polymerA = startPolymer[i];
        let polymerB = startPolymer[i + 1];
        console.log('\tpolymerA:', polymerA, 'and polymerB:', polymerB);
        newPolymer += polymerA + insertionRules[polymerA + polymerB];
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
