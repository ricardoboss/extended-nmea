import {INmeaSentence} from "./INmeaSentence";

export interface IQuerySentence extends INmeaSentence {
	/**
	 * Returns the first two characters in the first field as per NMEA0183 standard.
	 */
	readonly talkerId: string;

	/**
	 * Returns the first third and fourth characters in the first field as per NMEA0183 standard.
	 */
	readonly listenerId: string;

	/**
	 * The mnemonic being requested by the listener. Usually three characters.
	 */
	readonly mnemonic: string;
}
