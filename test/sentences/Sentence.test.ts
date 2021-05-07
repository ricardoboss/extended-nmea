import {describe} from "mocha";
import {expect} from "chai";
import {NmeaSentence} from "../../src/types/sentences/NmeaSentence";
import {SentenceType} from "../../src";

describe('generic Sentence', function () {
	it('has NMEA0183 prefix and suffix', function () {
		expect(NmeaSentence.Prefix).to.equal("$");
		expect(NmeaSentence.Suffix).to.equal("\r\n");
	});

	it('identifies valid sentences', function () {
		let testSentence = new NmeaSentence('$--NAV,0.05,2.3*6D\r\n', SentenceType.Talker);

		expect(testSentence.valid).to.equal(true);
	});

	it('identifies invalid sentences', function () {
		let missingPrefix = new NmeaSentence('--NAV,0.05,2.3*6D\r\n', SentenceType.Talker);
		let missingCr = new NmeaSentence('$--NAV,0.05,2.3*6D\n', SentenceType.Talker);
		let missingLf = new NmeaSentence('$--NAV,0.05,2.3*6D\r', SentenceType.Talker);

		expect(missingPrefix.valid).to.equal(false);
		expect(missingCr.valid).to.equal(false);
		expect(missingLf.valid).to.equal(false);
	});
});
