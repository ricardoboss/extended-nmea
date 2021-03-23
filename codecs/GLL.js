import {computeChecksum, encodeDegrees, encodeTime} from "../helpers.js";
/*
=== GLL - Geographic Position - Latitude/Longitude ===

------------------------------------------------------------------------------
        1       2 3        4 5         6 7   8
        |       | |        | |         | |   |
 $--GLL,llll.ll,a,yyyyy.yy,a,hhmmss.ss,a,m,*hh<CR><LF>
------------------------------------------------------------------------------

Field Number:

1. Latitude
2. N or S (North or South)
3. Longitude
4. E or W (East or West)
5. Universal Time Coordinated (UTC)
6. Status A - Data Valid, V - Data Invalid
7. FAA mode indicator (NMEA 2.3 and later)
8. Checksum
 */

export const TYPE = 'geo-position';
export const ID = 'GLL';

export function decode(fields) {
	return {
		sentence: ID,
		type: 'geo-position',
		lat: fields[1],
		latPole: fields[2],
		lon: fields[3],
		lonPole: fields[4],
		timestamp: fields[5],
		status: fields[6] === 'A' ? 'valid' : 'invalid'
	};
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(encodeDegrees(msg.lat));
	result.push(msg.latPole);
	result.push(encodeDegrees(msg.lon));
	result.push(msg.lonPole);
	result.push(encodeTime(msg.timestamp));
	result.push('A');
	result.push('D');
	const resultMsg = result.join(',');
	return resultMsg + computeChecksum(resultMsg);
}
