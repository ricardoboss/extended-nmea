// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

import through from "through";

const MWV = require('./codecs/MWV.js');
const VTG = require('./codecs/VTG.js');
const DBT = require('./codecs/DBT.js');
const GLL = require('./codecs/GLL.js');
const BWC = require('./codecs/BWC.js');
const GSV = require('./codecs/GSV.js');
const GSA = require('./codecs/GSA.js');
const GGA = require('./codecs/GGA.js');
const RMB = require('./codecs/RMB.js');
const RMC = require('./codecs/RMC.js');
const RSA = require('./codecs/RSA.js');
const APB = require('./codecs/APB.js');
const HDG = require('./codecs/HDG.js');
const HDT = require('./codecs/HDT.js');
const HDM = require('./codecs/HDM.js');
const RDID = require('./codecs/RDID.js');
const GRMT = require('./codecs/GRMT.js');
const VWR = require('./codecs/VWR.js');
const ROT = require('./codecs/ROT.js');

// export helpers
export const Helpers = require('./helpers.js');

const validLine = function (line) {
	// check that the line passes checksum validation
	// checksum is the XOR of all characters between $ and * in the message.
	// checksum reference is provided as a hex value after the * in the message.
	let checkVal = 0;
	const parts = line.split('*');
	for (let i = 1; i < parts[0].length; i++) {
		checkVal = checkVal ^ parts[0].charCodeAt(i);
	}

	return checkVal === parseInt(parts[1], 16);
};

export const traditionalDecoders = {
	GGA: GGA.decode,
	RMB: RMB.decode,
	RMC: RMC.decode,
	RSA: RSA.decode,
	APB: APB.decode,
	GSA: GSA.decode,
	GSV: GSV.decode,
	BWC: BWC.decode,
	DBT: DBT.decode,
	MWV: MWV.decode,
	VTG: VTG.decode,
	GLL: GLL.decode,
	HDG: HDG.decode,
	HDT: HDT.decode,
	HDM: HDM.decode,
	RDID: RDID.decode,
	GRMT: GRMT.decode,
	VWR: VWR.decode,
	ROT: ROT.decode,
};

export const encoders = {};

encoders[MWV.TYPE] = MWV;
encoders[VTG.TYPE] = VTG;
encoders[DBT.TYPE] = DBT;
encoders[GLL.TYPE] = GLL;
encoders[HDT.TYPE] = HDT;
encoders[GGA.TYPE] = GGA;
encoders[HDM.TYPE] = HDM;
encoders[ROT.TYPE] = ROT;

export function parse(line) {
	if (validLine(line)) {
		const fields = line.split('*')[0].split(',');
		let talker_id,
			msg_fmt;
		if (fields[0].charAt(1) === 'P') {
			talker_id = 'P'; // Proprietary
			msg_fmt = fields[0].substr(2);
		} else {
			talker_id = fields[0].substr(1, 2);
			msg_fmt = fields[0].substr(3);
		}
		const parser = traditionalDecoders[msg_fmt];
		if (parser) {
			const val = parser(fields);
			val.talker_id = talker_id;
			return val;
		} else {
			throw Error("Error in parsing:" + line);
		}
	} else {
		throw Error("Invalid line:" + line);
	}
}

export function encode(talker, msg) {
	if (typeof msg === 'undefined') {
		throw new Error("Can not encode undefined, did you forget msg parameter?");
	}

	let encoder = encoders[msg.type];
	if (encoder) {
		return encoder.encode(talker, msg);
	} else {
		throw Error("No encoder for type:" + msg.type);
	}
}

export function createDefaultTransformer(options) {
	const stream = through(function (data) {
		try {
			stream.queue(parse(data));
		} catch (e) {
		}
	});
	return stream;
}
