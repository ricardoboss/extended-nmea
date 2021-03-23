const should = require('should');

describe('HDM parsing', function () {
	it('parse heading', function () {
		const msg = require("../extended-nmea.js").parse("$IIHDM,201.5,M*24");
		msg.should.have.property('sentence', 'HDM');
		msg.should.have.property('heading', 201.5);
	});
});

describe('HDM encoding', function () {
	it('encodes ok', function () {
		const nmeaMsg = require("../extended-nmea.js").encode('II', {
			type: 'heading-info-magnetic',
			heading: 201.5
		});
		nmeaMsg.should.equal("$IIHDM,201.5,M*24");
	});
});
