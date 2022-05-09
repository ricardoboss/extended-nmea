import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {DateOnly, GeoCoordinate, TimeOnly} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import {PositionFixStatus} from "./common/PositionFixStatus";
import parseTime = Helpers.parseTime;
import parseDate = Helpers.parseDate;
import parseGeoCoordinate = Helpers.parseGeoCoordinate;
import {PrecisePositionMode} from "./common/PositionMode";

export class RMC extends TalkerSentence {
	public static readonly ID: string = "RMC"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[0]);
	}

	public get status(): PositionFixStatus {
		return this.dataFields[1] as PositionFixStatus;
	}

	public get latitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[2], this.dataFields[3]);
	}

	public get longitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[4], this.dataFields[5]);
	}

	public get speedOverGround(): number {
		return parseFloat(this.dataFields[6]);
	}

	public get courseOverGround(): number {
		return parseFloat(this.dataFields[7]);
	}

	public get date(): DateOnly {
		return parseDate(this.dataFields[8]);
	}

	public get magneticVariation(): number {
		const degrees = parseFloat(this.dataFields[9]);
		const east = this.dataFields[10] === 'E';

		return (east ? -1 : 1) * degrees;
	}

	public get posMode(): PrecisePositionMode|null {
		if (this.dataFields.length <= 11) {
			return null;
		}

		return this.dataFields[11] as PrecisePositionMode;
	}

	public get navStatus(): PositionFixStatus|null {
		if (this.dataFields.length <= 12) {
			return null;
		}

		return this.dataFields[12] as PositionFixStatus;
	}

	public get valid(): boolean {
		const fieldCount = this.dataFields.length;

		// NMEA 2.3 and later add a navStatus field
		return super.valid && (fieldCount >= 11 && fieldCount <= 13);
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length < 11 || this.dataFields.length > 13) {
			return `Expected between 11 and 13 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
