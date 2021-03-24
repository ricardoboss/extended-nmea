import {computeChecksum, encodeFixed} from "../helpers.js";
/*
 === HDM - Heading - Magnetic ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--HDM,x.x,M*hh
 ------------------------------------------------------------------------------

 Field Number:

 1) Heading Degrees, magnetic
 2) M = Magnetic
 3) Checksum
 */
export const TYPE = 'heading-info-magnetic';
export const ID = 'HDM';

export function decode(fields) {
	return {
		sentence: ID,
		type: 'heading-info-magnetic',
		heading: +fields[1]
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(encodeFixed(msg.heading, 1));
	result.push('M');
	const resultMsg = result.join(',');
	return resultMsg + computeChecksum(resultMsg);
}
