const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

interface Point {
    x: number;
    y: number;
}

// -------

const depthMap = convertRawInputTextToDepthMap('day09/day09 input.txt');
const lowPoints = findLowPointsInMap(depthMap);
const sizesOfThreeLargestBasins = findThreeLargestBasins(lowPoints, depthMap);
console.log('sizes of three largest basins:', sizesOfThreeLargestBasins);
const multipleOf3LargestBasins = sizesOfThreeLargestBasins[0] * sizesOfThreeLargestBasins[1] * sizesOfThreeLargestBasins[2];
console.log('multipleOf3LargestBasins:', multipleOf3LargestBasins);

console.log('\ntotal ms, 1 run: ', performance.now() - startMS);

// const depthMap = convertRawInputTextToDepthMap('day09/day09 input.txt');
// for (let i = 0; i < 10000; i++) {
//     let lowPoints = findLowPointsInMap(depthMap);
//     let sizesOfThreeLargestBasins = findThreeLargestBasins(lowPoints, depthMap);
//     let multipleOf3LargestBasins = sizesOfThreeLargestBasins[0] * sizesOfThreeLargestBasins[1] * sizesOfThreeLargestBasins[2];
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// -------

function convertRawInputTextToDepthMap(fileName: string): number[][] {
    const rawText = readFileSync(fileName, 'utf-8');
    const textRows = rawText.replace(/\r\n/g, '\n').split('\n'); // Regex to account for possbility of IDE being set to CRLF instead of LF end of lines

    let depthMap: number[][] = [];
    for (let row of textRows) {
        depthMap.push(row.split('').map((character) => parseInt(character, 10)));
    }

    return depthMap;
}

function isLowPoint(point: Point, map: number[][]): boolean {
    const value = getPointValue(point, map);

    if (value == 0) return true;
    if (value == 9) return false;

    let valueLeft = 9;
    if (point.x > 0) valueLeft = map[point.y][point.x - 1];
    if (value >= valueLeft) return false;

    let valueRight = 9;
    const maxX = map[0].length - 1;
    if (point.x < maxX) valueRight = map[point.y][point.x + 1];
    if (value >= valueRight) return false;

    let valueUp = 9;
    if (point.y > 0) valueUp = map[point.y - 1][point.x];
    if (value >= valueUp) return false;

    let valueDown = 9;
    const maxY = map.length - 1;
    if (point.y < maxY) valueDown = map[point.y + 1][point.x];
    if (value >= valueDown) return false;

    return true;
}

function findLowPointsInMap(map: number[][]): Point[] {
    let lowPoints: Point[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let point = { x: x, y: y };
            if (isLowPoint(point, map)) {
                lowPoints.push(point);
            }
        }
    }
    return lowPoints;
}

function getAdjacentPoints(point: Point, map: number[][]): Point[] {
    let adjacentPoints: Point[] = [];

    const maxX = map[0].length - 1;
    if (point.x > 0) adjacentPoints.push({ x: point.x - 1, y: point.y });
    if (point.x < maxX) adjacentPoints.push({ x: point.x + 1, y: point.y });

    const maxY = map.length - 1;
    if (point.y > 0) adjacentPoints.push({ x: point.x, y: point.y - 1 });
    if (point.y < maxY) adjacentPoints.push({ x: point.x, y: point.y + 1 });

    return adjacentPoints;
}

function getPointValue(point: Point, map: number[][]): number {
    return map[point.y][point.x];
}

function isPointInPointArray(point: Point, pointArray: Point[]): boolean {
    return pointArray.some((element) => element.x == point.x && element.y == point.y);
}

function getPointsInBasin(lowPoint: Point, map: number[][]): Point[] {
    let pointsInBasin: Point[] = [lowPoint];
    let pointsToTest: Point[] = [...getAdjacentPoints(lowPoint, map)];

    while (pointsToTest.length > 0) {
        let newPointsToTest: Point[] = [];

        for (let i = pointsToTest.length - 1; i >= 0; i--) {
            const point = pointsToTest[i];
            const pointValue = getPointValue(point, map);

            if (pointValue == 0 || pointValue == 9) {
                pointsToTest.pop();
                continue;
            }

            let adjacentPointsAlreadyInBasin: Point[] = [];
            let adjacentPointsNotCurrentlyInBasin: Point[] = [];
            const adjacentPoints = getAdjacentPoints(point, map);
            for (let adjacentPoint of adjacentPoints) {
                isPointInPointArray(adjacentPoint, pointsInBasin) ? adjacentPointsAlreadyInBasin.push(adjacentPoint) : adjacentPointsNotCurrentlyInBasin.push(adjacentPoint);
            }

            for (let adjacentPointAlreadyInBasin of adjacentPointsAlreadyInBasin) {
                let adjacentPointValue = getPointValue(adjacentPointAlreadyInBasin, map);
                if (pointValue > adjacentPointValue) {
                    pointsInBasin.push(point);
                    adjacentPointsNotCurrentlyInBasin.forEach((point) => newPointsToTest.push(point));
                    break;
                }
            }
            pointsToTest.pop();
        }

        newPointsToTest.forEach((point) => {
            if (!isPointInPointArray(point, pointsInBasin) && !isPointInPointArray(point, pointsToTest)) {
                pointsToTest.push(point);
            }
        });
    }

    return pointsInBasin;
}

function findThreeLargestBasins(lowPoints: Point[], map: number[][]): number[] {
    let basinSizes: number[] = [];
    for (let lowPoint of lowPoints) {
        let pointsInBasin = getPointsInBasin(lowPoint, map);
        basinSizes.push(pointsInBasin.length);
    }

    basinSizes.sort((a, b) => b - a);
    let threeLargestBasins = basinSizes.slice(0, 3);
    return threeLargestBasins;
}

console.log('==============================\n');
