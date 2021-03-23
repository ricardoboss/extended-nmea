import * as nmea from "../extended-nmea.js";

import 'should';

describe('NMEA', function () {
	it('throws error on undefined parameter', function () {
		(function () {
			nmea.encode(undefined);
		}).should.throw("Can not encode undefined, did you forget msg parameter?");
	});

	it('throws error on unknown type', function () {
		(function () {
			nmea.encode('II', {type: "foo"});
		}).should.throw("No encoder for type:foo");
	});
});
