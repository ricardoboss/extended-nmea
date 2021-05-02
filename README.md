# extended-nmea
#### An extensible TypeScript library for parsing NMEA0183-like sentences.

This library implements the NMEA0183 standard as described in the document under [docs/NMEA0183.pdf][3] and provides type-safe classes and interfaces for parsing raw text into useful objects.

Extensibility means you can add your own custom/proprietary sentences using this library in your project.

---

## Usage

Simply import the decoder and use it to decode incoming data.

```typescript
import {Decoder} from "extended-nmea";

const sentence = Decoder.decode("$--ROT,0.02,A*14\r\n");

console.log(sentence.valid); // output: true
```

Every codec can have different getters:

```typescript
import {CodecROT} from "extended-nmea";

const rotSentence = Decoder.decode("$--ROT,0.02,A*14\r\n") as CodecROT;

console.log(rotSentence.rateOfTurn);    // output: 0.02
console.log(rotSentence.statusValid);   // output: true
```

As per NMEA0183 standard, query sentences and proprietary sentence decoding is also supported:

```typescript
// you can use `decode`, `decodeTalker`, `decodeQuery´ or `decodeProprietary` to get different interfaces.
const querySentence = Decoder.decodeQuery("$GPECQ,RMC\r\n");

console.log(querySentence.talkerId);    // output: "GP"
console.log(querySentence.listenerId);  // output: "EC"
console.log(querySentence.mnemonic);    // output: "RMC"
```

To support proprietary sentences and have the ability to add custom ones, you can register them before decoding:

```typescript
import {ProprietarySentence, RawNmeaSentence} from "extended-nmea";

// you can also extend TalkerSentence to add a custom sentence in the form of "$AABBB,xxx*CC", where BBB is your custom id.
class MyCustomSentence extends ProprietarySentence {
	public get firstField(): string {
		return this.fields[1];
	}
}

// use `Decoder.register` for talker sentences
Decoder.registerProprietary("ABC", MyCustomSentence);

const myCustomSentence = Decoder.decode("$PABC,123\r\n");

console.log(myCustomSentence.firstField); // output: "123"
```

You can also remove previously registered (or even stock) sentences using the `unregister` methods:

```typescript
Decoder.unregisterProprietary("ABC");
Decoder.unregister("RMC");
```

---

## Development

Any contribution, be it an issue to request features or report bugs, or a pull request, is greatly appreciated.

### Setup

Local development can be set up by first cloning this repository:

```shell
$ git clone https://github.com/ricardoboss/extended-nmea
```

Then installing the dependencies using `yarn`:

```shell
$ yarn install
```

### Testing

For testing, this library uses [mocha][1].
If you want to run tests, use `yarn run test`.
In case you want to watch for file changes and re-run all tests, execute `yarn run test:watch` and leave it running.
It will then show any failed tests while you are working the code.

Every pull request will automatically be tested using GitHub actions.
They will also only be accepted, if all existing tests succeed (or have been adjusted depending on what the PR changes).
Please also add new tests in case you add functionality.

---

## Motivation

The motivation behind this project arose when I wanted to create a web application, which parsed and then visualized
data provided in the NMEA0183 standard. After looking into some existing libraries, I forked [jamesp/node-nmea][4] and
started tinkering with the code and even opened a pull request.

When I began my original project, I wanted to harness the power of type safety from TypeScript. Since [node-nmea][4]
was _not_ type safe, it didn't play well with the rest of the code. That's why I created this version of my fork, which
is a completely new implementation with the same idea, just with TypeScript support.

---

## License

This project is licensed under the MIT license.
Please review the [LICENSE file][2] for more information.

[1]: https://mochajs.org/
[2]: https://github.com/ricardoboss/extended-nmea/blob/develop/LICENSE
[3]: https://github.com/ricardoboss/extended-nmea/blob/develop/docs/NMEA0183.pdf
[4]: https://github.com/jamesp/node-nmea
