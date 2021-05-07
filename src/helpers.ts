import {TimeOnly, DateOnly} from "./types";

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
	 * Parses the given data into a TimeOnly representation.
	 *
	 * @param data The data, formatted as 'hhmmss.sss' where hh = hours, mm = minutes and ss.ss = seconds with decimals. The decimal part is optional.
	 */
	export function parseTime(data: string): TimeOnly {
		if (typeof data !== 'string')
			throw new TypeError(`Cannot use arguments of type '${typeof data}' as input.`);

		if (data.length !== 6 && data.length !== 9 && data.length !== 10)
			throw new Error(`Expected data formatted as 'hhmmss.sss' or 'hhmmss', but found ${data.length} characters`);

		let hours = parseInt(data.substr(0, 2));
		let minutes = parseInt(data.substr(2, 2));
		let seconds = parseInt(data.substr(4, 2));

		let milliseconds = 0;
		if (data.length === 9)
			milliseconds = parseInt(data.substr(7, 2));
		if (data.length === 10)
			milliseconds = parseInt(data.substr(7, 3));

		return new TimeOnly(milliseconds, seconds, minutes, hours);
	}

	/**
	 * Parses the given data into a DateOnly representation.
	 *
	 * @param data The data, formatted as 'ddMMyy' where dd = day, MM = month and yy = year (< 73 means after 2000)
	 */
	export function parseDate(data: string): DateOnly {
		if (typeof data !== 'string')
			throw new TypeError(`Cannot use arguments of type '${typeof data}' as input.`);

		if (data.length !== 6)
			throw new Error(`Expected data formatted as 'ddMMyy', but found ${data.length} characters`);

		let day = parseInt(data.substr(0, 2));
		let month = parseInt(data.substr(2, 2));
		let year = parseInt(data.substr(4, 2));
		if (year < 73)
			year += 2000;
		else
			year += 1900;

		return new DateOnly(day, month, year);
	}
}
