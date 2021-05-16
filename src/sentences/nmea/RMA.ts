import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export class RMA extends TalkerSentence {
	public static readonly ID: string = "RMA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get warning(): boolean {
		return this.dataFields[0] === 'V';
	}

	public get latitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[1], this.dataFields[2]);
	}

	public get longitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[3], this.dataFields[4]);
	}

	public get timeDifferenceA(): number {
		return parseFloat(this.dataFields[5]);
	}

	public get timeDifferenceB(): number {
		return parseFloat(this.dataFields[6]);
	}

	public get speedOverGround(): number {
		return parseFloat(this.dataFields[8]);
	}

	public get trackMadeGood(): number {
		return parseFloat(this.dataFields[9]);
	}

	public get magneticVariation(): number {
		const val = parseFloat(this.dataFields[10]);
		const positive = this.dataFields[11] === 'E';

		return (positive ? 1 : -1) * val;
	}

	public get valid(): boolean {
		const fieldCount = this.dataFields.length;

		return super.valid && (fieldCount === 11);
	}
}
