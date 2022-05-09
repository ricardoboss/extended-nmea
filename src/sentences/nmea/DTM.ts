import {TalkerSentence} from "../../types/sentences/TalkerSentence";
import {RawNmeaSentence} from "../../types/sentences/RawNmeaSentence";
import {DatumCode} from "./common/DatumCode";
import {GeoCoordinate} from "../../types";
import {Helpers} from "../../helpers";
import parseGeoCoordinate = Helpers.parseGeoCoordinate;

export class DTM extends TalkerSentence {
  public static readonly ID: string = "DTM"

  constructor(data: RawNmeaSentence) {
    super(data);
  }

  public get datumCode(): DatumCode {
    return this.dataFields[0] as DatumCode;
  }

  public get subDatum(): string {
    return this.dataFields[1];
  }

  public get latitude(): GeoCoordinate {
    return parseGeoCoordinate(this.dataFields[2], this.dataFields[3]);
  }

  public get longitude(): GeoCoordinate {
    return parseGeoCoordinate(this.dataFields[4], this.dataFields[5]);
  }

  public get altitude(): number {
    return parseFloat(this.dataFields[6]);
  }

  public get referenceDatum(): string {
    return this.dataFields[7];
  }

  public get valid(): boolean {
    return super.valid && this.dataFields.length === 8;
  }

  public get invalidReason(): null|string {
    if (!super.valid) {
      return super.invalidReason;
    }

    if (this.dataFields.length !== 8) {
      return `Expected 8 fields, got ${this.dataFields.length}`;
    }

    return null;
  }
}
