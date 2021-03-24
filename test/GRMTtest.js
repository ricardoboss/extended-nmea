import {parse} from "../extended-nmea.js";

import 'should';

describe('GRMT', function () {
	it('parses', function () {
		const msg = parse("$PGRMT,GPS19x-HVS Software Version 2.20,,,,,,,,*6F");

		msg.should.have.property('type', 'sensor-information');
		msg.should.have.property('sentence', 'GRMT');
	});
});
