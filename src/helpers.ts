import {TimeOnly} from "./types/util/TimeOnly";

export module Helpers {
	/**
	 * Calculates the XOR checksum for the given input. The result are two hexadecimal, uppercase characters
	 * (0x00 - 0xFF).
	 *
	 * @param data
	 */
	export function xorChecksum(data: string): Uppercase<string> {
		if (typeof data !== 'string')
			throw new TypeError(`Cannot use arguments of type '${typeof data}' as input.`);

		let sum = 0;
		for (let i = 0; i < data.length; i++)
			sum ^= data.charCodeAt(i);

		const hex = sum.toString(16);

		// crude hack to pad with zeros
		return ('00' + hex).slice(-2).toUpperCase();
	}

	/**
	 * Parses the given data into
	 *
	 * @param data
	 */
	export function parseTime(data: string): TimeOnly {
		if (typeof data !== 'string')
			throw new TypeError(`Cannot use arguments of type '${typeof data}' as input.`);

		if (data.length !== 9)
			throw new Error(`Expected data formatted as 'hhmmss.ss', but found ${data.length} characters`);

		let hours = parseInt(data.substr(0, 2));
		let minutes = parseInt(data.substr(2, 2));
		let seconds = parseInt(data.substr(4, 2));
		let milliseconds = parseInt(data.substr(7, 2));

		return new TimeOnly(milliseconds, seconds, minutes, hours);
	}
}
