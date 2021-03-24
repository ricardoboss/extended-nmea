// A NMEA-0183 parser based on the format given here: http://www.tronico.fi/OH6NT/docs/NMEA0183.pdf

import through from "through";

// export helpers
import * as ROT from "./codecs/ROT.js";
import * as VWR from "./codecs/VWR.js";
import * as GRMT from "./codecs/GRMT.js";
import * as RDID from "./codecs/RDID.js";
import * as HDM from "./codecs/HDM.js";
import * as HDT from "./codecs/HDT.js";
import * as HDG from "./codecs/HDG.js";
import * as APB from "./codecs/APB.js";
import * as RSA from "./codecs/RSA.js";
import * as RMC from "./codecs/RMC.js";
import * as RMB from "./codecs/RMB.js";
import * as GGA from "./codecs/GGA.js";
import * as GSA from "./codecs/GSA.js";
import * as GSV from "./codecs/GSV.js";
import * as BWC from "./codecs/BWC.js";
import * as GLL from "./codecs/GLL.js";
import * as DBT from "./codecs/DBT.js";
import * as VTG from "./codecs/VTG.js";
import * as MWV from "./codecs/MWV.js";

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
