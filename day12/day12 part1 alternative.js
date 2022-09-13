"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let caves = convertRawInputTextToArrayOfCaves('day12/day12 input.txt');
console.log('mapNodes:', caves);
removeDeadendCavesAndConnectionsToThem(caves);
console.log('useful caves:', caves);
let paths = findAllPathsThroughCaves();
console.log('total paths:', paths.length);
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToArrayOfCaves(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let caves = [];
    for (let row of textRows) {
        let [nameOfFirstCave, nameOfSecondCave] = row.split('-');
        let firstCaveAlreadyRecorded = caves.find((cave) => cave.name == nameOfFirstCave);
        if (!firstCaveAlreadyRecorded) {
            let newCave = {
                name: nameOfFirstCave,
                isSmall: isSmallCave(nameOfFirstCave),
                connections: [nameOfSecondCave],
            };
            caves.push(newCave);
        }
        else if (firstCaveAlreadyRecorded.connections.indexOf(nameOfSecondCave) < 0) {
            firstCaveAlreadyRecorded.connections.push(nameOfSecondCave);
        }
        let secondCaveAlreadyRecorded = caves.find((cave) => cave.name == nameOfSecondCave);
        if (!secondCaveAlreadyRecorded) {
            let newCave = {
                name: nameOfSecondCave,
                isSmall: isSmallCave(nameOfSecondCave),
                connections: [nameOfFirstCave],
            };
            caves.push(newCave);
        }
        else if (secondCaveAlreadyRecorded.connections.indexOf(nameOfFirstCave) < 0) {
            secondCaveAlreadyRecorded.connections.push(nameOfFirstCave);
        }
    }
    return caves;
}
function isSmallCave(caveName) {
    return caveName.toUpperCase() != caveName;
}
function removeAllConnectionsToCave(caveToRemove, caves) {
    caves.forEach((cave) => {
        let indexOfCaveToRemove = cave.connections.indexOf(caveToRemove.name);
        if (indexOfCaveToRemove > 0) {
            cave.connections.splice(indexOfCaveToRemove, 1);
        }
    });
}
function isDeadendCave(cave) {
    if (!cave.isSmall)
        return false;
    if (cave.name == 'start')
        return false;
    if (cave.name == 'end')
        return false;
    if (cave.connections.length > 1)
        return false;
    let onlyConnection = caves.find((obj) => obj.name == cave.connections[0]);
    if (onlyConnection !== undefined) {
        if (!onlyConnection.isSmall)
            return false;
    }
    return true;
}
function removeDeadendCavesAndConnectionsToThem(caves) {
    for (let i = caves.length - 1; i >= 0; i--) {
        let cave = caves[i];
        if (isDeadendCave(cave)) {
            removeAllConnectionsToCave(cave, caves);
            caves.splice(i, 1);
        }
    }
}
function defineStartingPaths() {
    let startingPaths = [];
    let startingCave = caves.find((cave) => cave.name == 'start');
    if (startingCave !== undefined) {
        startingCave.connections.forEach((connection, i) => {
            startingPaths[i] = ['start', connection];
        });
    }
    return startingPaths;
}
function findAllPathsThroughCaves() {
    let finishedPaths = [];
    let ongoingPaths = defineStartingPaths();
    while (ongoingPaths.length > 0) {
        ongoingPaths.forEach((path, pathIndex) => {
            let currentCave = caves.find((cave) => cave.name == path[path.length - 1]);
            if (currentCave !== undefined) {
                currentCave.connections.forEach((connectedCaveName) => {
                    let connectedCave = caves.find((cave) => cave.name == connectedCaveName);
                    if (connectedCave !== undefined) {
                        if (connectedCave.isSmall && path.indexOf(connectedCave.name) > -1) {
                            return;
                        }
                        else if (connectedCave.name == 'end') {
                            finishedPaths.push([...path, connectedCave.name]);
                        }
                        else {
                            ongoingPaths.push([...path, connectedCave.name]);
                        }
                    }
                });
            }
            ongoingPaths.splice(pathIndex, 1);
        });
        console.log('\nFinished paths:', finishedPaths);
    }
    return finishedPaths;
}
console.log('==============================\n');
