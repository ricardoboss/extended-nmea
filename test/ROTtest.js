import {encode, parse} from "../extended-nmea.js";

import 'should';

describe('ROT', function () {
	it('parses', function () {
		const msg = parse("$--ROT,-2.53,A*3F");

		msg.should.have.property('type', 'rate-of-turn');
		msg.should.have.property('sentence', 'ROT');
		msg.should.have.property('rateOfTurn', -2.53);
	});

	it('encodes', function () {
		const msg = encode('--', {
			type: 'rate-of-turn',
			rateOfTurn: -2.53452
		});

		msg.should.equal('$--ROT,-2.53,A*3F');
	});
});
