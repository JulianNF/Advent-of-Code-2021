"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// console.log('mapNodes:', caves);
// removeDeadendCavesAndConnectionsToThem(caves);
// console.log('useful caves:', caves);
// let paths = findAllPathsThroughCaves();
// console.log('total paths:', paths.length - 1);
// console.log('\ntotal ms: ', performance.now() - startMS);
let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
for (let i = 0; i < 10000; i++) {
    removeDeadendCavesAndConnectionsToThem(caves);
    let paths = findAllPathsThroughCaves();
}
console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);
function convertRawInputTextToCaveNodeObject(fileName) {
    const rawText = (0, fs_1.readFileSync)(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let mapNodes = {};
    for (let row of textRows) {
        let nodes = row.split('-');
        let firstNode = nodes[0];
        let secondNode = nodes[1];
        if (!mapNodes.hasOwnProperty(firstNode)) {
            mapNodes[firstNode] = [secondNode];
        }
        else if (mapNodes[firstNode].indexOf(secondNode) < 0) {
            mapNodes[firstNode].push(secondNode);
        }
        if (!mapNodes.hasOwnProperty(secondNode)) {
            mapNodes[secondNode] = [firstNode];
        }
        else if (mapNodes[secondNode].indexOf(firstNode) < 0) {
            mapNodes[secondNode].push(firstNode);
        }
    }
    return mapNodes;
}
function isBigCave(caveName) {
    return caveName.toUpperCase() == caveName;
}
function isSmallCave(caveName) {
    return caveName.toUpperCase() != caveName;
}
function removeAllConnectionsToCave(caveName, caves) {
    Object.values(caves).forEach((caveConnections) => {
        if (caveConnections.indexOf(caveName) > 0) {
            caveConnections.splice(caveConnections.indexOf(caveName), 1);
        }
    });
}
function isDeadendCave(caveName) {
    if (isBigCave(caveName))
        return false;
    if (caveName == 'start')
        return false;
    if (caveName == 'end')
        return false;
    if (caves[caveName].length > 1)
        return false;
    if (isBigCave(caves[caveName][0]))
        return false;
    return true;
}
function removeDeadendCavesAndConnectionsToThem(caves) {
    Object.keys(caves).forEach((caveName) => {
        if (isDeadendCave(caveName)) {
            removeAllConnectionsToCave(caveName, caves);
            delete caves[caveName];
        }
    });
}
function defineStartingPaths() {
    let startingPaths = [[]];
    caves.start.forEach((cave, i) => {
        startingPaths[i] = ['start', cave];
    });
    return startingPaths;
}
function findAllPathsThroughCaves() {
    let finishedPaths = [[]];
    let ongoingPaths = defineStartingPaths();
    while (ongoingPaths.length > 0) {
        ongoingPaths.forEach((path, pathIndex) => {
            let currentCave = path[path.length - 1];
            let nextCaves = caves[currentCave];
            nextCaves.forEach((nextCave) => {
                if (isSmallCave(nextCave) && path.indexOf(nextCave) > -1) {
                    return;
                }
                else if (nextCave == 'end') {
                    finishedPaths.push([...path, nextCave]);
                }
                else {
                    ongoingPaths.push([...path, nextCave]);
                }
            });
            ongoingPaths.splice(pathIndex, 1);
        });
        // console.log('\nFinished paths:', finishedPaths);
    }
    return finishedPaths;
}
console.log('==============================\n');
