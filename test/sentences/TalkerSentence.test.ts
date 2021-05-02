import {describe} from "mocha";
import {expect} from "chai";
import {TalkerSentence} from "../../src/types/sentences/TalkerSentence";

describe('Talker Sentence', function () {
	let testSentence1 = new TalkerSentence('$--NAV,0.05,2.3*6D\r\n');
	let testSentence2 = new TalkerSentence('$--NAV,0.05,2.3\r\n');
	let testSentence3 = new TalkerSentence('$HCHDM,238,M\r\n');
	let testSentence4 = new TalkerSentence('$ABCDEF,238.2\r\n', 3);
	let testSentence5 = new TalkerSentence('$ABCDEFG,238.2\r\n', 3);
	let testSentence6 = new TalkerSentence('$ABCDEFG,238.2*49\r\n', 7);
	let testSentence7 = new TalkerSentence('$ABCDEFG,238.2*49\r\n', 0);
	let invalidSentence1 = new TalkerSentence('$--NAV,0.05,2.4*6D\r\n');
	let invalidSentence2 = new TalkerSentence('$--NAV,0.05,2.4*6D\n');
	let invalidSentence3 = new TalkerSentence('--NAV,0.05,2.4*6D\r\n');

	it('has the NMEA0183 checksum separator', function () {
		expect(TalkerSentence.ChecksumSeparator).to.equal("*");
	});

	it('validates the checksum', function () {
		expect(testSentence1.valid).to.equal(true);
		expect(testSentence2.valid).to.equal(true);
		expect(testSentence3.valid).to.equal(true);
		expect(testSentence4.valid).to.equal(true);
		expect(testSentence5.valid).to.equal(true);
		expect(testSentence6.valid).to.equal(true);
		expect(testSentence7.valid).to.equal(true);
		expect(invalidSentence1.valid).to.equal(false);
		expect(invalidSentence2.valid).to.equal(false);
		expect(invalidSentence3.valid).to.equal(false);
	});

	it('identifies the talker', function () {
		expect(testSentence1.talkerId).to.equal("--");
		expect(testSentence2.talkerId).to.equal("--");
		expect(testSentence3.talkerId).to.equal("HC");
		expect(testSentence4.talkerId).to.equal("ABC");
		expect(testSentence5.talkerId).to.equal("ABC");
		expect(testSentence6.talkerId).to.equal("ABCDEFG");
		expect(testSentence7.talkerId).to.equal("");
	});

	it('identifies the sentence', function () {
		expect(testSentence1.sentenceId).to.equal("NAV");
		expect(testSentence2.sentenceId).to.equal("NAV");
		expect(testSentence3.sentenceId).to.equal("HDM");
		expect(testSentence4.sentenceId).to.equal("DEF");
		expect(testSentence5.sentenceId).to.equal("DEFG");
		expect(testSentence6.sentenceId).to.equal("");
		expect(testSentence7.sentenceId).to.equal("ABCDEFG");
	});
});
