import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export enum GsaMode {
	Manual = "M",
	Automatic = "A"
}

export enum GsaFix {
	NoFix = 1,
	Fix2D = 2,
	Fix3D = 3
}

export class GSA extends TalkerSentence {
	public static readonly ID: string = "GSA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get mode(): GsaMode {
		return this.dataFields[0] as GsaMode;
	}

	public get fix(): GsaFix {
		return parseInt(this.dataFields[1]) as GsaFix;
	}

	public get ids(): number[] {
		return this.dataFields.slice(2, 13).filter(x => x.length > 0).map(x => parseInt(x));
	}

	public get positionalDop(): number {
		return parseFloat(this.dataFields[14]);
	}

	public get horizontalDop(): number {
		return parseFloat(this.dataFields[15]);
	}

	public get verticalDop(): number {
		return parseFloat(this.dataFields[16]);
	}

	public get systemId(): null|string {
		if (this.dataFields.length === 17) {
			return null;
		}

		return this.dataFields[17];
	}

	public get valid(): boolean {
		const dataFieldsLength = this.dataFields.length;

		// NMEA 4.10 added systemId field
		return super.valid && (dataFieldsLength === 17 || dataFieldsLength === 18);
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 18 && this.dataFields.length !== 17) {
			return `Expected 17 or 18 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
