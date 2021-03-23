const helpers = require("../helpers.js");
/*
 === MWV - Wind Speed and Angle ===

 ------------------------------------------------------------------------------
 *******1   2 3   4 5
 *******|   | |   | |
 $--MWV,x.x,a,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Wind Angle, 0 to 360 degrees
 2. Reference, R = Relative, T = True
 3. Wind Speed
 4. Wind Speed Units, K/M/N
 5. Status, A = Data Valid
 6. Checksum
 */
export const TYPE = 'wind';
export const ID = 'MWV';

export function decode(fields) {
	return {
		sentence: ID,
		type: TYPE,
		angle: +fields[1],
		reference: fields[2],
		speed: +fields[3],
		units: fields[4],
		status: fields[5]
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(helpers.encodeDegrees(msg.angle));
	result.push(msg.reference);
	result.push(helpers.encodeFixed(msg.speed, 2));
	result.push(msg.units);
	result.push(typeof msg.status === undefined ? 'A' : msg.status);
	const resultMsg = result.join(',');
	return resultMsg + helpers.computeChecksum(resultMsg);
}
