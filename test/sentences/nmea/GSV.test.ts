import {describe} from "mocha";
import {Decoder, GSV, GsvSatellite} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GSV', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<GSV>('$GPGSV,3,1,11,03,03,111,00,04,15,270,00,06,01,010,00,13,06,292,00*74\r\n');
			const decoded2 = Decoder.decodeTalker<GSV>('$GLGSV,3,3,10,82,04,167,22,78,01,111,*65\r\n');
			const decoded3 = Decoder.decodeTalker<GSV>('$GPGSV,4,4,13,25,03,013,*4D\r\n');
			const decoded4 = Decoder.decodeTalker<GSV>('$GBGSV,3,3,12,21,49,075,21,22,10,035,,23,07,251,35,28,21,293,30,1*79\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('GP');
			expect(decoded1.sentenceId).to.equal('GSV');
			expect(decoded1.messageCount).to.equal(3);
			expect(decoded1.messageNumber).to.equal(1);
			expect(decoded1.totalMessageCount).to.equal(11);
			expect(decoded1.signalId).to.equal(null);
			const satellites1 = [...decoded1.satellites()];
			expect(satellites1).to.have.deep.members([
				new GsvSatellite(3, 3, 111, 0),
				new GsvSatellite(4, 15, 270, 0),
				new GsvSatellite(6, 1, 10, 0),
				new GsvSatellite(13, 6, 292, 0),
			]);

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('GL');
			expect(decoded2.sentenceId).to.equal('GSV');
			expect(decoded2.messageCount).to.equal(3);
			expect(decoded2.messageNumber).to.equal(3);
			expect(decoded2.totalMessageCount).to.equal(10);
			const satellites2 = [...decoded2.satellites()];
			expect(satellites2).to.have.deep.members([
				new GsvSatellite(82, 4, 167, 22),
				new GsvSatellite(78, 1, 111, 0),
			]);

			expect(decoded3.valid).to.equal(true);

			expect(decoded4.valid).to.equal(true);
			expect(decoded4.talkerId).to.equal('GB');
			expect(decoded4.sentenceId).to.equal('GSV');
			expect(decoded4.messageCount).to.equal(3);
			expect(decoded4.messageNumber).to.equal(3);
			expect(decoded4.totalMessageCount).to.equal(12);
			expect(decoded4.signalId).to.equal('1');
		});
	});
});
