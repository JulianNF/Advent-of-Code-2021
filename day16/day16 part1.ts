const startMS = performance.now();
// ------------------------------------------------------------ //

import { readFileSync } from 'fs';

// ------------------------------------------------------------ //

const transmission = readFileSync('day16/day16 input.txt', 'utf-8');
const binaryTransmission = convertTransmissionToBinaryString(transmission);
console.log(convertTransmissionToBinaryString(transmission), '\n');

let packet = parsePacketBits(binaryTransmission);
console.log('\n\n=======\nsum of versions:', sumAllVersionsInPacket(packet));

// let caves = convertRawInputTextToCaveNodeObject('day12/day12 input.txt');
// for (let i = 0; i < 10000; i++) {
//     removeDeadendCavesAndConnectionsToThem(caves);
//     let paths = findAllPathsThroughCaves();
// }
// console.log('\ntotal ms, average for 10000 runs: ', (performance.now() - startMS) / 10000);

// ------------------------------------------------------------ //

interface Packet {
    version: number;
    type: PacketType;
    lengthMode?: LengthMode;
    subpackets?: Packet[];
    // value?: number;
    value?: string;
}
type PacketType = 'operator' | 'literal';
type LengthMode = 'bits' | 'count';

function convertHexCharToBinary(hexChar: string): string {
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
function convertTransmissionToBinaryString(transmission: string): string {
    return transmission
        .split('')
        .map((char) => convertHexCharToBinary(char))
        .join('');
}
function bitsToInteger(bits: string): number {
    return parseInt(bits, 2);
}
function getPacketVersion(packetBits: string): number {
    return bitsToInteger(packetBits.substring(0, 3));
}
function getPacketType(packetBits: string): PacketType {
    return bitsToInteger(packetBits.substring(3, 6)) == 4 ? 'literal' : 'operator';
}
function getLengthMode(packetBits: string): LengthMode {
    return bitsToInteger(packetBits.substring(6, 7)) == 0 ? 'bits' : 'count';
}

function literalBitsToInteger(bits: string) {
    let strippedBits = '';
    for (let i = 0; i < strippedBits.length; i += 5) {
        strippedBits += bits.substring(i + 1, 1 + 5);
    }
    return parseInt(strippedBits, 2);
}

console.log('stripped of leading indicators:', literalBitsToInteger);

function sumAllVersionsInPacket(packet: Packet): number {
    console.log('\n\npacket is:\n');
    console.log(packet);

    let sumOfVersions = 0;
    sumOfVersions += packet.version;
    if (packet.subpackets) {
        packet.subpackets.forEach((subpacket) => {
            sumOfVersions += sumAllVersionsInPacket(subpacket);
        });
    }
    return sumOfVersions;
}

function parsePacketBits(packetBits: string): Packet {
    let packet: Packet = {
        version: getPacketVersion(packetBits),
        type: getPacketType(packetBits),
        lengthMode: getLengthMode(packetBits),
    };

    if (packet.type === 'literal') {
        // oops, gotta convert this to ignore the leading numbers, no?
        // packet.value = literalBitsToInteger(packetBits);
        packet.value = packetBits;
    } else {
        packet.subpackets = [];
        let dataStartIndex = packet.lengthMode === 'bits' ? 22 : 18;
        let subpacketsBitArray = splitSubpacketBitsIntoArray(packetBits.substring(dataStartIndex));
        console.log('subpacket bits:', subpacketsBitArray);
        subpacketsBitArray.forEach((subpacketBits) => {
            packet.subpackets?.push(parsePacketBits(subpacketBits));
        });
    }

    return packet;
}

function splitSubpacketBitsIntoArray(subpacketBits: string): string[] {
    let bitArray: string[] = [];

    let minPacketLength = 3 + 3 + 5; // 3 version bits, 3 type bits, 5 literal packet data bits
    let remainingBitsAreNotAllZeroes = parseInt(subpacketBits, 2) != 0;

    while (subpacketBits.length > minPacketLength && remainingBitsAreNotAllZeroes) {
        let endIndexOfNextSubpacket = getEndIndexOfNextPacketInData(subpacketBits);
        bitArray.push(subpacketBits.substring(0, endIndexOfNextSubpacket + 1));
        subpacketBits = subpacketBits.substring(endIndexOfNextSubpacket + 1);
    }

    return bitArray;
}

function getEndIndexOfNextPacketInData(bitString: string): number {
    let nextPacketType = getPacketType(bitString);

    if (nextPacketType === 'literal') return getEndIndexOfLiteralPacket(bitString);
    let nextPacketLengthMode = getLengthMode(bitString);
    if (nextPacketLengthMode === 'bits') return getEndIndexOfBitOperatorPacket(bitString);
    if (nextPacketLengthMode === 'count') return getEndIndexOfCountOperatorPacket(bitString);

    return bitString.length - 1; // backup value
}

function getEndIndexOfLiteralPacket(bitString: string): number {
    let numberOfHeaderBits = 3 + 3; // 3 version bits, 3 type ID bits
    for (let i = numberOfHeaderBits; i < bitString.length; i += 5) {
        if (bitString[i] == '0') {
            return i + 4;
        }
    }
    return bitString.length - 1; // backup value
}

function getEndIndexOfBitOperatorPacket(bitString: string): number {
    let numberOfHeaderBits = 3 + 3 + 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit
    let numberOfHeaderDataLengthBits = 15;
    let dataLengthBits = bitString.substring(numberOfHeaderBits, numberOfHeaderBits + numberOfHeaderDataLengthBits);
    let dataLength = bitsToInteger(dataLengthBits);
    return numberOfHeaderBits + numberOfHeaderDataLengthBits + dataLength - 1;
}

function getSubpacketCountForCountOperatorPacket(bitString: string): number {
    let numberOfHeaderBits = 3 + 3 + 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit
    let numberOfDataLengthBits = 11;
    let subpacketCountBits = bitString.substring(numberOfHeaderBits, numberOfHeaderBits + numberOfDataLengthBits);
    return bitsToInteger(subpacketCountBits);
}

function getEndIndexOfCountOperatorPacket(bitString: string): number {
    let numberOfHeaderBits = 3 + 3 + 1; // 3 version bits, 3 type ID bits, 1 length-type ID bit
    let numberOfDataLengthBits = 11;
    let numberOfSubpackets = getSubpacketCountForCountOperatorPacket(bitString);

    let endIndex = numberOfHeaderBits + numberOfDataLengthBits;
    for (let i = 1; i <= numberOfSubpackets; i++) {
        let remainingSubpacketBits = bitString.substring(endIndex);
        console.log('i =', i, 'and remaining subpacket bits:', remainingSubpacketBits);
        endIndex += getEndIndexOfNextPacketInData(remainingSubpacketBits) + 1;
    }
    return endIndex;
}

console.log('==============================\n');
