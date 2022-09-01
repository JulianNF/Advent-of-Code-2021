"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let caves = [];
convertRawInputTextToCaves('day12/day12 input.txt');
console.log('numberOfPossiblePaths:', countAllPossiblePathsThroughCaves());
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToCaves(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    for (let row of textRows) {
        let [nameOfFirstCave, nameOfSecondCave] = row.split('-');
        processCaveAndItsConnection(nameOfFirstCave, nameOfSecondCave);
        processCaveAndItsConnection(nameOfSecondCave, nameOfFirstCave);
    }
}
function isBigCave(caveName) {
    return caveName.toUpperCase() === caveName;
}
function findCave(caveName) {
    return caves.find((cave) => cave.name == caveName);
}
function processCaveAndItsConnection(firstCaveName, secondCaveName) {
    let firstCave = findCave(firstCaveName);
    if (!firstCave) {
        let newCave = {
            name: firstCaveName,
            isBigCave: isBigCave(firstCaveName),
            connections: [secondCaveName],
        };
        caves.push(newCave);
    }
    else if (firstCave.connections.indexOf(secondCaveName) < 0) {
        firstCave.connections.push(secondCaveName);
    }
}
function smallCaveCanBeAddedToPath(newCaveName, path) {
    let resultingPath = [...path, newCaveName];
    let smallCavesInResultingPath = resultingPath.filter((caveName) => {
        let cave = findCave(caveName);
        return (cave === null || cave === void 0 ? void 0 : cave.isBigCave) !== true && (cave === null || cave === void 0 ? void 0 : cave.name) !== 'start' && (cave === null || cave === void 0 ? void 0 : cave.name) !== 'end';
    });
    smallCavesInResultingPath.sort();
    let countOfSmallCavesVisitedTwice = 0;
    for (let i = 0; i < smallCavesInResultingPath.length; i++) {
        if (smallCavesInResultingPath[i] == smallCavesInResultingPath[i + 1])
            countOfSmallCavesVisitedTwice++;
    }
    return countOfSmallCavesVisitedTwice > 1 ? false : true;
}
function countAllPossiblePathsThroughCaves() {
    let numberOfFinishedPaths = 0;
    let ongoingPaths = [['start']];
    while (ongoingPaths.length > 0) {
        ongoingPaths.forEach((path, pathIndex) => {
            let currentLastCaveInPath = path[path.length - 1];
            let thisCave = findCave(currentLastCaveInPath);
            if (thisCave !== undefined) {
                thisCave.connections.forEach((connectedCaveName) => {
                    let connectedCave = findCave(connectedCaveName);
                    if (connectedCave !== undefined) {
                        if (connectedCaveName == 'start') {
                            // Do nothing
                        }
                        else if (connectedCave.name == 'end') {
                            numberOfFinishedPaths++;
                        }
                        else if (connectedCave.isBigCave) {
                            ongoingPaths.push([...path, connectedCave.name]);
                        }
                        else if (smallCaveCanBeAddedToPath(connectedCave.name, path)) {
                            ongoingPaths.push([...path, connectedCave.name]);
                        }
                    }
                });
            }
            ongoingPaths.splice(pathIndex, 1);
        });
    }
    return numberOfFinishedPaths;
}
console.log('==============================\n');
