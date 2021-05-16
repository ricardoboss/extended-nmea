import {SentenceType} from "../SentenceType";

export interface INmeaSentence {
	/**
	 * The raw line given to the constructor. Can be changed.
	 */
	raw: string;

	/**
	 * Whether or not this sentence is a valid NMEA0183 sentence.
	 *
	 * All data is transmitted in the form of sentences. Only printable ASCII characters are allowed, plus CR (carriage
	 * return) and LF (line feed). Each sentence starts with a "$" sign and ends with <CR><LF>.
	 *
	 * It is not guaranteed that this will also validate the checksum as this depends on the sentence type being implemented.
	 */
	readonly valid: boolean;

	/**
	 * Returns all fields (including the first field in the sentence) separated by comma.
	 */
	readonly fields: string[];

	/**
	 * The type of this sentence.
	 */
	readonly type: SentenceType;
}
