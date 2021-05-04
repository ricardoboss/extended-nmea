import {describe} from "mocha";
import {ROT, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('ROT', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<ROT>('$--ROT,-0.5,A*0E\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('--');
			expect(decoded.sentenceId).to.equal('ROT');
			expect(decoded.rateOfTurn).to.equal(-0.5);
			expect(decoded.statusValid).to.equal(true);
		});
	});
});
