const startMS = performance.now();

const diagnosticData = [
	"000100011010", "110011110110", "011000101111", "001101100101", "011100001000", "101101011011", "101111010101", "011010000101", "010101000010", "100001111000", "111011111100", "100001001100", "100000001011", "110111110010", "001110010110", "001000001000", "001000000110", "101101101010", "111000111101", "011010111101", "000101100111", "000101000001", "101101101011", "001110010010", "101001100001", "110010100111", "010111100111", "001011010001", "000010011010", "000010010001", "001101100001", "100000001101", "001011010111", "110000010101", "010001001101", "100101011001", "101101111001", "000110001111", "111011110010", "011011111011", "001111111011", "110001010111", "010101101011", "110101101000", "011010111100", "101000110110", "001011110011", "011011101001", "000111010010", "010111010110", "111000100001", "101110000001", "110011111101", "101000011101", "000100010100", "011010100011", "010101011100", "111010001011", "100110001110", "111101101001", "011000010100", "110101011010", "011010111111", "010010000100", "111011000000", "001011110100", "100110000111", "000110111111", "101100111110", "010010001011", "010001010110", "010010001010", "101111101100", "110001100001", "101100000010", "110110010000", "111000000001", "100110111111", "011111100111", "100111001100", "111001011001", "101001110001", "110110011100", "000000110100", "100101100000", "110010111001", "000100001111", "011000101000", "110011010010", "011011010000", "001010011011", "111010011000", "101000111101", "001000011000", "010100100000", "101101111011", "010000001001", "100010010101", "101010111010", "001111000111", "100110011000", "100001101011", "111101111011", "010100010111", "011100011110", "010001000000", "001111000000", "001110101101", "101101001011", "101101001111", "101111000111", "101001001000", "010100001011", "110110100101", "110001000000", "011110010110", "001011111011", "100001011100", "000000010001", "000101111001", "010110010111", "010000111001", "011011000101", "111101100101", "010111101001", "010110000010", "011001111101", "101000000100", "011000000010", "001111000101", "001000110001", "011010010110", "101001011000", "011010111010", "010101001001", "111000101110", "100100101100", "010011001001", "001010111001", "110101100000", "111111101010", "001001011110", "111111100000", "001101010110", "101011011000", "001111001001", "010000100001", "100100110001", "110001011001", "110011010111", "000111011001", "011001001011", "111011000101", "000000110000", "000110101001", "001010100100", "100101100101", "010101011001", "001000101010", "100100000000", "110101110001", "101000111100", "110000001010", "111010100010", "101010111110", "101110010001", "000010001100", "000000100011", "101010000011", "011101000000", "100110010101", "000010001001", "010111111111", "110100011011", "000011111011", "000010000101", "110001110010", "011011001111", "111001111001", "011110100100", "000011010000", "001001010001", "000011011001", "000000001111", "111100001100", "111100100101", "110110001110", "000101001110", "010011011000", "110010000101", "101110111101", "001111111001", "101001000101", "100011111001", "100111000110", "000001001111", "110110011000", "010010000010", "010101011111", "100001010010", "100111100011", "000101111100", "100000011110", "010110101000", "001110110000", "000110111110", "110000000011", "111110000010", "111000001000", "001111011011", "010100000100", "010101100110", "000111000001", "000010111000", "111010110011", "000010101100", "011101000101", "011001000110", "100010010111", "110001010011", "101011111010", "000000111001", "101100101010", "011110001000", "011110111010", "001000101001", "100100100001", "111101010100", "100100101000", "011010101101", "111011111011", "110000101110", "000101011010", "010111000011", "010011011100", "001101110011", "111101110000", "000110010000", "101000000110", "001110100001", "010111010011", "000010010000", "001000110110", "111100000000", "011111111000", "111000100010", "001111101101", "011100101111", "110001111010", "011011111110", "000111010110", "000101100000", "001010111101", "110100100101", "001101111000", "101000010011", "010110001011", "110101100111", "001000010110", "000100111010", "111010000000", "011010110010", "111111010010", "110010001110", "110111101010", "101110111000", "101100011001", "000001010011", "101011111100", "001111101001", "110010011010", "010110010101", "000010000010", "101111101101", "001000100001", "001010010110", "111011010010", "111010111000", "001111010100", "001101110111", "010010011011", "010010010001", "111100011101", "111110110110", "001000110101", "011001011100", "001000001101", "110110000010", "111111101011", "000100000110", "101000010111", "001001000101", "100001011101", "101110000110", "010111001110", "000100101010", "100010111001", "111010100110", "001001100100", "110100110100", "100101101111", "011010111110", "000100111000", "110001011000", "111101110011", "100001010000", "110101111110", "011011011011", "010111110100", "101000110111", "100101011101", "110110010001", "001000000011", "111111101100", "100111100101", "111100001001", "000000000110", "110010101100", "001111100011", "001101100000", "011000111100", "110110001000", "000110101011", "011010100000", "001100100010", "101100111011", "100001010001", "100101101001", "001100011011", "110011001110", "110010101111", "010001100010", "110010000100", "110010000000", "111000111001", "011100000101", "000110000110", "111100100010", "011011010100", "011000001101", "100100000110", "101100111010", "011011100001", "111111001101", "100010100100", "010000010101", "101111001000", "011100010101", "010110011100", "110101010011", "110101000100", "000010000110", "110101111010", "100011111101", "111000000100", "101111100010", "011110010000", "111000111000", "000000111011", "100010110101", "000001101011", "001000000010", "001101101010", "111011101000", "010011101001", "110001110111", "111010001001", "110001001110", "011101011011", "010110010110", "110110111100", "000110100101", "110000010111", "100101000011", "000000010101", "111110110011", "000001011011", "111011110111", "001100001110", "000000011010", "000100101001", "101001101000", "100011101110", "101111001001", "000100110000", "000100011011", "001111000010", "010010010100", "010111011111", "100100000100", "111101111000", "110100010100", "011110111000", "001010001111", "111110011111", "101111100111", "010101000110", "010011111101", "011111101001", "000000101111", "111100111011", "001010011000", "011101100010", "011010010000", "111001000000", "000100000100", "010000100000", "111001101011", "110001000001", "110100001011", "011010110001", "001001110111", "010000101011", "000011110101", "111100000101", "011100110010", "010111100101", "010101010101", "110000100111", "010111100100", "001101101101", "101100001011", "000101010000", "110100111000", "110101101110", "111000001101", "010001111111", "111101000011", "001000111000", "100000000110", "001010101010", "111011001101", "000110110111", "110111110001", "111010110100", "011001000000", "000100000101", "011110100110", "100011010111", "010000101010", "000111001100", "000011001001", "011010100010", "110110100100", "000111010011", "111110010111", "000101010010", "011101000011", "011101010110", "100000110101", "000100101101", "101100001101", "100101001010", "100000100000", "111011000011", "001100100110", "001001010010", "010110001000", "111110100100", "000001111111", "010101111001", "110111000001", "111110011001", "100101100110", "001100100100", "001001101110", "000011001010", "001011111110", "101010111011", "011110100010", "100111000100", "100000100111", "100011010010", "011001010010", "101111110010", "100011111111", "111010001100", "011010000000", "110100011111", "100001100110", "000001110110", "000001101001", "010010010010", "011011000100", "010100100001", "100010000100", "001001000001", "111001001101", "100101110011", "101000100000", "100010110011", "110010100001", "111111110010", "010010110001", "111011000010", "010010010110", "011001101011", "011110110101", "010000111111", "010010011101", "101100100101", "001001001101", "111000010000", "000100011001", "111111011100", "010101110101", "100110010111", "100111010010", "010111000000", "000000001001", "110011110000", "001000011101", "111000110001", "000110011011", "011101111010", "101111111011", "001011000100", "001101100100", "111101000001", "001100101101", "010111111011", "100110111001", "000011010100", "010110100110", "000010110001", "101110111010", "110000011110", "010010101010", "001100010110", "011011111101", "001110110110", "000001110100", "101000100101", "110001100100", "100000011001", "011110011001", "100010110010", "100110111011", "100011111010", "011011011001", "011000011000", "010110111100", "111000110100", "001100001100", "110001111001", "110011011100", "011100110000", "001110011010", "010011000111", "010010101110", "011000101101", "111000111111", "111001111101", "101001011001", "000111101010", "001110111110", "101100010110", "011001001101", "110100101000", "010010001111", "101011010001", "001101011010", "011111110000", "000100111111", "111101000010", "100000010111", "001100000011", "101010011111", "111011100110", "100011011101", "110101010101", "011101010000", "100010111100", "100001000011", "001011110110", "111010111010", "011010101000", "110100000000", "111001000111", "010101110010", "111000100000", "100011001001", "000010100010", "010011111000", "000101101110", "100011110011", "011001111011", "000001111000", "011111000110", "100111000111", "111110011010", "101111001010", "111100110011", "011101100011", "100000010101", "101010010101", "100111111000", "101101101111", "101100101000", "110000111010", "100110000010", "000011000111", "111100000001", "101110111100", "010001011011", "100101111100", "101111101010", "111000010001", "011010110110", "100111011110", "011111001001", "011001111001", "011010010011", "100011010011", "001011011011", "111010010110", "101001000000", "100101101110", "110001101010", "010000000101", "011110010010", "000001101111", "101110011100", "101001001011", "101111011010", "101001010110", "110001101111", "110110010111", "010111110111", "001100101011", "001111100000", "011010001110", "100011111100", "001001111101", "100101010100", "011101110011", "110111100001", "001000100100", "011001000011", "101010011101", "001100100000", "011001010100", "111111111010", "010111111101", "001010001100", "111111111000", "010101111100", "000111001101", "110101000000", "010010011000", "010001010100", "010001110000", "011110110000", "000011111101", "101101110001", "101101001010", "110000000000", "100100111101", "111110111001", "010000111000", "110100001100", "011111110110", "001100001010", "100011101010", "001001100101", "101011001101", "101101100100", "010111010001", "001000001110", "110111110101", "101110101011", "100110000101", "110011000111", "100110011110", "100100110100", "101111011001", "011001110010", "101000010110", "000101010011", "100111001110", "111000011111", "110011100011", "000100001011", "011100100010", "000001010010", "010110001001", "101111011110", "010011100110", "111001000011", "100011001010", "100101011110", "010110111111", "000001100101", "110111111101", "011110011010", "111111010110", "011110111110", "100000000111", "101000111110", "000001011111", "111000100110", "100101000000", "001000100010", "111010001111", "111011101010", "101110100101", "000010110011", "100100110011", "110001100101", "000101010110", "100100100110", "100110111100", "001011010100", "011101011001", "010110101011", "000010101010", "100100010001", "110001100111", "101101101000", "101110100000", "111100110000", "000111100110", "110001000011", "000111000110", "100011100110", "111011011101", "101100000000", "001011110000", "101010101110", "001110110010", "110010111101", "111011001100", "011100001001", "001101111100", "111110111011", "000011100001", "011001011010", "111101101101", "111010001000", "010000000001", "001000010001", "101110011001", "111000000000", "010011110100", "011111011001", "010011100010", "100010011010", "010100001110", "110111100101", "000111111100", "000001011010", "010100111100", "100000001000", "101100111001", "001100010001", "001000001111", "001011010010", "100110000000", "101010010010", "111101100001", "010001000011", "111111000010", "111111101001", "001110100010", "101000101000", "101001000100", "111100101101", "010100110111", "000010010101", "110010110101", "001101111010", "001000011110", "101000010001", "001100001011", "001100000100", "000110100011", "001100001101", "111111001001", "100011100010", "000101011011", "000001010101", "110110101001", "001100010000", "101111000000", "100001010100", "101101010010", "110110111010", "011011001010", "100100011011", "101111110101", "001101110100", "111100110100", "000011011101", "100100100100", "001111011100", "001011110010", "000000011000", "100011100000", "111011011111", "000101101000", "100010010011", "000011110001", "000111101111", "010111001011", "110011101111", "100001001111", "111101001110", "011001011110", "010010111010", "101011101100", "010101000011", "001111100001", "110000011010", "110011100100", "000011001100", "000100010101", "011111101000", "000001101010", "001001010011", "001000011001", "001110011111", "011101111100", "011000100100", "010011001101", "111111010000", "010010100000", "010011110010", "011100111110", "100001110011", "100000000011", "101011111011", "100000110110", "111010011101", "101111110000", "110000001001", "000111000011", "100001001101", "100110001001", "000100011000", "001111000001", "011110100001", "111111111101", "010000100101", "101011110101", "100101100010", "010001101101", "011011110000", "011011000010", "101101111000", "110010111110", "110001011110", "010001110011", "100100100000", "101010010001", "100000111111", "111110011011", "001000100101", "000111100010", "110111011101", "101011011010", "000000000001", "110010011001", "001010011001", "100111010101", "001110110111", "110110000110", "101011111101", "100101001110", "011110010111", "110111010110", "011011000111", "011100011000", "101100011010", "101111110011", "011110101100", "100001101100", "011010110100", "111100011110", "011110011101", "100010110110", "010000111100", "001101010100", "000101110011", "101101100010", "110011110111", "010001001100", "100111010001", "000000000111", "010101111110", "000101101111", "000011101111", "000001110011", "000101000010", "110101011111", "001001011010", "100101000010", "110100011101", "001001010000", "101011100000", "111010110010", "010001100000", "100100111100", "110000000101", "101101001001", "111010001101", "011011010111", "101110110001", "001110010011", "011111001000", "011111010011", "001110000010", "110110111111", "011011001011", "110110001101", "101010110101", "100111110100", "100000111001", "011001111111", "110010011111", "110110100110", "001111111100", "001110011000", "100010111000", "000010101000", "000110101111", "011100111100", "010001101111", "100011100011", "100100111110", "010100011101", "101100101101", "001111101000", "111110101001", "110100000010", "001010101111", "011001110001", "010110111000", "001100011100", "011010010111", "010010001100", "110101010111", "111000001111", "111100000100", "011010101111", "110101111100", "111101011111", "000110000111", "011110110010", "111110010010", "001011100111", "110010000001", "111111110100", "101001011010", "000100011110", "011100100111", "110000001100", "001010001010", "110011100001", "110001011011", "110010010100", "101011100100", "110111101110", "011100100100", "011100100011", "100111011000", "010100000011", "001111100111", "000110000100", "101100100001", "111101110010", "101110101100", "010001100011", "110101010001", "111101101110", "000111100111", "000011110110", "011010000001", "111110100110", "000100011100", "011111100001", "101111110110", "100111000010", "000110100001", "011001101010", "110110110011", "110000111110", "001100101010", "100101001101", "001001101100", "100101011111", "101111001011", "111101000000", "010110010100", "011111001110", "011111111111", "101100001110", "101011100110", "111001100001", "111101011101", "001100111110"
]

const testData = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"]

function convertArrayOfBinaryStringsToArrayOfBitArrays(sourceArray) {
	let arrayOfBitArrays = [];
	sourceArray.forEach((binaryString) => {
		let stringArray = binaryString.split('');
		let integerArray = stringArray.map((value) => parseInt(value));
		arrayOfBitArrays.push(integerArray);
	});
	return arrayOfBitArrays;
}

function calculatGammaAsBitArray(arrayOfBitArrays, bitsPerValue) {
	const numberOfValues = arrayOfBitArrays.length;
	let totalsForEachBitPosition = [];
	for (let i = 0; i < bitsPerValue; i++) {
		totalsForEachBitPosition[i] = 0;
	}
	let gammaBitArray = totalsForEachBitPosition;

	arrayOfBitArrays.forEach((bitArray) => {
		bitArray.forEach((integer, index) => totalsForEachBitPosition[index] += integer);
	})

	totalsForEachBitPosition.forEach((total, index) => {
		total / numberOfValues > 0.5 ? gammaBitArray[index] = 1 : gammaBitArray[index] = 0
	});

	return gammaBitArray;
}

function flipBitArrayValues(bitIntegerArray) {
	return bitIntegerArray.map((bit) => bit == 1 ? 0 : 1);
}


// const gamma = calculatGammaAsBitArray(convertArrayOfBinaryStringsToArrayOfBitArrays(testData), 5);
const gammaBitArray = calculatGammaAsBitArray(convertArrayOfBinaryStringsToArrayOfBitArrays(diagnosticData), 12);
let epsilonBitArray = flipBitArrayValues(gammaBitArray);

console.log('gamma:', gammaBitArray, '\nepsilon:', epsilonBitArray, '\nmultiple: ', parseInt(gammaBitArray.join(''), 2) * parseInt(epsilonBitArray.join(''), 2));
console.log("\ntotal ms: ", performance.now() - startMS);

// for (let i = 0; i < 10000; i++) {
// 	followInstructions(instructions);
// 	resetOrigin();
// }
// console.log("\ntotal ms, average for 10000 runs: ", (performance.now() - startMS) / 10000);

console.log("==============================\n");
