import {describe} from "mocha";
import {Decoder, RMC, PositionFixStatus, PrecisePositionMode} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('RMC', function () {
		it('decodes values', function () {
			const decoded1 = Decoder.decodeTalker<RMC>('$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A\r\n');
			const decoded2 = Decoder.decodeTalker<RMC>('$GNRMC,210827.000,A,5302.218392,N,00838.899443,E,0.06,18.79,070521,,,D*44\r\n');
			const decoded3 = Decoder.decodeTalker<RMC>('$GNRMC,154737.00,A,5304.31146,N,00852.25676,E,0.105,,090522,,,A,V*13\r\n');

			expect(decoded1.valid).to.equal(true);
			expect(decoded1.talkerId).to.equal('GP');
			expect(decoded1.sentenceId).to.equal('RMC');
			expect(decoded1.time.hours).to.equal(12);
			expect(decoded1.status).to.equal(PositionFixStatus.Valid);
			expect(decoded1.latitude.degrees).to.equal(48);
			expect(decoded1.latitude.minutes).to.equal(7);
			expect(decoded1.latitude.quadrant).to.equal("N");
			expect(decoded1.longitude.degrees).to.equal(11);
			expect(decoded1.longitude.minutes).to.equal(31);
			expect(decoded1.longitude.quadrant).to.equal("E");
			expect(decoded1.speedOverGround).to.equal(22.4);
			expect(decoded1.courseOverGround).to.equal(84.4);
			expect(decoded1.date.day).to.equal(23);
			expect(decoded1.date.month).to.equal(3);
			expect(decoded1.date.year).to.equal(1994);
			expect(decoded1.magneticVariation).to.equal(3.1);
			expect(decoded1.posMode).to.equal(null);

			expect(decoded2.valid).to.equal(true);
			expect(decoded2.talkerId).to.equal('GN');
			expect(decoded2.sentenceId).to.equal('RMC');
			expect(decoded2.time.hours).to.equal(21);
			expect(decoded2.status).to.equal(PositionFixStatus.Valid);
			expect(decoded2.latitude.degrees).to.equal(53);
			expect(decoded2.latitude.minutes).to.equal(2);
			expect(decoded2.latitude.quadrant).to.equal("N");
			expect(decoded2.longitude.degrees).to.equal(8);
			expect(decoded2.longitude.minutes).to.equal(38);
			expect(decoded2.longitude.quadrant).to.equal("E");
			expect(decoded2.speedOverGround).to.equal(0.06);
			expect(decoded2.courseOverGround).to.equal(18.79);
			expect(decoded2.date.day).to.equal(7);
			expect(decoded2.date.month).to.equal(5);
			expect(decoded2.date.year).to.equal(2021);
			expect(decoded2.magneticVariation).to.be.NaN;
			expect(decoded2.posMode).to.equal(PrecisePositionMode.DifferentialFix);

			expect(decoded3.valid).to.equal(true);
			expect(decoded3.talkerId).to.equal('GN');
			expect(decoded3.sentenceId).to.equal('RMC');
			expect(decoded3.time.hours).to.equal(15);
			expect(decoded3.status).to.equal(PositionFixStatus.Valid);
			expect(decoded3.latitude.degrees).to.equal(53);
			expect(decoded3.latitude.minutes).to.equal(4);
			expect(decoded3.latitude.quadrant).to.equal("N");
			expect(decoded3.longitude.degrees).to.equal(8);
			expect(decoded3.longitude.minutes).to.equal(52);
			expect(decoded3.longitude.quadrant).to.equal("E");
			expect(decoded3.speedOverGround).to.equal(0.105);
			expect(decoded3.courseOverGround).to.be.NaN;
			expect(decoded3.date.day).to.equal(9);
			expect(decoded3.date.month).to.equal(5);
			expect(decoded3.date.year).to.equal(2022);
			expect(decoded3.magneticVariation).to.be.NaN;
			expect(decoded3.posMode).to.equal(PrecisePositionMode.AutonomousFix);
		});
	});
});
