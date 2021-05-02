import {describe} from "mocha";
import {HDT, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('HDT', function () {
		it('decodes values', function () {
			const decodedRot = Decoder.decodeTalker<HDT>('$--HDT,286.3,T*2D\r\n');

			expect(decodedRot.valid).to.equal(true);
			expect(decodedRot.talkerId).to.equal('--');
			expect(decodedRot.sentenceId).to.equal('HDT');
			expect(decodedRot.heading).to.equal(286.3);
		});
	});
});
