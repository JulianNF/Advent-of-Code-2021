"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
let caves = convertRawInputTextToArrayOfCaves('day12/day12 input.txt');
console.log('caves:', caves);
let paths = findAllPathsThroughCaves();
console.log('total paths:', paths.length);
console.log('\ntotal ms: ', performance.now() - startMS);
function convertRawInputTextToArrayOfCaves(fileName) {
    const rawText = fs_1.readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines
    let caves = [];
    for (let row of textRows) {
        let [nameOfFirstCave, nameOfSecondCave] = row.split('-');
        // TODO - Refactor this "cave init" into a function, and call it twice, inverting the order of the two caves on the second call
        let firstCaveAlreadyRecorded = caves.find((cave) => cave.name == nameOfFirstCave);
        if (!firstCaveAlreadyRecorded) {
            let newCave = {
                name: nameOfFirstCave,
                isSmallCave: isSmallCave(nameOfFirstCave),
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
                isSmallCave: isSmallCave(nameOfSecondCave),
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
// function resetCaveVisitCountForAllCaves() {
//     caves.forEach(cave => {
//         cave.visitCount = 0;
//     }
// }
// function defineStartingPaths(): [string[]] {
//     let startingPaths: [string[]] = [[]];
//     let startingCave = caves.find((cave) => cave.name == 'start');
//     startingCave?.connections.forEach((connection, i) => {
//         startingPaths[i] = ['start', connection];
//     });
//     return startingPaths;
// }
function caveWasAlreadyVisited(cave, path) {
    let visitCount = 0;
    for (let caveName of path) {
        if (caveName == cave.name)
            visitCount++;
    }
    return visitCount > 0 ? true : false;
}
function smallCaveCanBeAddedToPath(caveName, path) {
    let smallCavesInPath = 1;
    let numberOfSmallCavesInPath = 1;
    let visitCount = 1;
    for (let caveName of path) {
        let cave = caves.find((cave) => cave.name == caveName);
        if (!(cave === null || cave === void 0 ? void 0 : cave.isSmallCave))
            break;
        numberOfSmallCavesInPath++;
        if (caveName == cave.name)
            visitCount++;
    }
    return visitCount > 0 ? true : false;
}
function findAllPathsThroughCaves() {
    // TODO - The requirements are for a count of paths, so don't bother keeping track of the paths; just keep a count of completed paths
    let finishedPaths = [];
    // let ongoingPaths = defineStartingPaths();
    let ongoingPaths = [['start']];
    while (ongoingPaths.length > 0) {
        ongoingPaths.forEach((path, pathIndex) => {
            console.log('\n\npaths now:', ongoingPaths);
            console.log('\tcurrent path:', path);
            let currentCave = caves.find((cave) => cave.name == path[path.length - 1]);
            currentCave === null || currentCave === void 0 ? void 0 : currentCave.connections.forEach((connectedCaveName) => {
                let connectedCave = caves.find((cave) => cave.name == connectedCaveName);
                if (connectedCave !== undefined) {
                    if (connectedCaveName == 'start') {
                        console.log('\t\tchecking cave:', connectedCave.name, '--> skip start cave');
                        return;
                        // } else if (connectedCave?.isSmallCave && path.indexOf(connectedCave?.name) > -1) {
                        //         return;
                    }
                    else if ((connectedCave === null || connectedCave === void 0 ? void 0 : connectedCave.name) == 'end') {
                        console.log('\t\tchecking cave:', connectedCave.name, '--> add finished path ');
                        finishedPaths.push([...path, connectedCave === null || connectedCave === void 0 ? void 0 : connectedCave.name]);
                        console.log('\t\t\tfinished paths now: \n\t\t\t\t', finishedPaths);
                    }
                    else if ((connectedCave === null || connectedCave === void 0 ? void 0 : connectedCave.isSmallCave) == false) {
                        console.log('\t\tchecking cave:', connectedCave.name, '--> big cave -> add path branch via cave');
                        ongoingPaths.push([...path, connectedCave.name]);
                    }
                    else if (smallCaveCanBeAddedToPath(connectedCave.name, path)) {
                        console.log('\t\tchecking cave:', connectedCave === null || connectedCave === void 0 ? void 0 : connectedCave.name, '--> already visited small cave twice');
                        // return;
                        ongoingPaths.push([...path, connectedCave.name]);
                        // } else {
                        //     console.log('\t\tchecking cave:', connectedCave?.name, '--> add path branch via cave');
                        //     ongoingPaths.push([...path, connectedCave.name]);
                    }
                }
            });
            ongoingPaths.splice(pathIndex, 1);
        });
    }
    return finishedPaths;
}
console.log('==============================\n');
