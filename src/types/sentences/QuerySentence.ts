import {NmeaSentence} from "./NmeaSentence";
import {RawNmeaSentence} from "./RawNmeaSentence";
import {IQuerySentence} from "../interfaces";
import {SentenceType} from "../SentenceType";

export class QuerySentence extends NmeaSentence implements IQuerySentence {
	/**
	 * Create a NMEA0183 sentence from a string.
	 *
	 * @param data The line to interpret as an NMEA0183 sentence. Can also be an existing Sentence.
	 * @param prefix The prefix to use when validating the sentence.
	 * @param suffix The suffix to use when validating the sentence.
	 */
	constructor(data: RawNmeaSentence, prefix: string = NmeaSentence.Prefix, suffix: string = NmeaSentence.Suffix) {
		super(data, SentenceType.Query, prefix, suffix);
	}

	/**
	 * The first field in the sentence (usually includes a talker id/sentence id).
	 */
	protected get idField(): string {
		return this.fields[0];
	}

	/**
	 * The mnemonic being requested by the listener. Usually three characters.
	 */
	public get mnemonic(): string {
		return this.fields[1];
	}

	/**
	 * Returns the first two characters in the first field as per NMEA0183 standard.
	 */
	public get talkerId(): string {
		return this.idField.substr(0, 2);
	}

	/**
	 * Returns the first third and fourth characters in the first field as per NMEA0183 standard.
	 */
	public get listenerId(): string {
		return this.idField.substr(2, 2);
	}

	public get valid(): boolean {
		// MAYBE: validate length of mnemonic (3)
		return super.valid && this.idField.length === 5 && this.idField[4].toUpperCase() === 'Q';
	}

	public get invalidReason(): null|string {
		if (!super.valid) {
			return super.invalidReason;
		}

		if (this.idField.length !== 5) {
			return `Invalid length of id field: expected 5, got ${this.idField.length}`;
		}

		if (this.idField[4].toUpperCase() !== 'Q') {
			return `Invalid id field: expected Q at position 4, got ${this.idField[4]}`;
		}

		return null;
	}
}
