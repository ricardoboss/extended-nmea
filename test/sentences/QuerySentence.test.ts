import {describe} from "mocha";
import {expect} from "chai";
import {QuerySentence} from "../../src/types/sentences/QuerySentence";

describe('Query Sentence', function () {
	let testSentence = new QuerySentence('$ABCDQ,EGH\r\n');
	let invalidSentence1 = new QuerySentence('$ABCDQEGH\r\n');
	let invalidSentence2 = new QuerySentence('$ABC,EGH\r\n');
	let invalidSentence3 = new QuerySentence('$ABCDQ,EGH\r');
	let invalidSentence4 = new QuerySentence('ABCDQ,EGH\r\n');
	let invalidSentence5 = new QuerySentence('$ABCQ,EGH\r\n');

	it('validates sentences', function () {
		expect(testSentence.valid).to.equal(true);
		expect(invalidSentence1.valid).to.equal(false);
		expect(invalidSentence2.valid).to.equal(false);
		expect(invalidSentence3.valid).to.equal(false);
		expect(invalidSentence4.valid).to.equal(false);
		expect(invalidSentence5.valid).to.equal(false);
	})

	it('reads talker id', function () {
		expect(testSentence.talkerId).to.equal('AB');
	});

	it('reads listener id', function () {
		expect(testSentence.listenerId).to.equal('CD');
	});

	it('reads requested mnemonic', function () {
		expect(testSentence.mnemonic).to.equal('EGH');
	});
});
