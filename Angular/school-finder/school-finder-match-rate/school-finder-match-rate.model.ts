
export class SchoolFinderMatchRateModel {
    matchRate: number;
    matchRateText: string;
    programId: string;
    programDisplayName: string;
    programLength: string;    
    programYearsWorkExperience: string;    
    programCompleteAddress: string;
    itemUrl: string;
    programSchoolName: string;
    schoolLogo: string;
    programInstitutionName: string;
    programGmatScore: string;
    itemId: string;
    schoolUrl: string;
}

export class SchoolFinderModel {
    matchData: SchoolFinderMatchRateModel[];
    metaData: any;
    totalRows: number;
    page: number;
}
