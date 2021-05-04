import {describe} from "mocha";
import {RMC, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('RMC', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<RMC>('$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('GP');
			expect(decoded.sentenceId).to.equal('RMC');
			expect(decoded.time.hours).to.equal(12);
			expect(decoded.status).to.equal('A');
			expect(decoded.latitude).to.equal(4807.038);
			expect(decoded.north).to.equal(true);
			expect(decoded.longitude).to.equal(1131);
			expect(decoded.east).to.equal(true);
			expect(decoded.speedOverGround).to.equal(22.4);
			expect(decoded.trackingAngle).to.equal(84.4);
			expect(decoded.date.day).to.equal(23);
			expect(decoded.date.month).to.equal(3);
			expect(decoded.date.year).to.equal(1994);
			expect(decoded.magneticVariation).to.equal(3.1);
		});
	});
});
