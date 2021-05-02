import {RawNmeaSentence} from "./RawNmeaSentence";
import {ChecksumSentence} from "./ChecksumSentence";
import {ITalkerSentence} from "../interfaces/ITalkerSentence";
import {NmeaSentence} from "./NmeaSentence";
import {SentenceType} from "../SentenceType";

export class TalkerSentence extends ChecksumSentence implements ITalkerSentence {
	/**
	 * The number of characters in the given string which belong to the talker. This value is 2 by the NMEA0183
	 * standard.
	 */
	private readonly talkerIdLength: number;

	/**
	 * Create a NMEA0183 "talker sentence" from a string and an optional talker id length.
	 *
	 * @param data The data to interpret as an NMEA0183 talker sentence. Can also be an existing Sentence.
	 * @param talkerIdLength The length of the talker id in this sentence.
	 * @param prefix The prefix to use when validating the sentence.
	 * @param suffix The suffix to use when validating the sentence.
	 */
	constructor(data: RawNmeaSentence, talkerIdLength: number = 2, prefix: string = NmeaSentence.Prefix, suffix: string = NmeaSentence.Suffix) {
		super(data, SentenceType.Talker, prefix, suffix);

		this.talkerIdLength = talkerIdLength;
	}

	/**
	 * By default, returns the first two characters in the first field as per NMEA0183 standard. Can return more than
	 * two characters if specified otherwise in the constructor.
	 */
	public get talkerId(): string {
		return this.idField.substr(0, this.talkerIdLength);
	}

	/**
	 * Returns all characters between the talker id and the end of the first field, excluding all characters from the
	 * talker id.
	 */
	public get sentenceId(): string {
		return this.idField.substr(this.talkerIdLength);
	}

	/**
	 * The first field in the sentence (usually includes a talker id/sentence id).
	 */
	protected get idField(): string {
		return this.fields[0];
	}

	/**
	 * Returns all data fields of the sentence. I.e. all fields separated by comma, excluding the first one.
	 */
	protected get dataFields(): string[] {
		return this.fields.splice(1);
	}
}
