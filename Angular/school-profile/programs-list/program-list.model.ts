export class ProgramDataModel { 
    programItemUrl: string;
    programDisplayName: string;
    programLengthIdLookupName: string;
    programTest: ProgramTestModel[];
}

export class ProgramTestModel {
    programTestIdLookupName: string;
    programTestScoreAverage: string;   
}