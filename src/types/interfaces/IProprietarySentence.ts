import {INmeaSentence} from "./INmeaSentence";

export interface IProprietarySentence extends INmeaSentence {
	/**
	 * Returns the manufacturer id (i.e. the first field in the sentence, excluding the prefix "P").
	 */
	readonly manufacturerId: string;
}
