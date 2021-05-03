import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {Helpers} from "../../helpers";
import parseTime = Helpers.parseTime;
import parseDate = Helpers.parseDate;
import {DateOnly, Latitude, Longitude, TimeOnly} from "../../types/utils";

export class RMC extends TalkerSentence {
	public static readonly ID: string = "RMC"

	constructor(data: string) {
		super(data);
	}

	public get time(): TimeOnly {
		return parseTime(this.dataFields[0]);
	}

	public get status(): string {
		return this.dataFields[1];
	}

	public get latitude(): Latitude {
		return parseFloat(this.dataFields[2]);
	}

	public get north(): boolean {
		return this.dataFields[3] === 'N';
	}

	public get longitude(): Longitude {
		return parseFloat(this.dataFields[4]);
	}

	public get east(): boolean {
		return this.dataFields[5] === 'E';
	}

	public get speedOverGround(): number {
		return parseFloat(this.dataFields[6]);
	}

	public get trackingAngle(): number {
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

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 11;
	}
}
