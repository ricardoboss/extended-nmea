import {describe} from "mocha";
import {Decoder, GSV, GsvSatellite} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GSV', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<GSV>('$GPGSV,3,1,11,03,03,111,00,04,15,270,00,06,01,010,00,13,06,292,00*74\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('GP');
			expect(decoded.sentenceId).to.equal('GSV');
			expect(decoded.messageCount).to.equal(3);
			expect(decoded.messageNumber).to.equal(1);
			expect(decoded.totalMessageCount).to.equal(11);
			const satellites = [...decoded.satellites()];
			expect(satellites).to.have.deep.members([
				new GsvSatellite(3, 3, 111, 0),
				new GsvSatellite(4, 15, 270, 0),
				new GsvSatellite(6, 1, 10, 0),
				new GsvSatellite(13, 6, 292, 0),
			]);
		});
	});
});
