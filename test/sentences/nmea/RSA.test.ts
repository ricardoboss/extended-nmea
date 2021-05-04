import {describe} from "mocha";
import {ROT, Decoder, RSA} from "../../../src";
import {expect} from "chai";

describe('Sentence', function () {
	describe('RSA', function () {
		it('decodes values', function () {
			const decodedSingle = Decoder.decodeTalker<RSA>('$--RSA,-0.5,A*07\r\n');
			const decodedDouble = Decoder.decodeTalker<RSA>('$--RSA,-0.5,A,-0.4,A*41\r\n');

			expect(decodedSingle.valid).to.equal(true);
			expect(decodedSingle.talkerId).to.equal('--');
			expect(decodedSingle.sentenceId).to.equal('RSA');
			expect(decodedSingle.rudder).to.equal(-0.5);
			expect(decodedSingle.starboardRudder).to.equal(-0.5);

			expect(decodedDouble.valid).to.equal(true);
			expect(decodedDouble.talkerId).to.equal('--');
			expect(decodedDouble.sentenceId).to.equal('RSA');
			expect(decodedDouble.rudder).to.equal(-0.5);
			expect(decodedDouble.starboardRudder).to.equal(-0.5);
			expect(decodedDouble.portRudder).to.equal(-0.4);
		});
	});
});
