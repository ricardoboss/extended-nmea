const should = require('should');

describe('HDT parsing', function () {
	it('parse heading', function () {
		const msg = require("../extended-nmea.js").parse("$IIHDT,234.2,T*25");
		msg.should.have.property('sentence', 'HDT');
		msg.should.have.property('heading', 234.2);
	});
});

describe('HDT encoding', function () {
	it('encodes ok', function () {
		const nmeaMsg = require("../extended-nmea.js").encode('II', {
			type: 'heading-info',
			heading: 234.2
		});
		nmeaMsg.should.equal("$IIHDT,234.2,T*25");
	});
});
