import {encode, parse} from "../extended-nmea.js";

import 'should';

describe('MWV', function () {
	it('parses', function () {
		const msg = parse("$IIMWV,017,R,02.91,N,A*2F");

		msg.should.have.property('sentence', 'MWV');
		msg.should.have.property('type', 'wind');
		msg.should.have.property('angle', 17);
		msg.should.have.property('reference', 'R');
		msg.should.have.property('speed', 2.91);
		msg.should.have.property('units', 'N');
		msg.should.have.property('status', 'A');
	});

	it('encodes', function () {
		const nmeaMsg = encode('XX', {
			type: 'wind',
			angle: 17,
			reference: 'R',
			speed: 2.91,
			units: 'N',
			status: 'A'
		});

		nmeaMsg.should.equal("$XXMWV,017.00,R,2.91,N,A*31");
	});
});
