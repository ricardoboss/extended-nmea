import {describe} from "mocha";
import {RMC, Decoder} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('RMC', function () {
		it('decodes values', function () {
			const decodedRot = Decoder.decodeTalker<RMC>('$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A\r\n');

			expect(decodedRot.valid).to.equal(true);
			expect(decodedRot.talkerId).to.equal('GP');
			expect(decodedRot.sentenceId).to.equal('RMC');
			expect(decodedRot.time.hours).to.equal(12);
			expect(decodedRot.status).to.equal('A');
			expect(decodedRot.latitude).to.equal(4807.038);
			expect(decodedRot.north).to.equal(true);
			expect(decodedRot.longitude).to.equal(1131);
			expect(decodedRot.east).to.equal(true);
			expect(decodedRot.speedOverGround).to.equal(22.4);
			expect(decodedRot.trackingAngle).to.equal(84.4);
			expect(decodedRot.date.day).to.equal(23);
			expect(decodedRot.date.month).to.equal(3);
			expect(decodedRot.date.year).to.equal(1994);
			expect(decodedRot.magneticVariation).to.equal(3.1);
		});
	});
});
