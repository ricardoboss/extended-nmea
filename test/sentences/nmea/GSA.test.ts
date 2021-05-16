import {describe} from "mocha";
import {Decoder, GSA, GsaFix, GsaMode} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GSA', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<GSA>('$GPGSA,A,3,19,28,14,18,27,22,31,39,,,,,1.7,1.0,1.3*34\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('GP');
			expect(decoded.sentenceId).to.equal('GSA');
			expect(decoded.mode).to.equal(GsaMode.Automatic);
			expect(decoded.fix).to.equal(GsaFix.Fix3D);
			expect(decoded.ids).to.have.deep.members([19, 28, 14, 18, 27, 22, 31, 39]);
			expect(decoded.positionalDop).to.equal(1.7);
			expect(decoded.horizontalDop).to.equal(1);
			expect(decoded.verticalDop).to.equal(1.3);
		});
	});
});
