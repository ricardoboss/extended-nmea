import {TalkerSentence} from "../../types/sentences/TalkerSentence";

export class GsvSatellite {
	constructor(
		public readonly PRN: number,
		public readonly Elevation: number,
		public readonly Azimuth: number,
		public readonly SNR: number
	) {
	}
}

export class GSV extends TalkerSentence {
	public static readonly ID: string = "GSV"

	constructor(data: string) {
		super(data);
	}

	public get messageCount(): number {
		return parseInt(this.dataFields[0]);
	}

	public get messageNumber(): number {
		return parseInt(this.dataFields[1]);
	}

	public get totalMessageCount(): number {
		return parseInt(this.dataFields[2]);
	}

	public *satellites(): Iterable<GsvSatellite> {
		const data = this.dataFields.slice(3, 19).map(x => x.length > 0 ? x : "0").map(x => parseInt(x));

		for (let i = 0; i + 3 < data.length; i += 4) {
			yield new GsvSatellite(
				data[i],
				data[i + 1],
				data[i + 2],
				data[i + 3]
			);
		}
	}

	public get valid(): boolean {
		return super.valid && this.dataFields.length === 19;
	}
}
