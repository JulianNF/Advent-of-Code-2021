const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

let caves: cave[] = [];
convertRawInputTextToCaves('day12/day12 input.txt');
console.log('numberOfPossiblePaths:', countAllPossiblePathsThroughCaves();

console.log('\ntotal ms: ', performance.now() - startMS);

// let caves = convertRawInputTextToArrayOfCaves('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface cave {
    name: string;
    isBigCave: boolean;
    connections: string[];
}

function convertRawInputTextToCaves(fileName: string): void {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    for (let row of textRows) {
        let [nameOfFirstCave, nameOfSecondCave] = row.split('-');
        processCaveAndItsConnection(nameOfFirstCave, nameOfSecondCave);
        processCaveAndItsConnection(nameOfSecondCave, nameOfFirstCave);
    }
}

function isBigCave(caveName: string): boolean {
    return caveName.toUpperCase() === caveName;
}

function findCave(caveName: string): cave | undefined {
    return caves.find((cave) => cave.name == caveName);
}

function processCaveAndItsConnection(firstCaveName: string, secondCaveName: string): void {
    let firstCave = findCave(firstCaveName);

    if (!firstCave) {
        let newCave = {
            name: firstCaveName,
            isBigCave: isBigCave(firstCaveName),
            connections: [secondCaveName],
        };
        caves.push(newCave);
    } else if (firstCave.connections.indexOf(secondCaveName) < 0) {
        firstCave.connections.push(secondCaveName);
    }
}

function smallCaveCanBeAddedToPath(newCaveName: string, path: string[]) {
    let resultingPath = [...path, newCaveName];
    let smallCavesInResultingPath = resultingPath.filter((caveName) => {
        let cave = findCave(caveName);
        return cave?.isBigCave !== true && cave?.name !== 'start' && cave?.name !== 'end';
    });

    smallCavesInResultingPath.sort();
    let countOfSmallCavesVisitedTwice = 0;
    for (let i = 0; i < smallCavesInResultingPath.length; i++) {
        if (smallCavesInResultingPath[i] == smallCavesInResultingPath[i + 1]) countOfSmallCavesVisitedTwice++;
    }

    return countOfSmallCavesVisitedTwice > 1 ? false : true;
}

function countAllPossiblePathsThroughCaves(): number {
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
                        } else if (connectedCave.name == 'end') {
                            numberOfFinishedPaths++;
                        } else if (connectedCave.isBigCave) {
                            ongoingPaths.push([...path, connectedCave.name]);
                        } else if (smallCaveCanBeAddedToPath(connectedCave.name, path)) {
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
