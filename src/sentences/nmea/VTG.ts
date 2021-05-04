import {TalkerSentence} from "../../types/sentences/TalkerSentence";

export class VTG extends TalkerSentence {
	public static readonly ID: string = "VTG"

	constructor(data: string) {
		super(data);
	}

	public get trackingAngle(): number {
		const val = this.dataFields[0];
		if (val.length === 0)
			return 0;

		return parseFloat(val);
	}

	public get magneticTrackingAngle(): number {
		const val = this.dataFields[2];
		if (val.length === 0)
			return 0;

		return parseFloat(val);
	}

	public get speed(): number {
		const val = this.dataFields[4];
		if (val.length === 0)
			return 0;

		return parseFloat(val);
	}

	public get speedKmh(): number {
		const val = this.dataFields[6];
		if (val.length === 0)
			return 0;

		return parseFloat(val);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 8;
	}
}
