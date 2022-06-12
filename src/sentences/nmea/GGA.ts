import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate, TimeOnly} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import {PositionFixQualityIndicator} from "./common";
import parseTime = Helpers.parseTime;
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export class GGA extends TalkerSentence {
	public static readonly ID: string = "GGA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[0]);
	}

	public get latitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[1], this.dataFields[2]);
	}

	public get longitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[3], this.dataFields[4]);
	}

	public get gpsQuality(): PositionFixQualityIndicator {
		return parseInt(this.dataFields[5]) as PositionFixQualityIndicator;
	}

	public get satellitesInView(): number {
		return parseInt(this.dataFields[6]);
	}

	public get horizontalDOP(): number {
		return parseFloat(this.dataFields[7]);
	}

	public get altMean(): number {
		return parseFloat(this.dataFields[8]);
	}

	public get geoidalSeparation(): number {
		return parseFloat(this.dataFields[10]);
	}

	public get differentialAge(): number|null {
		let age = this.dataFields[12];
		if (age.length === 0)
			return null;

		return parseFloat(age);
	}

	public get differentialStationId(): number {
		return parseInt(this.dataFields[13]);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 14;
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 14) {
			return `Expected 14 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
