export module Helpers {
	/**
	 * Calculates the XOR checksum for the given input. The result are two hexadecimal, uppercase characters
	 * (0x00 - 0xFF).
	 *
	 * @param data
	 */
	export function xorChecksum(data: string): Uppercase<string> {
		if (typeof data !== 'string')
			throw new Error(`Cannot use arguments of type '${typeof data}' as input.`);

		let sum = 0;
		for (let i = 0; i < data.length; i++)
			sum ^= data.charCodeAt(i);

		const hex = sum.toString(16);

		// crude hack to pad with zeros
		return ('00' + hex).slice(-2).toUpperCase();
	}
}
