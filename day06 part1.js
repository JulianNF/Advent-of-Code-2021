// const startMS = performance.now();

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

function updateFishPopulationByOneDay(schoolOfFish) {
  let updatedSchoolOfFish = [];
  let newFish = [];

  for (let fish of schoolOfFish) {
    if (fish == 0) {
      updatedSchoolOfFish.push(6);
      newFish.push(8);
    }
    if (fish >= 1) {
      updatedSchoolOfFish.push(fish - 1);
      fish == fish - 1;
    }
  }

  for (let fish of newFish) {
    updatedSchoolOfFish.push(fish);
  }

  return updatedSchoolOfFish;
}

function updateFishPopulationByXDays(initialSchoolOfFish, days) {
  let schoolOfFish = [];
  for (let i in initialSchoolOfFish) {
    schoolOfFish[i] = initialSchoolOfFish[i];
  }

  for (let i = 0; i < days; i++) {
    schoolOfFish = updateFishPopulationByOneDay(schoolOfFish);
  }

  return schoolOfFish;
}

function countFishInSchool(schoolOfFish) {
  return schoolOfFish.length;
}


let finalSchoolOfFish = updateFishPopulationByXDays(fish, 80);
console.log("final school:", finalSchoolOfFish);
console.log("fishCount:", countFishInSchool(finalSchoolOfFish));

// for (let i = 0; i < 10000; i++) {
// 	followInstructions(instructions);
// 	resetOrigin();
// }
// console.log("\ntotal ms, average for 10000 runs: ", (performance.now() - startMS) / 10000);

console.log("==============================\n");
