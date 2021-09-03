import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import {GeoCoordinate} from "../../types";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export interface IDataFieldsParsedRMB {
  crossTrackError: number; 
  directionToSteer: string; 
  destinationWaypointId: string;
  lastWaypointId: string;
  destinationLatitude: GeoCoordinate;
  destinationLongitude: GeoCoordinate;
  destinationDistance: number;
  destinationBearing: number; 
  destinationClosingVelocity: number; 
  arrivalCircleEntered: boolean; 
}

export class RMB extends TalkerSentence {
	public static readonly ID: string = "RMB"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get dataFieldsParsed(): IDataFieldsParsedRMB {
		return {
			crossTrackError: this.crossTrackError, 
			directionToSteer: this.directionToSteer, 
			destinationWaypointId: this.destinationWaypointId,
			lastWaypointId: this.lastWaypointId,
			destinationLatitude: this.destinationLatitude,
			destinationLongitude: this.destinationLongitude,
			destinationDistance: this.destinationDistance,
			destinationBearing: this.destinationBearing, 
			destinationClosingVelocity: this.destinationClosingVelocity, 
			arrivalCircleEntered: this.arrivalCircleEntered, 
		}
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
		const fieldCount = this.dataFields.length;

		return super.valid && (fieldCount === 13);
	}
}
