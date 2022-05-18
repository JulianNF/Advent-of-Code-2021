const startMS = performance.now();

const testFish = [3, 4, 3, 1, 2];

const fish = [
  1, 1, 3, 1, 3, 2, 1, 3, 1, 1, 3, 1, 1, 2, 1, 3, 1, 1, 3, 5, 1, 1, 1, 3, 1, 2,
  1, 1, 1, 1, 4, 4, 1, 2, 1, 2, 1, 1, 1, 5, 3, 2, 1, 5, 2, 5, 3, 3, 2, 2, 5, 4,
  1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 5, 1, 2, 4, 3, 2, 2, 2, 2, 1, 4, 1, 1, 5, 1, 3,
  4, 4, 1, 1, 3, 3, 5, 5, 3, 1, 3, 3, 3, 1, 4, 2, 2, 1, 3, 4, 1, 4, 3, 3, 2, 3,
  1, 1, 1, 5, 3, 1, 4, 2, 2, 3, 1, 3, 1, 2, 3, 3, 1, 4, 2, 2, 4, 1, 3, 1, 1, 1,
  1, 1, 2, 1, 3, 3, 1, 2, 1, 1, 3, 4, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 4, 1, 5,
  3, 1, 1, 3, 2, 1, 1, 3, 1, 1, 1, 5, 4, 3, 3, 5, 1, 3, 4, 3, 3, 1, 4, 4, 1, 2,
  1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 5, 1, 1, 2, 1, 5, 2, 1, 1, 2, 3, 2, 3, 1,
  3, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 1, 3, 4, 5, 3, 1, 4, 1, 1, 4, 1, 4, 1, 1, 1,
  4, 5, 1, 1, 1, 4, 1, 3, 2, 2, 1, 1, 2, 3, 1, 4, 3, 5, 1, 5, 1, 1, 4, 5, 5, 1,
  1, 3, 3, 1, 1, 1, 1, 5, 5, 3, 3, 2, 4, 1, 1, 1, 1, 1, 5, 1, 1, 2, 5, 5, 4, 2,
  4, 4, 1, 1, 3, 3, 1, 5, 1, 1, 1, 1, 1, 1,
];

function groupFishInSchoolByAge(schoolOfFish) {
  // Index 0 is number of fish of age zero. Index 8 is number of fish of age eight.
  let fishCountByAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let fish of schoolOfFish) fishCountByAge[fish] += 1;
  return fishCountByAge;
}

function updateFishCountByAgeByOneDay(fishCountByAge) {
  let numberOfFishOfAgeZero = fishCountByAge.shift(); // NB: .shift() returns first value AND mutates source array by removing the first value
  fishCountByAge.push(numberOfFishOfAgeZero);
  fishCountByAge[6] += numberOfFishOfAgeZero;
  return fishCountByAge;
}

function updateFishCountByAgeAfterXDays(initialFishCountByAge, days) {
  let fishCountByAge = initialFishCountByAge;
  for (let i = 0; i < days; i++) {
    schoolOfFish = updateFishCountByAgeByOneDay(fishCountByAge);
  }
  return fishCountByAge;
}

function countFishInSchool(fishCountByAge) {
  let fishCount = 0;
  for (let fish of fishCountByAge) {
    fishCount += fish;
  }
  return fishCount;
}

// let fishCountByAge = countFishByAge(testFish);
let fishCountByAge = groupFishInSchoolByAge(fish);
console.log("fish ages at start:", fishCountByAge);
let finalFishCountByAge = updateFishCountByAgeAfterXDays(fishCountByAge, 256);
console.log("final fish ages:", finalFishCountByAge);
console.log("fishCount:", countFishInSchool(finalFishCountByAge));

console.log("\ntotal ms, average for 10000 runs: ", (performance.now() - startMS) / 10000);
console.log("==============================\n");
