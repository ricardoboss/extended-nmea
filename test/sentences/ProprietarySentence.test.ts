import {describe} from "mocha";
import {expect} from "chai";
import {TestProprietarySentence} from "./TestProprietarySentence";

describe('Proprietary Sentence', function () {
	let testSentence = new TestProprietarySentence("$PTEST,ABC\r\n");
	let invalidSentence1 = new TestProprietarySentence("$PTEST,ABC\r");
	let invalidSentence2 = new TestProprietarySentence("PTEST\r\n");
	let invalidSentence3 = new TestProprietarySentence("$P\r\n");

	it('identifies a proprietary sentence', function () {
		expect(testSentence.valid).to.equal(true);
		expect(invalidSentence1.valid).to.equal(false);
		expect(invalidSentence2.valid).to.equal(false);
		expect(invalidSentence3.valid).to.equal(false);
	});
});
