import {describe} from "mocha";
import {expect} from "chai";
import {GeoCoordinate} from "../../src";

describe('Utils', function () {
	describe('GeoCoordinate', function () {
		it('parses latitude', function () {
			const lat1 = new GeoCoordinate("5302.218313", "N");

			expect(lat1.degrees).to.equal(53);
			expect(lat1.minutes).to.equal(2);
			expect(lat1.seconds).to.equal(13);
			expect(lat1.quadrant).to.equal("N");
			expect(lat1.decimalDegrees).to.be.approximately(53.036971, 1e-5);
		});

		it('parses longitude', function () {
			const lon1 = new GeoCoordinate("00838.894565", "E");

			expect(lon1.degrees).to.equal(8);
			expect(lon1.minutes).to.equal(38);
			expect(lon1.seconds).to.equal(53);
			expect(lon1.quadrant).to.equal("E");
			expect(lon1.decimalDegrees).to.be.approximately(8.64824, 1e-5);
		});

		it('parses short notation', function () {
			const coord = new GeoCoordinate("0.08", "N");

			expect(coord.degrees).to.equal(0);
			expect(coord.minutes).to.equal(0);
			expect(coord.seconds).to.equal(4);
			expect(coord.quadrant).to.equal("N");
			expect(coord.decimalDegrees).to.be.approximately(0.001333, 1e-5);
		});
	});
});
