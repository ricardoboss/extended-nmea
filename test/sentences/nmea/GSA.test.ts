import {describe} from "mocha";
import {Decoder, GSA, GsaFix, GsaMode} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GSA', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<GSA>('$GPGSA,A,3,19,28,14,18,27,22,31,39,,,,,1.7,1.0,1.3*34\r\n');
			const decoded2 = Decoder.decodeTalker<GSA>('$GNGSA,A,3,21,29,,,,,,,,,,,1.36,0.73,1.15,4*09\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('GP');
			expect(decoded1.sentenceId).to.equal('GSA');
			expect(decoded1.mode).to.equal(GsaMode.Automatic);
			expect(decoded1.fix).to.equal(GsaFix.Fix3D);
			expect(decoded1.ids).to.have.deep.members([19, 28, 14, 18, 27, 22, 31, 39]);
			expect(decoded1.positionalDop).to.equal(1.7);
			expect(decoded1.horizontalDop).to.equal(1);
			expect(decoded1.verticalDop).to.equal(1.3);
			expect(decoded1.systemId).to.equal(null);

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('GN');
			expect(decoded2.sentenceId).to.equal('GSA');
			expect(decoded2.mode).to.equal(GsaMode.Automatic);
			expect(decoded2.fix).to.equal(GsaFix.Fix3D);
			expect(decoded2.ids).to.have.deep.members([21, 29]);
			expect(decoded2.positionalDop).to.equal(1.36);
			expect(decoded2.horizontalDop).to.equal(0.73);
			expect(decoded2.verticalDop).to.equal(1.15);
			expect(decoded2.systemId).to.equal('4');
		});
	});
});
