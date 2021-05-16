import {RawNmeaSentence} from "./RawNmeaSentence";
import {ChecksumSentence} from "./ChecksumSentence";
import {NmeaSentence} from "./NmeaSentence";
import {IProprietarySentence} from "../interfaces";
import {SentenceType} from "../SentenceType";

export abstract class ProprietarySentence extends ChecksumSentence implements IProprietarySentence {
	/**
	 * Each proprietary NMEA0183 sentence starts with "$P".
	 */
	public static readonly Prefix: string = "$P";

	/**
	 * Returns the manufacturer id (i.e. the first field in the sentence, excluding the prefix "P").
	 */
	public readonly manufacturerId: string;

	/**
	 * Create a NMEA0183 "proprietary sentence" from a string and an optional talker id length.
	 *
	 * @param data The line to interpret as an NMEA0183 proprietary sentence. Can be an existing NMEA sentence.
	 * @param manufacturerId The manufacturer id in this sentence. Usually three characters.
	 * @param prefix The prefix to use when validating the sentence. The prefix will be prepended to the manufacturer id.
	 *               This means by default for manufacturer id "GRMC" the prefix "$PGRMC" will be used for validation.
	 * @param suffix The suffix to use when validating the sentence.
	 */
	protected constructor(data: RawNmeaSentence, manufacturerId: string, prefix: string = ProprietarySentence.Prefix, suffix: string = NmeaSentence.Suffix) {
		super(data, SentenceType.Proprietary, prefix + manufacturerId, suffix);

		this.manufacturerId = manufacturerId;
	}

	/**
	 * Returns all characters between "$P" + the manufacturer id and "<CR><LF>".
	 */
	protected get dataNoFixtures(): string {
		// Need to add prefix.length + 1 so the first "," is also cut away.
		// This means "$PTEST,123,456<CR><LF>" becomes "123,456".
		return this.raw.slice(this.prefix.length + 1, -this.suffix.length);
	}
}
