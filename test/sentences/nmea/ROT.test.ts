import {describe} from "mocha";
import {ROT, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('ROT', function () {
		it('decodes values', function () {
			const decodedRot = Decoder.decodeTalker<ROT>('$--ROT,-0.5,A*0E\r\n');

			expect(decodedRot.valid).to.equal(true);
			expect(decodedRot.talkerId).to.equal('--');
			expect(decodedRot.sentenceId).to.equal('ROT');
			expect(decodedRot.rateOfTurn).to.equal(-0.5);
			expect(decodedRot.statusValid).to.equal(true);
		});
	});
});
