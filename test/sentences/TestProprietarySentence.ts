import {ProprietarySentence} from "../../src/types/sentences/ProprietarySentence";
import {RawNmeaSentence} from "../../src/types/sentences/RawNmeaSentence";

export class TestProprietarySentence extends ProprietarySentence {
	public static readonly ManufacturerId = "TEST";

	constructor(data: RawNmeaSentence) {
		super(data, TestProprietarySentence.ManufacturerId);
	}
}
