import {padLeft, parseDateTime} from "../helpers.js";

import 'should';

describe('helpers', function () {
	it('pads left', function () {
		const msg = padLeft("abc", 5, " ");
		msg.should.equal("  abc");
	});

	it('parses DateTime', function () {
		// Input = 3rd of April of 2005
		const dt = parseDateTime("030405", "112233");
		(+dt.getUTCDate()).should.equal(3);
		(+dt.getUTCMonth() + 1).should.equal(4);
		(+dt.getUTCFullYear()).should.equal(2005);
		(+dt.getUTCHours()).should.equal(11);
		(+dt.getUTCMinutes()).should.equal(22);
		(+dt.getUTCSeconds()).should.equal(33);
	});
});
