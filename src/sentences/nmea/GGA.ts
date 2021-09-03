import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate, TimeOnly} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseTime = Helpers.parseTime;
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export enum GgaQualityIndicator {
	No_Fix = 0,
	Gps = 1,
	DifferentialGPS = 2,
	PPS = 3,
	RTK = 4,
	RTKFloat = 5,
	Estimated = 6,
	Manual = 7,
	Simulation = 8
}

export interface IDataFieldsParsedGGA {
	time: TimeOnly;
	latitude: GeoCoordinate;
	longitude: GeoCoordinate;
	gpsQuality: GgaQualityIndicator;
	satellitesInView: number;
	horizontalDOP: number;
	altMean: number;
	geoidalSeparation: number;
	differentialAge: number|null;
	differentialStationId: number;
}

export class GGA extends TalkerSentence {
	public static readonly ID: string = "GGA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get dataFieldsParsed(): IDataFieldsParsedGGA {
		return {
			time: this.time,
			latitude: this.latitude,
			longitude: this.longitude,
			gpsQuality: this.gpsQuality,
			satellitesInView: this.satellitesInView,
			horizontalDOP: this.horizontalDOP,
			altMean: this.altMean,
			geoidalSeparation: this.geoidalSeparation,
			differentialAge: this.differentialAge,
			differentialStationId: this.differentialStationId,
		}
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

	public get gpsQuality(): GgaQualityIndicator {
		return parseInt(this.dataFields[5]) as GgaQualityIndicator;
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
}
