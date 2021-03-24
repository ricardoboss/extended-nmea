import {parse} from "../extended-nmea.js";

import 'should';

describe('GSV', function () {
	it('parses', function () {
		const msg = parse("$GPGSA,A,3,12,05,25,29,,,,,,,,,9.4,7.6,5.6*37");

		msg.should.have.property('type', 'active-satellites');
		msg.should.have.property('sentence', 'GSA');
	});
});
