import {ProprietarySentence} from "../../src/types/sentences/ProprietarySentence";
import {RawNmeaSentence} from "../../src/types/sentences/RawNmeaSentence";

export class TestProprietarySentence2 extends ProprietarySentence {
	public static readonly ManufacturerId = "ABCQ";

	constructor(data: RawNmeaSentence) {
		super(data, TestProprietarySentence2.ManufacturerId);
	}

	public get firstField(): string {
		return this.fields[0];
	}
}
