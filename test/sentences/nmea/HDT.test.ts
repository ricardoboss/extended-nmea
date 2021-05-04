import {describe} from "mocha";
import {HDT, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('HDT', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<HDT>('$--HDT,286.3,T*2D\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('--');
			expect(decoded.sentenceId).to.equal('HDT');
			expect(decoded.heading).to.equal(286.3);
		});
	});
});
