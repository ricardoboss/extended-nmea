import {computeChecksum, encodeDegrees, encodeFixed} from "../helpers.js";
/*
 === VTG - Track made good and Ground speed ===

 ------------------------------------------------------------------------------
 1  2  3  4  5  6  7  8 9   10
 |  |  |  |  |  |  |  | |   |
 $--VTG,x.x,T,x.x,M,x.x,N,x.x,K,m,*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Track Degrees
 2. T = True
 3. Track Degrees
 4. M = Magnetic
 5. Speed Knots
 6. N = Knots
 7. Speed Kilometers Per Hour
 8. K = Kilometers Per Hour
 9. FAA mode indicator (NMEA 2.3 and later)
 10. Checksum=== VTG - Track made good and Ground speed ===

 ------------------------------------------------------------------------------
 1  2  3  4  5  6  7  8 9   10
 |  |  |  |  |  |  |  | |   |
 $--VTG,x.x,T,x.x,M,x.x,N,x.x,K,m,*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Track Degrees
 2. T = True
 3. Track Degrees
 4. M = Magnetic
 5. Speed Knots
 6. N = Knots
 7. Speed Kilometers Per Hour
 8. K = Kilometers Per Hour
 9. FAA mode indicator (NMEA 2.3 and later)
 10. Checksum
 */
export const TYPE = 'track-info';
export const ID = 'VTG';

export function decode(fields) {
	return {
		sentence: ID,
		type: 'track-info',
		trackTrue: +fields[1],
		trackMagnetic: +fields[3],
		speedKnots: +fields[5],
		speedKmph: +fields[7]
	}
}

export function encode(talker, msg) {
	const result = ['$' + talker + ID];
	result.push(encodeDegrees(msg.trackTrue));
	result.push('T');
	result.push(encodeDegrees(msg.trackMagnetic));
	result.push('M');
	result.push(encodeFixed(msg.speedKnots, 2));
	result.push('N');
	result.push('');
	result.push('');
	result.push('A');
	const resultMsg = result.join(',');
	return resultMsg + computeChecksum(resultMsg);
}
