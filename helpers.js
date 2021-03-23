//Copied from from https://github.com/nherment/node-nmea/blob/master/lib/Helper.js

const m_hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

export function toHexString(v) {
	let lsn;
	let msn;

	msn = (v >> 4) & 0x0f;
	lsn = (v >> 0) & 0x0f;
	return m_hex[msn] + m_hex[lsn];
}

export function padLeft(s, len, ch) {
	while (s.length < len) {
		s = ch + s;
	}
	return s;
}

// verify the checksum
export function verifyChecksum(sentence, checksum) {
	let q;
	let c1;
	let c2;
	let i;

	// skip the $
	i = 1;

	// init to first character
	c1 = sentence.charCodeAt(i);

	// process rest of characters, zero delimited
	for (i = 2; i < sentence.length; ++i) {
		c1 = c1 ^ sentence.charCodeAt(i);
	}

	// checksum is a 2 digit hex value
	c2 = parseInt(checksum, 16);

	// should be equal
	return ((c1 & 0xff) === c2);
}

// generate a checksum for  a sentence (no trailing *xx)
export function computeChecksum(sentence) {
	let c1;
	let i;

	// skip the $
	i = 1;

	// init to first character    var count;

	c1 = sentence.charCodeAt(i);

	// process rest of characters, zero delimited
	for (i = 2; i < sentence.length; ++i) {
		c1 = c1 ^ sentence.charCodeAt(i);
	}

	return '*' + toHexString(c1);
}

// =========================================
// field encoders
// =========================================

// encode latitude
// input: latitude in decimal degrees
// output: latitude in nmea format
// ddmm.mmm
export function encodeLatitude(lat) {
	let d;
	let m;
	let f;
	let h;
	let s;
	let t;
	if (lat === undefined) {
		return '';
	}

	if (lat < 0) {
		h = 'S';
		lat = -lat;
	} else {
		h = 'N';
	}
	// get integer degrees
	d = Math.floor(lat);
	// degrees are always 2 digits
	s = d.toString();
	if (s.length < 2) {
		s = '0' + s;
	}
	// get fractional degrees
	f = lat - d;
	// convert to fractional minutes
	m = (f * 60.0);
	// format the fixed point fractional minutes
	t = m.toFixed(3);
	if (m < 10) {
		// add leading 0
		t = '0' + t;
	}

	s = s + t + ',' + h;
	return s;
}

// encode longitude
// input: longitude in decimal degrees
// output: longitude in nmea format
// dddmm.mmm
export function encodeLongitude(lon) {
	let d;
	let m;
	let f;
	let h;
	let s;
	let t;

	if (lon === undefined) {
		return '';
	}

	if (lon < 0) {
		h = 'W';
		lon = -lon;
	} else {
		h = 'E';
	}

	// get integer degrees
	d = Math.floor(lon);
	// degrees are always 3 digits
	s = d.toString();
	while (s.length < 3) {
		s = '0' + s;
	}

	// get fractional degrees
	f = lon - d;
	// convert to fractional minutes and round up to the specified precision
	m = (f * 60.0);
	// minutes are always 6 characters = mm.mmm
	t = m.toFixed(3);
	if (m < 10) {
		// add leading 0
		t = '0' + t;
	}
	s = s + t + ',' + h;
	return s;
}

// 1 decimal, always meters
export function encodeAltitude(alt) {
	if (alt === undefined) {
		return ',';
	}
	return alt.toFixed(1) + ',M';
}

// 1 decimal, always meters
export function encodeGeoidalSeperation(geoidalSep) {
	if (geoidalSep === undefined) {
		return ',';
	}
	return geoidalSep.toFixed(1) + ',M';
}

// magnetic variation
export function encodeMagVar(v) {
	let a;
	let s;
	if (v === undefined) {
		return ',';
	}
	a = Math.abs(v);
	s = (v < 0) ? (a.toFixed(1) + ',E') : (a.toFixed(1) + ',W');
	return padLeft(s, 7, '0');
}

// degrees
export function encodeDegrees(d) {
	if (d === undefined) {
		return '';
	}
	return padLeft(d.toFixed(2), 6, '0');
}

export function encodeDate(d) {
	let yr;
	let mn;
	let dy;

	if (d === undefined) {
		return '';
	}
	yr = d.getUTCFullYear();
	mn = d.getUTCMonth() + 1;
	dy = d.getUTCDate();
	return padLeft(dy.toString(), 2, '0') + padLeft(mn.toString(), 2, '0') + yr.toString().substr(2);
}

export function encodeTime(d) {
	let h;
	let m;
	let s;

	if (d === undefined) {
		return '';
	}
	h = d.getUTCHours();
	m = d.getUTCMinutes();
	s = d.getUTCSeconds();
	return padLeft(h.toString(), 2, '0') + padLeft(m.toString(), 2, '0') + padLeft(s.toString(), 2, '0');
}

export function encodeKnots(k) {
	if (k === undefined) {
		return '';
	}
	return padLeft(k.toFixed(1), 5, '0');
}

export function encodeValue(v) {
	if (v === undefined) {
		return '';
	}
	return v.toString();
}

export function encodeFixed(v, f) {
	if (v === undefined) {
		return '';
	}
	return v.toFixed(f);
}

// =========================================
// field traditionalDecoders
// =========================================

// separate number and units
export function parseAltitude(alt, units) {
	let scale = 1.0;
	if (units === 'F') {
		scale = 0.3048;
	}
	return parseFloat(alt) * scale;
}

// separate degrees value and quadrant (E/W)
export function parseDegrees(deg, quadrant) {
	const q = (quadrant === 'E') ? -1.0 : 1.0;

	return parseFloat(deg) * q;
}

// fields can be empty so have to wrap the global parseFloat
export function parseFloatX(f) {
	if (f === '') {
		return 0.0;
	}
	return parseFloat(f);
}

// decode latitude
// input : latitude in nmea format
//      first two digits are degress
//      rest of digits are decimal minutes
// output : latitude in decimal degrees
export function parseLatitude(lat, hemi) {
	const h = (hemi === 'N') ? 1.0 : -1.0;
	let a;
	let dg;
	let mn;
	let l;
	a = lat.split('.');
	if (a[0].length === 4) {
		// two digits of degrees
		dg = lat.substring(0, 2);
		mn = lat.substring(2);
	} else if (a[0].length === 3) {
		// 1 digit of degrees (in case no leading zero)
		dg = lat.substring(0, 1);
		mn = lat.substring(1);
	} else {
		// no degrees, just minutes (nonstandard but a buggy unit might do this)
		dg = '0';
		mn = lat;
	}
	// latitude is usually precise to 5-8 digits
	return ((parseFloat(dg) + (parseFloat(mn) / 60.0)) * h).toFixed(8);
}

// decode longitude
// first three digits are degress
// rest of digits are decimal minutes
export function parseLongitude(lon, hemi) {
	let h;
	let a;
	let dg;
	let mn;
	h = (hemi === 'E') ? 1.0 : -1.0;
	a = lon.split('.');
	if (a[0].length === 5) {
		// three digits of degrees
		dg = lon.substring(0, 3);
		mn = lon.substring(3);
	} else if (a[0].length === 4) {
		// 2 digits of degrees (in case no leading zero)
		dg = lon.substring(0, 2);
		mn = lon.substring(2);
	} else if (a[0].length === 3) {
		// 1 digit of degrees (in case no leading zero)
		dg = lon.substring(0, 1);
		mn = lon.substring(1);
	} else {
		// no degrees, just minutes (nonstandard but a buggy unit might do this)
		dg = '0';
		mn = lon;
	}
	// longitude is usually precise to 5-8 digits
	return ((parseFloat(dg) + (parseFloat(mn) / 60.0)) * h).toFixed(8);
}

// fields can be empty so have to wrap the global parseInt
export function parseIntX(i) {
	if (i === '') {
		return 0;
	}
	return parseInt(i, 10);
}

export function parseDateTime(date, time) {
	const h = parseInt(time.slice(0, 2), 10);
	const m = parseInt(time.slice(2, 4), 10);
	const s = parseInt(time.slice(4, 6), 10);
	const D = parseInt(date.slice(0, 2), 10);
	const M = parseInt(date.slice(2, 4), 10) - 1;	 // UTC = 0..11
	let Y = parseInt(date.slice(4, 6), 10);
	// hack : GPRMC date doesn't specify century. GPS came out in 1973
	// so if year is less than 73 its 2000, otherwise 1900
	if (Y < 73) {
		Y = Y + 2000;
	} else {
		Y = Y + 1900;
	}

	return new Date(Date.UTC(Y, M, D, h, m, s));
}
