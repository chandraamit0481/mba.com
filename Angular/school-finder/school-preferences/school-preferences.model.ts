import { ILookupModel } from "../school-finder.model";

export class SchoolPreferencesModel {
    programCountryName: ILookupModel[];
    desiredLocation: ILookupModel[];
    programAreaOfStudy: ILookupModel[];
    location: ILookupModel[];
    programDeliveryFormat: ILookupModel[];
    programType: ILookupModel[];
    programDegree: ILookupModel[];
    programLength: ILookupModel[];
    programInitiative: string;
}
