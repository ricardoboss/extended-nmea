import {describe} from "mocha";
import {Decoder, MTW} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('MTW', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<MTW>('$--MTW,-3.3,C*0E\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('--');
			expect(decoded.sentenceId).to.equal('MTW');
			expect(decoded.temperature).to.equal(-3.3);
		});
	});
});
