import {describe} from "mocha";
import {Decoder, GLL, GllPositionMode, GllStatus} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('GLL', function () {
		it('decodes values', function () {
			const decoded = Decoder.decodeTalker<GLL>('$GNGLL,5304.31151,N,00852.25683,E,154739.00,A,A*7A\r\n');

			expect(decoded.valid).to.equal(true);
			expect(decoded.talkerId).to.equal('GN');
			expect(decoded.sentenceId).to.equal('GLL');
			expect(decoded.latitude.degrees).to.equal(53);
			expect(decoded.latitude.minutes).to.equal(4);
			expect(decoded.latitude.quadrant).to.equal("N");
			expect(decoded.longitude.degrees).to.equal(8);
			expect(decoded.longitude.minutes).to.equal(52);
			expect(decoded.longitude.quadrant).to.equal("E");
			expect(decoded.time.hours).to.equal(15);
			expect(decoded.time.minutes).to.equal(47);
			expect(decoded.time.seconds).to.equal(39);
			expect(decoded.status).to.equal(GllStatus.Valid);
			expect(decoded.posMode).to.equal(GllPositionMode.Fix);
		});
	});
});
