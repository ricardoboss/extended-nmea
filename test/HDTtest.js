import {encode, parse} from "../extended-nmea.js";

import 'should';

describe('HDT', function () {
	it('parses', function () {
		const msg = parse("$IIHDT,234.2,T*25");

		msg.should.have.property('sentence', 'HDT');
		msg.should.have.property('heading', 234.2);
	});

	it('encodes', function () {
		const nmeaMsg = encode('II', {
			type: 'heading-info',
			heading: 234.2
		});

		nmeaMsg.should.equal("$IIHDT,234.2,T*25");
	});
});
