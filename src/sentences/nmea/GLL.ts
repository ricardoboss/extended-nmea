import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate, TimeOnly} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseTime = Helpers.parseTime;
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export enum GllStatus {
	Valid = "A",
	Invalid = "V"
}

export enum GllPositionMode {
	NoPosition = "N",
	DeadReckoning = "E",
	RTK = "D",
	Fix = "A",
}

export class GLL extends TalkerSentence {
	public static readonly ID: string = "GLL"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get latitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[0], this.dataFields[1]);
	}

	public get longitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[2], this.dataFields[3]);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[4]);
	}

	public get status(): GllStatus {
		return this.dataFields[5] as GllStatus;
	}

	public get posMode(): GllPositionMode {
		return this.dataFields[6] as GllPositionMode;
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 7;
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 7) {
			return `Expected 7 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
