import {INmeaSentence} from "../interfaces";
import {RawNmeaSentence} from "./RawNmeaSentence";
import {SentenceType} from "../SentenceType";

export class NmeaSentence implements INmeaSentence {
	/**
	 * Each NMEA0183 sentence starts with a "$" sign.
	 */
	public static readonly Prefix: string = "$";

	/**
	 * Each NMEA0183 sentence ends with <CR><LF>.
	 */
	public static readonly Suffix: string = "\r\n";

	/**
	 * The raw line given to the constructor. Can be changed.
	 */
	public raw: string;

	/**
	 * The type of this sentence.
	 */
	public readonly type: SentenceType;

	/**
	 * The prefix to use when validating the sentence.
	 */
	protected readonly prefix: string;

	/**
	 * The suffix to use when validating the sentence.
	 */
	protected readonly suffix: string;

	/**
	 * Create a NMEA0183 sentence from a string.
	 *
	 * @param data The line to interpret as an NMEA0183 sentence. Can also be an existing Sentence.
	 * @param type The type of this sentence.
	 * @param prefix The prefix to use when validating the sentence.
	 * @param suffix The suffix to use when validating the sentence.
	 */
	public constructor(data: RawNmeaSentence, type: SentenceType, prefix: string = NmeaSentence.Prefix, suffix: string = NmeaSentence.Suffix) {
		if (typeof data === 'string')
			this.raw = data;
		else
			this.raw = data.raw;

		this.type = type;
		this.prefix = prefix;
		this.suffix = suffix;
	}

	/**
	 * Whether or not this sentence is a valid NMEA0183 sentence.
	 *
	 * All data is transmitted in the form of sentences. Only printable ASCII characters are allowed, plus CR (carriage
	 * return) and LF (line feed). Each sentence starts with a "$" sign and ends with <CR><LF>.
	 *
	 * This does _not_ validate the checksum, regardless of if one is contained in the sentence.
	 */
	public get valid(): boolean {
		// TODO: check if all characters are printable ASCII characters (except <CR><LF>).
		// MAYBE: add an option for sentences to be able to omit <CR><LF> (e.g. when parsing a string from a readline which automatically removes the line delimiters).

		return this.raw.startsWith(this.prefix) &&
			this.raw.endsWith(this.suffix);
	}

	/**
	 * Returns all characters between "$" and "<CR><LF>".
	 */
	protected get dataNoFixtures(): string {
		return this.raw.slice(this.prefix.length, -this.suffix.length);
	}

	/**
	 * Returns all fields (including the first field in the sentence) separated by comma.
	 */
	public get fields(): string[] {
		return this.dataNoFixtures.split(',');
	}
}
