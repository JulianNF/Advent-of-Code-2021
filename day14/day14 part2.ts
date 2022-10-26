const startMS = performance.now();
import { count } from 'console';
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

let polymerTemplate: string = '';
let insertionRules: insertionRules = {};
let longestRule: number;
convertInputTextToTemplateAndInsertionRules('day14/day14 input.txt');

console.log('insertionRules:', insertionRules);

extendInitialRuleSet(2);
console.log('insertionRulessss:', insertionRules);

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
    rootPair: string;
    result: string;
}

// build a huge set of rules, with long-ass names
// when you do, add that valid result to ANY polymer with the same 'roots', and update its best result
// then, based on the biggest/longest polymer number we have, I can search for the biggest rule matching the next set of string, a la rules[longestnextstringpossible]? -> gimme the "furthest along" answer we have for it - else, try rules[logestnextstringminusonelement] and so forth, until we're working with the biggest rule result we have

interface insertionRules {
    [key: string]: insertionRule;
}

function convertInputTextToTemplateAndInsertionRules(fileName: string): void {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    polymerTemplate = textRows[0];

    for (let i = 2; i < textRows.length; i++) {
        let initialPair = textRows[i][0] + textRows[i][1];
        let result = textRows[i][0] + textRows[i][6] + textRows[i][1];

        let newRule: insertionRule = {
            rootPair: initialPair,
            result: result,
        };

        insertionRules[initialPair] = newRule;
    }
}

function extendInitialRuleSet(loops: number): void {
    for (let i = 1; i <= loops; i++) {
        for (let rule in insertionRules) {
            let newPolymer = insertElementsIntoPolymer(rule);
            addPolymerInsertionRule(newPolymer);
        }
    }
}

function addPolymerInsertionRule(newPolymer: string): void {
    let newRule: insertionRule = {
        rootPair: newPolymer[0] + newPolymer[newPolymer.length - 1],
        result: insertElementsIntoPolymer(newPolymer),
    };
    insertionRules[newPolymer] = newRule;
}

// IDEA! We can ignore the first and last elements of a polymer resulting from a starting pair, because those are the starting pair

function insertElementsIntoPolymer(startPolymer: string): string {
    let newPolymer: string = '';
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
