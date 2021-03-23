const helpers = require("../helpers.js");
/*
 === ROT - Rate Of Turn ===

 ------------------------------------------------------------------------------
        1   2 3
        |   | |
 $--ROT,x.x,A*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Rate Of Turn, degrees per minute, "-" means bow turns to port
 2. Status, "A" means data is valid
 3. Checksum
 */
export const TYPE = 'rate-of-turn';
export const ID = 'ROT';

export function decode(fields) {
	return {
		sentence: ID,
		type: TYPE,
		rateOfTurn: +fields[1],
		valid: fields[2] === "A",
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(helpers.encodeFixed(msg.rateOfTurn, 2));
	result.push('A');
	const resultMsg = result.join(',');
	return resultMsg + helpers.computeChecksum(resultMsg);
}
