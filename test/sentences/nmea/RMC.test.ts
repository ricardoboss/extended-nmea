import {describe} from "mocha";
import {Decoder, RMC, RmcMode} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('RMC', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<RMC>('$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A\r\n');
			const decoded2 = Decoder.decodeTalker<RMC>('$GNRMC,210827.000,A,5302.218392,N,00838.899443,E,0.06,18.79,070521,,,D*44\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('GP');
			expect(decoded1.sentenceId).to.equal('RMC');
			expect(decoded1.time.hours).to.equal(12);
			expect(decoded1.active).to.equal(true);
			expect(decoded1.latitude).to.equal(4807.038);
			expect(decoded1.north).to.equal(true);
			expect(decoded1.longitude).to.equal(1131);
			expect(decoded1.east).to.equal(true);
			expect(decoded1.speedOverGround).to.equal(22.4);
			expect(decoded1.trackingAngle).to.equal(84.4);
			expect(decoded1.date.day).to.equal(23);
			expect(decoded1.date.month).to.equal(3);
			expect(decoded1.date.year).to.equal(1994);
			expect(decoded1.magneticVariation).to.equal(3.1);
			expect(decoded1.mode).to.equal(null);

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('GN');
			expect(decoded2.sentenceId).to.equal('RMC');
			expect(decoded2.time.hours).to.equal(21);
			expect(decoded2.active).to.equal(true);
			expect(decoded2.latitude).to.equal(5302.218392);
			expect(decoded2.north).to.equal(true);
			expect(decoded2.longitude).to.equal(838.899443);
			expect(decoded2.east).to.equal(true);
			expect(decoded2.speedOverGround).to.equal(0.06);
			expect(decoded2.trackingAngle).to.equal(18.79);
			expect(decoded2.date.day).to.equal(7);
			expect(decoded2.date.month).to.equal(5);
			expect(decoded2.date.year).to.equal(2021);
			expect(decoded2.magneticVariation).to.be.NaN;
			expect(decoded2.mode).to.equal(RmcMode.Differential);
		});
	});
});
