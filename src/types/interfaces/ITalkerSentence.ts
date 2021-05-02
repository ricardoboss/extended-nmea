import {INmeaSentence} from "./INmeaSentence";

export interface ITalkerSentence extends INmeaSentence {
	/**
	 * By default, returns the first two characters in the first field as per NMEA0183 standard. Can return more than
	 * two characters if specified otherwise in the constructor.
	 */
	readonly talkerId: string;

	/**
	 * Returns all characters between the talker id and the end of the first field, excluding all characters from the
	 * talker id.
	 */
	readonly sentenceId: string;
}
