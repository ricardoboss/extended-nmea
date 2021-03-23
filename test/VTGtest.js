import {encode, parse} from "../extended-nmea.js";

import 'should';

describe('VTG', function () {
	it('parses ok', function () {
		const msg = parse("$IIVTG,210.43,T,210.43,M,5.65,N,,,A*67");

		msg.should.have.property('sentence', 'VTG');
		msg.should.have.property('type', 'track-info');
		msg.should.have.property('trackTrue', 210.43);
		msg.should.have.property('trackMagnetic', 210.43);
		msg.should.have.property('speedKnots', 5.65);
	});

	it('encodes ok', function () {
		const nmeaMsg = encode('XX', {
			type: 'track-info',
			trackTrue: 210.43,
			trackMagnetic: 209.43,
			speedKnots: 2.91
		});

		nmeaMsg.should.equal("$XXVTG,210.43,T,209.43,M,2.91,N,,,A*63");
	});
});
