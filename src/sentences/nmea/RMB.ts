import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export class RMB extends TalkerSentence {
	public static readonly ID: string = "RMB"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get warning(): boolean {
		return this.dataFields[0] === 'V';
	}

	public get crossTrackError(): number {
		return parseFloat(this.dataFields[1]);
	}

	public get directionToSteer(): string {
		return this.dataFields[2];
	}

	public get destinationWaypointId(): string {
		return this.dataFields[3];
	}

	public get lastWaypointId(): string {
		return this.dataFields[4];
	}

	public get destinationLatitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[5], this.dataFields[6]);
	}

	public get destinationLongitude(): GeoCoordinate {
		return parseGeoCoordinate(this.dataFields[7], this.dataFields[8]);
	}

	public get destinationDistance(): number {
		return parseFloat(this.dataFields[9]);
	}

	public get destinationBearing(): number {
		return parseFloat(this.dataFields[10]);
	}

	public get destinationClosingVelocity(): number {
		return parseFloat(this.dataFields[11]);
	}

	public get arrivalCircleEntered(): boolean {
		return this.dataFields[12] === 'A';
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 13;
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 13) {
			return `Expected 13 fields, got ${this.dataFields.length}`;
		}

		return null;
	}
}
