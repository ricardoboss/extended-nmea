import {parse} from "../extended-nmea.js";

import 'should';

describe('RDID', function () {
	it('parses', function () {
		const msg = parse("$PRDID,-1.31,7.81,47.31*68");

		msg.should.have.property('type', 'gyro');
		msg.should.have.property('sentence', 'RDID');
	});
});

