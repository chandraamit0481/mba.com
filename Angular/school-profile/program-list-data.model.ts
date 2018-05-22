import { IProgramLink } from "../shared/components/video-list/video-list.models"; 

export class ProgramDataModel {
    programDisplayName: string;
    programUrl: string;
    programLengthIdLookupName: string;
    programTest: ProgramTestModel[];
    programLink: IProgramLink[];
    programOrgId: string;
}

export class ProgramTestModel {

    programTestIdLookupName: string;
    programTestScoreAverage: string;   
}
