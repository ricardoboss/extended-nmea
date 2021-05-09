import {describe} from "mocha";
import {Decoder, DPT} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('DPT', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<DPT>('$SDDPT,76.1,0.0,100\r\n');
			const decoded2 = Decoder.decodeTalker<DPT>('$SDDPT,2.4,,*53\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('SD');
			expect(decoded1.sentenceId).to.equal('DPT');
			expect(decoded1.depth).to.equal(76.1);
			expect(decoded1.transducerOffset).to.equal(0);
			expect(decoded1.maxDepthRange).to.equal(100);

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('SD');
			expect(decoded2.sentenceId).to.equal('DPT');
			expect(decoded2.depth).to.equal(2.4);
			expect(decoded2.transducerOffset).to.equal(null);
			expect(decoded2.maxDepthRange).to.equal(null);
		});
	});
});
