import {describe} from "mocha";
import {Decoder, GSA, GsaFix, GsaMode} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GSA', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<GSA>('$GPGSA,A,3,19,28,14,18,27,22,31,39,,,,,1.7,1.0,1.3*34\r\n');
			const decoded2 = Decoder.decodeTalker<GSA>('$GNGSA,A,3,21,29,,,,,,,,,,,1.36,0.73,1.15,4*09\r\n');
			const decoded3 = Decoder.decodeTalker<GSA>('$GNGSA,A,3,21,27,29,,,,,,,,,,1.35,0.80,1.08,4*0F\r\n');
			const decoded4 = Decoder.decodeTalker<GSA>('$GNGSA,A,3,29,,,,,,,,,,,,0.97,0.61,0.75,4*04\r\n');

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

			expect(decoded3.valid).to.equal(true);
			expect(decoded3.talkerId).to.equal('GN');
			expect(decoded3.sentenceId).to.equal('GSA');
			expect(decoded3.mode).to.equal(GsaMode.Automatic);
			expect(decoded3.fix).to.equal(GsaFix.Fix3D);
			expect(decoded3.ids).to.have.deep.members([21, 27, 29]);
			expect(decoded3.positionalDop).to.equal(1.35);
			expect(decoded3.horizontalDop).to.equal(0.80);
			expect(decoded3.verticalDop).to.equal(1.08);
			expect(decoded3.systemId).to.equal('4');

			expect(decoded4.valid).to.equal(true);
			expect(decoded4.talkerId).to.equal('GN');
			expect(decoded4.sentenceId).to.equal('GSA');
			expect(decoded4.mode).to.equal(GsaMode.Automatic);
			expect(decoded4.fix).to.equal(GsaFix.Fix3D);
			expect(decoded4.ids).to.have.deep.members([29]);
			expect(decoded4.positionalDop).to.equal(0.97);
			expect(decoded4.horizontalDop).to.equal(0.61);
			expect(decoded4.verticalDop).to.equal(0.75);
			expect(decoded4.systemId).to.equal('4');
		});
	});
});
