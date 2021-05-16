export class GeoCoordinate {
	public readonly quadrant: string;
	public readonly degrees: number;
	public readonly decimal: number;

	public get minutes(): number {
		return Math.floor(this.decimal);
	}

	public get seconds(): number {
		return Math.floor((this.decimal - this.minutes) * 60);
	}

	public get decimalDegrees(): number {
		const positive = this.quadrant === 'N' || this.quadrant === 'E';

		return (positive ? 1 : -1) * (this.degrees + this.decimal / 60);
	}

	constructor(encoded: string, quadrant: string) {
		if (typeof encoded !== 'string' || typeof quadrant !== 'string')
			throw new TypeError(`Cannot create GeoCoordinate instance with values other than strings.`);

		if (encoded.length < 6)
			throw new Error(`Expected at least 6 characters in encoded, got ${encoded.length}.`);

		if (!['N', 'S', 'E', 'W'].includes(quadrant))
			throw new Error(`Expected exactly 1 character of [N, S, E, W], got ${quadrant}.`);

		this.quadrant = quadrant;
		this.degrees = parseInt(encoded.substr(0, encoded.indexOf('.') - 2));
		this.decimal = parseFloat(encoded.substr(encoded.indexOf('.') - 2));
	}
}
