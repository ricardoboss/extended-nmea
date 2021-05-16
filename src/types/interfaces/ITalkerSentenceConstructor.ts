import {RawNmeaSentence} from "../sentences/RawNmeaSentence";
import {ITalkerSentence} from "./ITalkerSentence";

export interface ITalkerSentenceConstructor {
	/**
	 * Create a NMEA0183 "talker sentence" from a string and an optional talker id length.
	 *
	 * @param data The data to interpret as an NMEA0183 talker sentence. Can also be an existing Sentence.
	 * @param talkerIdLength The length of the talker id in this sentence.
	 */
	new(data: RawNmeaSentence, talkerIdLength: number): ITalkerSentence;
}
