import {computeChecksum, encodeFixed} from "../helpers.js";
/*
 === DBT - Depth below transducer ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5   6 7
 *******|   | |   | |   | |
 $--DBT,x.x,f,x.x,M,x.x,F*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Depth, feet
 2. f = feet
 3. Depth, meters
 4. M = meters
 5. Depth, Fathoms
 6. F = Fathoms
 7. Checksum
 */

export const TYPE = 'depth-transducer';
export const ID = 'DBT';

export function decode(fields) {
	return {
		sentence: ID,
		type: TYPE,
		depthMeters: +fields[3],
		depthFeet: +fields[1]
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(encodeFixed(msg.depthFeet, 2));
	result.push('f');
	result.push(encodeFixed(msg.depthMeters, 2));
	result.push('M');
	result.push(encodeFixed(msg.depthFathoms, 2));
	result.push('F');
	const resultMsg = result.join(',');
	return resultMsg + computeChecksum(resultMsg);
}
