import {describe} from "mocha";
import {DatumCode, Decoder, DTM} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('DTM', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<DTM>('$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n');
			const decoded2 = Decoder.decodeTalker<DTM>('$GPDTM,999,,0.08,N,0.07,E,-47.7,W84*1B\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('GP');
			expect(decoded1.sentenceId).to.equal('DTM');
			expect(decoded1.datumCode).to.equal(DatumCode.WGS84);
			expect(decoded1.subDatum).to.equal('');
			expect(decoded1.latitude.degrees).to.equal(0);
			expect(decoded1.latitude.minutes).to.equal(0);
			expect(decoded1.latitude.quadrant).to.equal('N');
			expect(decoded1.longitude.degrees).to.equal(0);
			expect(decoded1.longitude.minutes).to.equal(0);
			expect(decoded1.longitude.quadrant).to.equal('E');
			expect(decoded1.altitude).to.equal(0);
			expect(decoded1.referenceDatum).to.equal('W84');

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('GP');
			expect(decoded2.sentenceId).to.equal('DTM');
			expect(decoded2.datumCode).to.equal(DatumCode.Custom);
			expect(decoded2.subDatum).to.equal('');
			expect(decoded2.latitude.degrees).to.equal(0);
			expect(decoded2.latitude.minutes).to.equal(0);
			expect(decoded2.latitude.quadrant).to.equal('N');
			expect(decoded2.longitude.degrees).to.equal(0);
			expect(decoded2.longitude.minutes).to.equal(0);
			expect(decoded2.longitude.quadrant).to.equal('E');
			expect(decoded2.altitude).to.equal(-47.7);
			expect(decoded2.referenceDatum).to.equal('W84');
		});
	});
});
