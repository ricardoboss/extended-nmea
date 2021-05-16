import {describe} from "mocha";
import {expect} from "chai";
import {Helpers} from "../src/helpers";

describe('Helpers', function () {
	describe('xorChecksum', function () {
		it('should calculate the correct checksum', function () {
			expect(Helpers.xorChecksum('--ROT,0.12,A')).to.equal('15');
			expect(Helpers.xorChecksum('--HDT,359.9,T')).to.equal('24');
			expect(Helpers.xorChecksum('--NAV,0.05,2.3')).to.equal('6D');
		});

		it('should return 0 for empty strings', function () {
			expect(Helpers.xorChecksum('')).to.equal('00');
		});

		it('should throw for everything other than string', function () {
			expect(Helpers.xorChecksum.bind(Helpers, 0)).to.throw("Cannot use arguments of type 'number' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, null)).to.throw("Cannot use arguments of type 'object' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, {'test': true})).to.throw("Cannot use arguments of type 'object' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, [1, 2, 3])).to.throw("Cannot use arguments of type 'object' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, undefined)).to.throw("Cannot use arguments of type 'undefined' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, true)).to.throw("Cannot use arguments of type 'boolean' as input.");
			expect(Helpers.xorChecksum.bind(Helpers, () => {})).to.throw("Cannot use arguments of type 'function' as input.");
		});
	})
});
