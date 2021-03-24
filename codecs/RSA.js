/*

 === RSA - Rudder Angle ===

 ------------------------------------------------------------------------------
         1  2    3
         |  |    |
 $--RSA,x.x,A,,*0B
 ------------------------------------------------------------------------------

 Field Number:

 1. Rudder Angle
 2. Always A
 3. Checksum

 */

export const TYPE = 'rudder';
export const ID = 'RSA';

export function decode(fields) {
	return {
		sentence: ID,
		type: TYPE,
		angle: +fields[1]
	}
}
