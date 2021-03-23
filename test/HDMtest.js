import {encode, parse} from "../extended-nmea.js";

import 'should';

describe('HDM', function () {
	it('parses', function () {
		const msg = parse("$IIHDM,201.5,M*24");

		msg.should.have.property('sentence', 'HDM');
		msg.should.have.property('heading', 201.5);
	});

	it('encodes', function () {
		const nmeaMsg = encode('II', {
			type: 'heading-info-magnetic',
			heading: 201.5
		});

		nmeaMsg.should.equal("$IIHDM,201.5,M*24");
	});
});
