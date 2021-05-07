import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export class RSA extends TalkerSentence {
	public static readonly ID: string = "RSA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get rudder(): number {
		return this.starboardRudder;
	}

	public get starboardRudder(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get portRudder(): number {
		return parseFloat(this.dataFields[2]);
	}

	public get valid(): boolean {
		return super.valid && (this.dataFields.length === 4 || this.dataFields.length === 2);
	}
}
