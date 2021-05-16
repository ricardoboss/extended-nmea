import {describe} from "mocha";
import {Decoder, VTG} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('VTG', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<VTG>('$GPVTG,309.62,T,,M,0.13,N,0.2,K*6E\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('GP');
			expect(decoded.sentenceId).to.equal('VTG');
			expect(decoded.trackingAngle).to.equal(309.62);
			expect(decoded.magneticTrackingAngle).to.equal(0);
			expect(decoded.speed).to.equal(0.13);
			expect(decoded.speedKmh).to.equal(0.2);
		});
	});
});
