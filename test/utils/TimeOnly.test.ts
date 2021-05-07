import {describe} from "mocha";
import {expect} from "chai";
import {TimeOnly} from "../../src";

describe('Utils', function () {
	describe('TimeOnly', function () {
		it('calculates correct values from milliseconds', function () {
			const max = new TimeOnly(86399999);
			const min = new TimeOnly(0);
			const test1 = new TimeOnly(1);
			const test2 = new TimeOnly(10008371);

			expect(max.totalMilliseconds).to.equal(86399999);
			expect(max.totalSeconds).to.equal(86399.999);
			expect(max.totalMinutes).to.equal(1439.9999833333334);
			expect(max.totalHours).to.equal(23.999999722222224);
			expect(max.hours).to.equal(23);
			expect(max.minutes).to.equal(59);
			expect(max.seconds).to.equal(59);
			expect(max.milliseconds).to.equal(999);

			expect(min.totalMilliseconds).to.equal(0);
			expect(min.totalSeconds).to.equal(0);
			expect(min.totalMinutes).to.equal(0);
			expect(min.totalHours).to.equal(0);
			expect(min.hours).to.equal(0);
			expect(min.minutes).to.equal(0);
			expect(min.seconds).to.equal(0);
			expect(min.milliseconds).to.equal(0);

			expect(test1.totalMilliseconds).to.equal(1);
			expect(test1.totalSeconds).to.equal(0.001);
			expect(test1.totalMinutes).to.be.approximately(1.6e-5, 1e-6);
			expect(test1.totalHours).to.be.approximately(2.77e-7, 1e-9);
			expect(test1.hours).to.equal(0);
			expect(test1.minutes).to.equal(0);
			expect(test1.seconds).to.equal(0);
			expect(test1.milliseconds).to.equal(1);

			expect(test2.totalMilliseconds).to.equal(10008371);
			expect(test2.totalSeconds).to.equal(10008.371);
			expect(test2.totalMinutes).to.be.approximately(166.80618, 1e-5);
			expect(test2.totalHours).to.be.approximately(2.78010, 1e-5);
			expect(test2.hours).to.equal(2);
			expect(test2.minutes).to.equal(46);
			expect(test2.seconds).to.equal(48);
			expect(test2.milliseconds).to.equal(371);
		});

		it('calculates correct values from different combinations', function () {
			const test = new TimeOnly(902, 23, 54, 1);

			expect(test.totalMilliseconds).to.equal(6863902);
			expect(test.totalSeconds).to.equal(6863.902);
			expect(test.totalMinutes).to.be.approximately(114.39836, 1e-5);
			expect(test.totalHours).to.be.approximately(1.90663, 1e-5);
			expect(test.hours).to.equal(1);
			expect(test.minutes).to.equal(54);
			expect(test.seconds).to.equal(23);
			expect(test.milliseconds).to.equal(902);
		});

		it('throws an error for values out of range', function () {
			expect(() => new TimeOnly(-1)).to.throw("Cannot create TimeOnly instance with less than TimeOnly.MIN_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(0, -1)).to.throw("Cannot create TimeOnly instance with less than TimeOnly.MIN_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(0, 0, -1)).to.throw("Cannot create TimeOnly instance with less than TimeOnly.MIN_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(0, 0, 0, -1)).to.throw("Cannot create TimeOnly instance with less than TimeOnly.MIN_TOTAL_MILLIS milliseconds.");

			expect(() => new TimeOnly(0, 0, 0, 24)).to.throw("Cannot create TimeOnly instance with more than TimeOnly.MAX_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(0, 0, 60, 23)).to.throw("Cannot create TimeOnly instance with more than TimeOnly.MAX_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(0, 60, 59, 23)).to.throw("Cannot create TimeOnly instance with more than TimeOnly.MAX_TOTAL_MILLIS milliseconds.");
			expect(() => new TimeOnly(1000, 59, 59, 23)).to.throw("Cannot create TimeOnly instance with more than TimeOnly.MAX_TOTAL_MILLIS milliseconds.");
		});

		it('throws an error for invalid values', function () {
			expect(() => new TimeOnly(null)).to.throw("Cannot create TimeOnly instance with values other than numbers.");

			// @ts-ignore
			expect(() => new TimeOnly([123])).to.throw("Cannot create TimeOnly instance with values other than numbers.");

			// @ts-ignore
			expect(() => new TimeOnly({abc: 123})).to.throw("Cannot create TimeOnly instance with values other than numbers.");

			// @ts-ignore
			expect(() => new TimeOnly("test")).to.throw("Cannot create TimeOnly instance with values other than numbers.");
		});
	});
});
