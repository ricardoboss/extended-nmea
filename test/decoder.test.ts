import {describe} from "mocha";
import {expect} from "chai";
import {Decoder, SentenceType} from "../src";
import {TalkerSentence} from "../src/types/sentences/TalkerSentence";
import {TestProprietarySentence} from "./sentences/TestProprietarySentence";
import {TestProprietarySentence2} from "./sentences/TestProprietarySentence2";

describe('Decoder', function () {
	it('decodes talker sentences', function() {
		const decoded = Decoder.decodeTalker("$--ROT,-0.5,A*0E\r\n");

		expect(decoded.valid).to.equal(true);
		expect(decoded.talkerId).to.equal("--");
		expect(decoded.sentenceId).to.equal("ROT");
	});

	it('decodes query sentences', function() {
		const decoded = Decoder.decodeQuery("$GPECQ,RMC\r\n");

		expect(decoded.valid).to.equal(true);
		expect(decoded.talkerId).to.equal("GP");
		expect(decoded.listenerId).to.equal("EC");
		expect(decoded.mnemonic).to.equal("RMC");
	});

	it('decodes custom talker sentences', function() {
		Decoder.register("ABC", TalkerSentence);

		const decoded = Decoder.decodeTalker("$XYABC,123,456*46\r\n");

		expect(decoded.valid).to.equal(true);
		expect(decoded.talkerId).to.equal("XY");
		expect(decoded.sentenceId).to.equal("ABC");

		Decoder.unregister("ABC");
	});

	it('decodes proprietary sentences', function() {
		Decoder.registerProprietary(TestProprietarySentence.ManufacturerId, TestProprietarySentence);

		const decoded = Decoder.decodeProprietary("$PTEST,123,456\r\n");
		const decodedGeneric = Decoder.decodeProprietary<TestProprietarySentence>("$PTEST,123,456\r\n");

		expect(decoded.valid).to.equal(true);
		expect(decoded.manufacturerId).to.equal(TestProprietarySentence.ManufacturerId);

		expect(decodedGeneric.valid).to.equal(true);
		expect(decodedGeneric.manufacturerId).to.equal(TestProprietarySentence.ManufacturerId);
		expect(decodedGeneric.firstField).to.equal("123");

		Decoder.unregisterProprietary(TestProprietarySentence.ManufacturerId);
	});

	it('throws for invalid sentences', function() {
		expect(Decoder.decodeTalker.bind(Decoder, "$--ABC,123\r\n")).to.throw("Unable to decode sentence: unknown sentence id: ABC");
		expect(Decoder.decodeProprietary.bind(Decoder, "$PABC,123\r\n")).to.throw("Unable to decode sentence: unknown manufacturer id for proprietary sentence: ABC");
		expect(Decoder.decode.bind(Decoder, "")).to.throw("Unable to decode sentence: invalid format. Expected at least 6 characters, got:  (0 characters)");
		expect(Decoder.decode.bind(Decoder, "124567")).to.throw("Unable to decode sentence: unknown sentence id: ");
		expect(Decoder.decode.bind(Decoder, null)).to.throw("Unable to decode sentence: invalid data type: object. Only strings are supported.");
		expect(Decoder.decode.bind(Decoder, [123, 345])).to.throw("Unable to decode sentence: invalid data type: object. Only strings are supported.");
		expect(Decoder.decode.bind(Decoder, {abc: 123})).to.throw("Unable to decode sentence: invalid data type: object. Only strings are supported.");
		expect(Decoder.decode.bind(Decoder, 1234)).to.throw("Unable to decode sentence: invalid data type: number. Only strings are supported.");
		expect(Decoder.decode.bind(Decoder, undefined)).to.throw("Unable to decode sentence: invalid data type: undefined. Only strings are supported.");
	});

	it('implicitly decodes different sentence types', function () {
		Decoder.registerProprietary(TestProprietarySentence.ManufacturerId, TestProprietarySentence);

		const proprietary = Decoder.decode("$PTEST,123,456\r\n");
		const query = Decoder.decode("$GPECQ,RMC\r\n");
		const talker = Decoder.decode("$--ROT,-0.5,A*0E\r\n");

		expect(proprietary.valid).to.equal(true);
		expect(query.valid).to.equal(true);
		expect(talker.valid).to.equal(true);

		Decoder.unregisterProprietary(TestProprietarySentence.ManufacturerId);
	});

	it('doesn\'t fall for false-positives', function () {
		// register a proprietary sentence with "Q" at the fifth position to confuse the decoder
		Decoder.registerProprietary(TestProprietarySentence2.ManufacturerId, TestProprietarySentence2);

		const proprietary = Decoder.decode("$PABCQ,123,456\r\n");

		expect(proprietary.valid).to.equal(true);
		expect(proprietary.type).to.equal(SentenceType.Proprietary);

		Decoder.unregisterProprietary(TestProprietarySentence2.ManufacturerId);
	});
});
