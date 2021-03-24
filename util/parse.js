#!/usr/bin/env node

import lineReader from "line-reader";
import nmea from "../extended-nmea.js";

lineReader.eachLine(process.argv[2], function (line, last) {
	const sentence = nmea.parse(line);
	if (sentence !== undefined) {
		console.log(sentence);
	} else {
		console.error("Parse error:" + line);
	}
	return !last;
});
