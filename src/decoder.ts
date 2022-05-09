import {
	INmeaSentence,
	IProprietarySentence,
	IProprietarySentenceConstructor,
	IQuerySentence,
	ITalkerSentence,
	ITalkerSentenceConstructor
} from "./types";
import {QuerySentence} from "./types/sentences/QuerySentence";
import * as Sentence from "./sentences";

export class Decoder {
	private static readonly TalkerCodecs: Map<string, ITalkerSentenceConstructor> = new Map<string, ITalkerSentenceConstructor>([
		[Sentence.GGA.ID, Sentence.GGA],
		[Sentence.ROT.ID, Sentence.ROT],
		[Sentence.HDT.ID, Sentence.HDT],
		[Sentence.RMC.ID, Sentence.RMC],
		[Sentence.VTG.ID, Sentence.VTG],
		[Sentence.GSA.ID, Sentence.GSA],
		[Sentence.GSV.ID, Sentence.GSV],
		[Sentence.RSA.ID, Sentence.RSA],
		[Sentence.DPT.ID, Sentence.DPT],
		[Sentence.MTW.ID, Sentence.MTW],
		[Sentence.GLL.ID, Sentence.GLL],
		[Sentence.DTM.ID, Sentence.DTM],
	]);
	private static readonly ProprietaryCodecs: Map<string, IProprietarySentenceConstructor> = new Map<string, IProprietarySentenceConstructor>();

	public static register(id: string, sentence: ITalkerSentenceConstructor): void {
		Decoder.TalkerCodecs.set(id, sentence);
	}

	public static unregister(id: string): boolean {
		return Decoder.TalkerCodecs.delete(id);
	}

	public static registerProprietary(manufacturerId: string, sentence: IProprietarySentenceConstructor): void {
		Decoder.ProprietaryCodecs.set(manufacturerId, sentence);
	}

	public static unregisterProprietary(manufacturerId: string): boolean {
		return Decoder.ProprietaryCodecs.delete(manufacturerId);
	}

	public static decode(data: string): INmeaSentence {
		if (typeof data !== 'string')
			throw new Error(`Unable to decode sentence: invalid data type: ${typeof data}. Only strings are supported.`);

		// check proprietary sentences first to prevent false positives
		if (data.length > 1 && data[1] === 'P') {
			return this.decodeProprietary(data);
		}

		if (data.length > 5 && data[5] === 'Q') {
			return this.decodeQuery(data);
		}

		return this.decodeTalker(data);
	}

	public static decodeQuery(data: string): IQuerySentence {
		return new QuerySentence(data);
	}

	public static decodeProprietary<T extends IProprietarySentence>(data: string): T {
		const manufacturerId = data.substr(2, data.indexOf(',') - 2);
		if (!Decoder.ProprietaryCodecs.has(manufacturerId))
			throw new Error(`Unable to decode sentence: unknown manufacturer id for proprietary sentence: ${manufacturerId}`);

		const sentenceConstructor = Decoder.ProprietaryCodecs.get(manufacturerId);
		return new sentenceConstructor(data, manufacturerId) as T;
	}

	public static decodeTalker<T extends ITalkerSentence>(data: string): T {
		if (data.length < 6)
			throw new Error(`Unable to decode sentence: invalid format. Expected at least 6 characters, got: ${data} (${data.length} characters)`);

		const talkerIdLength = 2;
		const sentenceId = data.substr(talkerIdLength + 1, data.indexOf(',') - talkerIdLength - 1);
		if (!Decoder.TalkerCodecs.has(sentenceId))
			throw new Error(`Unable to decode sentence: unknown sentence id: ${sentenceId}`);

		const sentenceConstructor = Decoder.TalkerCodecs.get(sentenceId);
		return new sentenceConstructor(data, talkerIdLength) as T;
	}
}
