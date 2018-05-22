export class CandidateProfileModel {
    birthDate: string;
    businessSchoolStatus: string;
    careerOptin: string;
    contactByPhone: boolean;
    contactBySMS: boolean;
    countryID: number;
    dayPhoneCountryID: string;
    dayPhoneExtension: string;
    email: string;
    enrolledBusinessSchoolCode: string;
    enrolledBusinessSchoolOther: string;
    ethnicityID: string;
    eveningPhoneCountryID: string;
    eveningPhoneExtension: string;
    eveningPhoneNumber: string;
    faxPhoneCountryID: string;
    faxPhoneNumber: string;
    firstName: string;
    firstTimeAppUser: boolean;
    formattedBirthDate: string;
    fullName: string;
    fullOrPartTimeStudentID: string;
    functExpAfterDegreeID: string;

    //profile
    pvueAddress1: string;
    pvueAddress2: string;
    pvueAddress3: string;
    pvueCandidateID: string;
    pvueCity: string;
    pvueCountryID: string;
    pvueCountryName: string;
    pvueEmail: string;
    pvueFirstName: string;
    pvueLastName: string;
    pvueFullName: string;
    pvuePostalCode: string;
    dayPhoneNumber: string;
    pvueStateProvinceID: string;
    pvueStateProvince: string;
    pvueCountryCitizenship: string;
    nativeLanguageID: number;
    nativeLanguage: string;
    cityStateProvince: string;
    fullAddress: string;
    dominantType: string;
    genderID: number;
    gmassEligibilityDate: string;
    gmassOptin: string;
    gmassOptinWasOptedIn: boolean;
    gmatOptin: string;
    gmatid: string;
    hasRegisteredForGMAT: boolean;
    hasTakenGMAT: boolean;
    homeAddress1: string;
    homeAddress2: string;
    homeAddress3: string;
    homeCity: string;
    homeCountryID: string;
    homePostalCode: string;
    homeStateProvinceID: string;
    howMBAPursuedID: string;
    identityGuid: string;
    identityID: string;
    isAuthenticated: boolean;
    isOptedInForAppBuilder: boolean;
    lastName: string;
    mbaAreaOfConcentrationID: string;
    mbaDegreePursuedID: number;
    mbaStartDate: string;
    mbausaStudyRegionsID: string;
    middleName: string;
    migrated: boolean;
    notAttendingBusinessSchoolReason: string;
    participationInSurveysOptin: boolean;
    prevGmassOptin: boolean;
    pvueMappingStatus: string;
    roles: string;
    secondaryContactID: string;
    stateID: string;
    userAccessKey: string;
    workFullTimeWhilePursueID: number;

    //Work Experience
    yearsOfWorkExperienceID: string;
    yearsOfWorkExperienceName: string;
    functExpBeforeDegreeID: string;
    functExpBeforeDegree: string;
    indExpAfterDegreeID: string;
    indExpBeforeDegreeID: string;
    indExpBeforeDegree: string;
    militaryService: string;

    //Current or Previous Degrees
    highestEducationLevelID: string;
    highestEducationLevel: string;
    undergraduateInstitutionID: string;
    undergraduateInstitution: string;
    undergradGraduationDate: string;
    undergraduateMajorID: string;
    undergraduateMajor: string;
    undergradGPA: string;

    // weitage
    total: number;

    //Graduate School Plans
    formattedMBAStartDate: string;
    mbaWorldStudyRegions: string;
    mbaDegreePursued: string;
    mbaAreaOfConcentration: string;
    howMBAPursued: string;
    fullOrPartTimeStudent: string;
    workFullTimeWhilePursue: string;
    functExpAfterDegree: string;
    indExpAfterDegree: string;
    segmentation: string;
}

export class AccommodationText {
    newRequestMessage: string;
    decisionMadeMessage: string;
    underReviewMessage: string;
    accommodationLink: string;
    accommodationLinkText: string;
}
