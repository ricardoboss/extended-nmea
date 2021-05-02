import {TalkerSentence} from "../../types/sentences/TalkerSentence";

export module Sentence {
	export class ROT extends TalkerSentence {
		public static readonly ID: string = "ROT"

		constructor(data: string) {
			super(data);
		}

		public get rateOfTurn(): number {
			return parseFloat(this.dataFields[0]);
		}

		public get statusValid(): boolean {
			return this.dataFields[1].toUpperCase() === 'A';
		}

		public get valid(): boolean {
			return super.valid && this.dataFields.length === 2;
		}
	}
}
