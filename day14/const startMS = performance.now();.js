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
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    polymerTemplate = textRows[0];
    for (let i = 2; i < textRows.length; i++) {
        let initialPair = textRows[i][0] + textRows[i][1];
        let result = textRows[i][0] + textRows[i][6] + textRows[i][1];
        let newRule = {
            polymer: initialPair,
            rootPair: initialPair,
            results: [result],
            longestResult: 3,
        };
        insertionRules[initialPair] = newRule;
    }
}
function extendInitialRuleSet(loops) {
    for (let i = 1; i <= loops; i++) {
        for (let rule in insertionRules) {
            addPolymerToInsertionRules(insertionRules[rule].results[0], insertionRules[rule].rootPair);
        }
    }
}
function addPolymerToInsertionRules(newPolymer, rootPair) {
    console.log('newpolymer to add to rules:', newPolymer);
    console.log("newpolymer's rootpair:", rootPair);
    for (let rule in insertionRules) {
        if (insertionRules[rule].rootPair == rootPair) {
            // hmmm, will I want to do a sort, to keep biggest at front? will I want to do an indexOf check before adding to array? the longestResult value will help me hit any index I want, up to the last one, based on which result 'depth' I need at any given time
            insertionRules[rule].results.push(newPolymer);
            insertionRules[rule].longestResult = newPolymer.length;
        }
        console.log('existing rule now:', insertionRules[rule]);
    }
    let newRule = {
        polymer: newPolymer,
        rootPair: rootPair,
        results: [],
        longestResult: 0,
    };
    insertionRules[newPolymer] = newRule;
}
// IDEA! We can ignore the first and last elements of a polymer resulting from a starting pair, because those are the starting pair
function insertElementsIntoPolymer(startPolymer) {
    let newPolymer = insertionRules[startPolymer].results[insertionRules[startPolymer].longestResult - 3];
    addPolymerToInsertionRules(newPolymer, insertionRules[startPolymer].rootPair);
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
