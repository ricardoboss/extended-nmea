import {describe} from "mocha";
import {Decoder} from "../../../src";
import {CodecROT} from "../../../src/codecs/nmea/CodecROT";
import {expect} from "chai";

describe('Sentence', function () {
	describe('ROT', function () {
		it('decodes values', function () {
			const decodedRot = Decoder.decode('$--ROT,-0.5,A*0E\r\n') as CodecROT;

			expect(decodedRot.valid).to.equal(true);
			expect(decodedRot.talkerId).to.equal('--');
			expect(decodedRot.sentenceId).to.equal('ROT');
			expect(decodedRot.rateOfTurn).to.equal(-0.5);
			expect(decodedRot.statusValid).to.equal(true);
		});
	});
});
