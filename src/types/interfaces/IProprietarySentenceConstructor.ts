import {RawNmeaSentence} from "../sentences/RawNmeaSentence";
import {IProprietarySentence} from "./IProprietarySentence";

export interface IProprietarySentenceConstructor {
	/**
	 * Create a NMEA0183 "proprietary sentence" from a string and an optional talker id length.
	 *
	 * @param data The line to interpret as an NMEA0183 proprietary sentence. Can be an existing NMEA sentence.
	 * @param manufacturerId The manufacturer id in this sentence. Usually three characters.
	 */
	new(data: RawNmeaSentence, manufacturerId: string): IProprietarySentence;
}
