import {INmeaSentence} from "./types/interfaces/INmeaSentence";
import {ITalkerSentenceConstructor} from "./types/interfaces/ITalkerSentenceConstructor";
import {QuerySentence} from "./types/sentences/QuerySentence";
import {IProprietarySentenceConstructor} from "./types/interfaces/IProprietarySentenceConstructor";
import {IQuerySentence} from "./types/interfaces/IQuerySentence";
import {IProprietarySentence} from "./types/interfaces/IProprietarySentence";
import {ITalkerSentence} from "./types/interfaces/ITalkerSentence";
import {CodecROT} from "./codecs/nmea/CodecROT";

export class Decoder {
	private static readonly TalkerCodecs: Map<string, ITalkerSentenceConstructor> = new Map([
		[CodecROT.ID, CodecROT],
	]);
	private static readonly ProprietaryCodecs: Map<string, IProprietarySentenceConstructor> = new Map();

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

		if (data.length > 5 && data[5] === 'Q') {
			return this.decodeQuery(data);
		}

		if (data.length > 1 && data[1] === 'P') {
			return this.decodeProprietary(data);
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
