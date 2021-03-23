export const ID = 'RDID';
export const TYPE = 'gyro';

export function decode(fields) {
	/*
	 === PRDID - RDI Proprietary Heading, Pitch, Roll ===


	 ------------------------------------------------------------------------------
			   1   2    3     4
			   |   |    |     |
	 $PRDID,-2.06,4.81,37.62*6D<CR><LF>
	 ------------------------------------------------------------------------------

	 Field Number:

	 1. Roll
	 2. Pitch
	 3. Heading
	 4. Checksum
	 */
	return {
		sentence: ID,
		type: TYPE,
		roll: +fields[1],
		pitch: +fields[2],
		heading: +fields[3],
	}
}
