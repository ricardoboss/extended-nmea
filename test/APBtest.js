import {parse} from "../extended-nmea.js";

import 'should';

describe('GGA', function () {
	it('parses', function () {
		const msg = parse("$GPAPB,A,A,0.10,R,N,V,V,011,M,DEST,011,M,011,M*3C");
		msg.should.have.property('type', 'autopilot-b');
		msg.should.have.property('sentence', 'APB');
	});
});
