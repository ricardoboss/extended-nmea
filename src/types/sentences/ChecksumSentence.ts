import {NmeaSentence} from "./NmeaSentence";
import {Helpers} from "../../helpers";

export abstract class ChecksumSentence extends NmeaSentence {
	/**
	 * The optional checksum in a valid "talker sentence" is separated by a "*" character.
	 */
	public static readonly ChecksumSeparator = "*";

	/**
	 * Whether or not this sentence contains a checksum value (a "*" and two hexadecimal characters at the end).
	 */
	protected get hasChecksum(): boolean {
		return this.dataNoFixtures.charAt(this.dataNoFixtures.length - 3) === ChecksumSentence.ChecksumSeparator;
	}

	/**
	 * Returns all characters between "$" and "*" if there is one or between "$" and "<CR><LF>".
	 */
	protected get dataNoChecksum(): string {
		if (this.hasChecksum)
			return this.dataNoFixtures.substr(0, this.dataNoFixtures.length - 3);
		else
			return this.dataNoFixtures;
	}

	/**
	 * Returns the last two characters at the end of the sentence, excluding "<CR><LF>".
	 */
	protected get checksum(): string {
		return this.dataNoFixtures.substr(this.dataNoFixtures.length - 2);
	}

	/**
	 * If this sentence has a checksum, returns whether it is valid or not. Otherwise returns true.
	 */
	protected get checksumValid(): boolean {
		// MAYBE: return false if no checksum exists
		if (!this.hasChecksum)
			return true;

		return this.checksum.toUpperCase() === Helpers.xorChecksum(this.dataNoChecksum);
	}

	/**
	 * Returns all fields (including the first field in the sentence) separated by comma. Excludes checksum.
	 */
	public get fields(): string[] {
		return this.dataNoChecksum.split(',');
	}

	/**
	 * Whether or not this sentence is a valid NMEA0183 talker sentence.
	 *
	 * This getter also validates the checksum, if there is one.
	 */
	public get valid(): boolean {
		return super.valid && this.checksumValid;
	}
}
