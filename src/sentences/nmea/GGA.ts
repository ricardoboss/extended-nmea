import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {TimeOnly} from "../../types/util/TimeOnly";
import {Helpers} from "../../helpers";
import parseTime = Helpers.parseTime;

export enum GpsQualityIndicator {
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

export class GGA extends TalkerSentence {
	public static readonly ID: string = "GGA"

	constructor(data: string) {
		super(data);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[0]);
	}

	public get latitude(): number {
		return parseFloat(this.dataFields[1]);
	}

	public get longitude(): number {
		return parseFloat(this.dataFields[3]);
	}

	public get north(): boolean {
		return this.dataFields[2] === 'N';
	}

	public get east(): boolean {
		return this.dataFields[4] === 'E';
	}

	public get gpsQuality(): GpsQualityIndicator {
		return parseInt(this.dataFields[5]) as GpsQualityIndicator;
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
