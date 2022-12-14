"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const startMS = performance.now();
// ------------------------------------------------------------ //
const fs_1 = require("fs");
// ------------------------------------------------------------ //
const transmission = fs_1.readFileSync('day16/day16 input.txt', 'utf-8');
const binaryTransmission = convertTransmissionToBinaryString(transmission);
console.log(binaryTransmission, '\n');
let packet = parsePacketBits(binaryTransmission);
fs_1.writeFileSync('testOutput.json', JSON.stringify(packet));
console.log('\n\n============resulting packet:\n', packet);
console.log('\n\n=======\nsum of versions:', sumAllVersionsInPacket(packet));
function convertTransmissionToBinaryString(transmission) {
    return transmission
        .split('')
        .map((char) => convertHexCharToBinary(char))
        .join('');
}
function convertHexCharToBinary(hexChar) {
    switch (hexChar) {
        case '0':
            return '0000';
        case '1':
            return '0001';
        case '2':
            return '0010';
        case '3':
            return '0011';
        case '4':
            return '0100';
        case '5':
            return '0101';
        case '6':
            return '0110';
        case '7':
            return '0111';
        case '8':
            return '1000';
        case '9':
            return '1001';
        case 'A':
            return '1010';
        case 'B':
            return '1011';
        case 'C':
            return '1100';
        case 'D':
            return '1101';
        case 'E':
            return '1110';
        case 'F':
            return '1111';
        default:
            return '';
    }
}
function bitsToInteger(bits) {
    return parseInt(bits, 2);
}
function getPacketVersion(packetBits) {
    return bitsToInteger(packetBits.substring(0, 3));
}
function getPacketType(packetBits) {
    return bitsToInteger(packetBits.substring(3, 6)) == 4 ? 'literal' : 'operator';
}
function getLengthMode(packetBits) {
    return bitsToInteger(packetBits.substring(6, 7)) == 0 ? 'bits' : 'count';
}
function literalDataToValue(data) {
    let dataBitsRegEx = /.([0,1]{4})/g; // Capture group 1 ($1) contains the actual bits
    let actualBits = data.replaceAll(dataBitsRegEx, '$1'); // Ignore anything in the string that is not capture group one
    return parseInt(actualBits, 2);
}
function sumAllVersionsInPacket(packet) {
    let sumOfVersions = 0;
    sumOfVersions += packet.version;
    if (packet.subpackets) {
        packet.subpackets.forEach((subpacket) => {
            sumOfVersions += sumAllVersionsInPacket(subpacket);
        });
    }
    return sumOfVersions;
}
function parsePacketBits(packetBits) {
    let packet = {
        version: getPacketVersion(packetBits),
        type: getPacketType(packetBits),
        dataBits: ''
    };
    if (packet.type === 'literal') {
        let packetData = packetBits.substring(6, getEndIndexOfLiteralPacket(packetBits) + 1);
        packet.value = literalDataToValue(packetData);
    }
    else {
        packet.lengthMode = getLengthMode(packetBits);
        packet.subpackets = [];
        let bitOperatorHeaderLength = 3 + 3 + 1 + 15;
        let countOperatorHeaderLength = 3 + 3 + 1 + 11;
        let dataStartIndex = packet.lengthMode === 'bits' ? bitOperatorHeaderLength : countOperatorHeaderLength;
        // Reviewed - This makes sense:
        packet.dataBits = packetBits.substring(dataStartIndex);
        let subpacketsBitArray = splitSubpacketBitsIntoArray(packet.dataBits);
        subpacketsBitArray.forEach((subpacketBits) => {
            packet.subpackets?.push(parsePacketBits(subpacketBits));
        });
    }
    return packet;
}
// TODO - I appear to be removing a few bits from the tail end as I go (see results for 620080001611562C8802118E34. I'm not sure where this is happening though...)
// TODO - review this function:
function splitSubpacketBitsIntoArray(bits) {
    let bitArray = [];
    let remainingBits = bits;
    // while (remainingBits.length > 0) {
    while (remainingBits.length > 10) {
        // let remainingBitsAreAllZeros = parseInt(remainingBits, 2) == 0;
        // if (remainingBitsAreAllZeros) break;
        let nextEndIndex = getNextEndIndex(remainingBits);
        console.log('\nremaining bits:', remainingBits);
        console.log('nextEndIndex:', nextEndIndex);
        // TODO - I think I have some bit-drift around here
        let bitsOfNextSubpacket = remainingBits.substring(0, nextEndIndex);
        console.log('bits of Next subpacket:', bitsOfNextSubpacket);
        // let bitsOfNextSubpacket = remainingBits.substring(0, nextEndIndex + 1);
        bitArray.push(bitsOfNextSubpacket);
        // TODO - I think I have some bit-drift around here
        remainingBits = remainingBits.substring(nextEndIndex + 1);
        // remainingBits = remainingBits.substring(nextEndIndex);
    }
    return bitArray;
}
// Reviewed - This makes sense:
function getNextEndIndex(bitString) {
    let nextPacketType = getPacketType(bitString);
    if (nextPacketType === 'literal')
        return getEndIndexOfLiteralPacket(bitString);
    let nextPacketLengthMode = getLengthMode(bitString);
    if (nextPacketLengthMode === 'bits')
        return getEndIndexOfBitOperatorPacket(bitString);
    if (nextPacketLengthMode === 'count')
        return getEndIndexOfCountOperatorPacket(bitString);
    console.warn('Something\'s weird! No end index was found');
    return bitString.length - 1; // backup value
}
// Reviewed - This makes sense:
function getEndIndexOfLiteralPacket(bitString) {
    let numberOfHeaderBits = 3 + 3; // 3 version bits, 3 type ID bits
    for (let i = numberOfHeaderBits; i < bitString.length; i += 5) {
        if (bitString[i] == '0')
            return i + 4;
    }
    console.warn('Something\'s weird! No end index was returned for the literal value!');
    return bitString.length - 1; // backup value
}
// Reviewed - This makes sense:
function getEndIndexOfBitOperatorPacket(bitString) {
    let numberOfHeaderBits = 3 + 3 + 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit
    let numberOfHeaderDataLengthBits = 15;
    let dataLengthBits = bitString.substring(numberOfHeaderBits, numberOfHeaderBits + numberOfHeaderDataLengthBits);
    let dataLength = bitsToInteger(dataLengthBits);
    // Reviewed - This makes sense:
    return numberOfHeaderBits + numberOfHeaderDataLengthBits + dataLength - 1;
}
// TODO - review this function:
function getEndIndexOfCountOperatorPacket(bitString) {
    let currentEndIndex = 3 + 3 + 1 + 11 - 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit, 11 data-length indication bits, zero-indexed
    let numberOfSubpackets = getNumberOfSubpacketsInCountOperatorPacket(bitString);
    console.log('number of subpackets:', numberOfSubpackets);
    for (let i = 1; i <= numberOfSubpackets; i++) {
        let remainingSubpacketBits = bitString.substring(currentEndIndex + 1);
        currentEndIndex += getNextEndIndex(remainingSubpacketBits);
        console.log('current end index now:', currentEndIndex);
    }
    return currentEndIndex;
    // return endIndex;
    // 1 1111111 11222 2222 2
    // 012345 67890 1234567 89012 3456 7
    // 6 + 5 ++ +
    // 	endindex value at the end is(6 + 5 + 06 + 04 + 04) = 25
    // should return end index of 21, but returns 22
}
getEndIndexOfCountOperatorPacket('01100010000000001000000000000000000101100001000101010110001011001000100000000010000100011000111000110100');
// // TODO - review this function:
// function getEndIndexOfCountOperatorPacket(bitString: string): number {
// 	let endIndex = 3 + 3 + 1 + 11; // 3 version bits, 3 type ID bits, 1 length-type ID bit, 11 data-length indication bits
// 	let numberOfSubpackets = getNumberOfSubpacketsInCountOperatorPacket(bitString);
// 	console.log('number of subpackets:', numberOfSubpackets);
// 	for (let i = 1; i <= numberOfSubpackets; i++) {
// 		let remainingSubpacketBits = bitString.substring(endIndex);
// 		// TODO - I think I have some bit-drift around here
// 		endIndex += getNextEndIndex(remainingSubpacketBits);
// 	}
// 	// TODO - I think I have some bit-drift around here
// 	return endIndex - 1;
// 	// return endIndex;
// 	           1 1111111 11222 2222 2
// 	012345 67890 1234567 89012 3456 7
// 	6 + 5 +++ 
// 	endindex value at the end is (6 + 5 + 06 + 04 + 04) = 25
// 	should return end index of 21, but returns 22
// }
// Reviewed - This makes sense:
function getNumberOfSubpacketsInCountOperatorPacket(bitString) {
    let numberOfHeaderBits = 3 + 3 + 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit
    let numberOfDataLengthBits = 11;
    let subpacketCountBits = bitString.substring(numberOfHeaderBits, numberOfHeaderBits + numberOfDataLengthBits);
    return bitsToInteger(subpacketCountBits);
}
console.log('==============================\n');
