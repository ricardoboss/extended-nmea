const helpers = require("../helpers.js");
/*
 === HDT - Heading - True ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--HDT,x.x,T*hh
 ------------------------------------------------------------------------------

 Field Number:

 1) Heading Degrees, true
 2) T = True
 3) Checksum
 */
export const TYPE = 'heading-info';
export const ID = 'HDT';

export function decode(fields) {
	return {
		sentence: ID,
		type: 'heading-info',
		heading: +fields[1]
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(helpers.encodeFixed(msg.heading, 1));
	result.push('T');
	const resultMsg = result.join(',');
	return resultMsg + helpers.computeChecksum(resultMsg);
}
