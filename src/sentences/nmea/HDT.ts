import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export class HDT extends TalkerSentence {
	public static readonly ID: string = "HDT"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get heading(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 2 && this.dataFields[1] === 'T';
	}

	public get invalidReason(): null | string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.dataFields.length !== 2) {
			return `Expected 2 fields, got ${this.dataFields.length}`;
		}

		if (this.dataFields[1] !== 'T') {
			return "The second field must be 'T'";
		}

		return null;
	}
}
