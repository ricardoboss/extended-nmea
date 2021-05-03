export class TimeOnly {
	public static readonly MIN_TOTAL_MILLIS = 0;
	public static readonly MAX_TOTAL_MILLIS = 86400000;

	/**
	 * The integer "hours" part. Ranges from 0 to 23.
	 */
	public get hours(): number {
		return Math.floor(this.totalHours % 24);
	}

	/**
	 * The integer "minutes" part. Ranges from 0 to 59.
	 */
	public get minutes(): number {
		return Math.floor(this.totalMinutes % 60);
	}

	/**
	 * The integer "seconds" part. Ranges from 0 to 59.
	 */
	public get seconds(): number {
		return Math.floor(this.totalSeconds % 60);
	}

	/**
	 * The integer "milliseconds" part. Ranges from 0 to 999;
	 */
	public get milliseconds(): number {
		return this.totalMilliseconds % 1000;
	}

	/**
	 * The total amount of time in hours. Ranges from 0 to (24 - Number.MIN_SAFE_INTEGER).
	 */
	public get totalHours(): number {
		return this.totalMinutes / 60;
	}

	/**
	 * The total amount of time in minutes. Ranges from 0 to (1440 - Number.MIN_SAFE_INTEGER).
	 */
	public get totalMinutes(): number {
		return this.totalSeconds / 60;
	}

	/**
	 * The total amount of time in seconds. Ranges from 0 to (86400 - Number.MIN_SAFE_INTEGER).
	 */
	public get totalSeconds(): number {
		return this.totalMilliseconds / 1000;
	}

	/**
	 * The total amount of time in hours. Ranges from 0 to (86400000 - Number.MIN_SAFE_INTEGER).
	 */
	public readonly totalMilliseconds: number;

	/**
	 * Creates a higher level representation of a 24-hour based time measurement.
	 *
	 * @param milliseconds The millisecond part of the time to represent.
	 * @param seconds The "seconds" part of the time to represent.
	 * @param minutes The "minutes" part of the time to represent.
	 * @param hours The "hours" part of the time to represent.
	 */
	constructor(milliseconds: number, seconds: number = 0, minutes: number = 0, hours: number = 0) {
		if (typeof milliseconds !== 'number' || typeof seconds !== 'number' || typeof minutes !== 'number' || typeof hours !== 'number')
			throw new TypeError(`Cannot create TimeOnly instance with values other than numbers.`);

		const total = ((((hours * 60) + minutes) * 60) + seconds) * 1000 + milliseconds;

		if (total < TimeOnly.MIN_TOTAL_MILLIS)
			throw new RangeError(`Cannot create TimeOnly instance with less than TimeOnly.MIN_TOTAL_MILLIS milliseconds.`);

		if (total >= TimeOnly.MAX_TOTAL_MILLIS)
			throw new RangeError(`Cannot create TimeOnly instance with more than TimeOnly.MAX_TOTAL_MILLIS milliseconds.`);

		this.totalMilliseconds = total;
	}
}
