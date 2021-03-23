const should = require('should');

describe('GRMT ', function () {
	it('parses', function () {
		const msg = require("../extended-nmea.js").parse("$PGRMT,GPS19x-HVS Software Version 2.20,,,,,,,,*6F");
		msg.should.have.property('type', 'sensor-information');
		msg.should.have.property('sentence', 'GRMT');
	});
});
