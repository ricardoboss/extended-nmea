import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";

export enum GsaMode {
	Manual = "M",
	Automatic = "A"
}

export enum GsaFix {
	NoFix = 1,
	Fix2D = 2,
	Fix3D = 3
}

export interface IDataFieldsParsedGSA {
	mode: GsaMode;
	fix: GsaFix;
	ids: number[];
	positionalDop: number;
	horizontalDop: number;
	verticalDop: number;
}

export class GSA extends TalkerSentence {
	public static readonly ID: string = "GSA"

	constructor(data: RawNmeaSentence) {
		super(data);
	}

	public get dataFieldsParsed(): IDataFieldsParsedGSA {
		return {
			mode: this.mode,
			fix: this.fix,
			ids: this.ids,
			positionalDop: this.positionalDop,
			horizontalDop: this.horizontalDop,
			verticalDop: this.verticalDop,
		}
	}

	public get mode(): GsaMode {
		return this.dataFields[0] as GsaMode;
	}

	public get fix(): GsaFix {
		return parseInt(this.dataFields[1]) as GsaFix;
	}

	public get ids(): number[] {
		return this.dataFields.slice(2, 13).filter(x => x.length > 0).map(x => parseInt(x));
	}

	public get positionalDop(): number {
		return parseFloat(this.dataFields[14]);
	}

	public get horizontalDop(): number {
		return parseFloat(this.dataFields[15]);
	}

	public get verticalDop(): number {
		return parseFloat(this.dataFields[16]);
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 17;
	}
}
