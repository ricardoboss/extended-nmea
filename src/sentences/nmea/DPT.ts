import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export interface IDataFieldsParsedDPT {
	depth: number;
	transducerOffset: number|null;
	maxDepthRange: number|null;
}

export class DPT extends TalkerSentence {
	public static readonly ID: string = "DPT"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get dataFieldsParsed(): IDataFieldsParsedDPT {
		return {
			depth: this.depth,
			transducerOffset: this.transducerOffset,
			maxDepthRange: this.maxDepthRange,
		}
	}

	public get depth(): number {
		return parseFloat(this.dataFields[0]);
	}

	public get transducerOffset(): number|null {
		const val = this.dataFields[1];
		if (val.length === 0)
			return null;

		return parseFloat(val);
	}

	public get maxDepthRange(): number|null {
		const val = this.dataFields[2];
		if (val.length === 0)
			return null;

		return parseFloat(val);
	}

	public get valid(): boolean {
		const fieldCount = this.dataFields.length;

		return super.valid && (fieldCount === 2 || fieldCount === 3);
	}
}
