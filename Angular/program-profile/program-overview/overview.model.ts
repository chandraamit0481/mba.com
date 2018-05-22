import { IValue } from "../../shared/models/common.models";

export class ProgramOverviewDataModel {
    programFinancialAidAvailable: string;
    programFullyFunded: string;
    programTest: ProgramTest[];
    programCost: ProgramCost[];
    programCreditsRequired: string;
    programWorkExperience: ProgramWorkExperience[];
    programEmployment: ProgramEmployment[];
    programSizeAverage: number;
    programRollingAdmissions: boolean;
}

export class ProgramTest {
    programTestId: IValue<string>;
    programTestScoreAverage: IValue<string>;
    programTestIdLookupName: IValue<string>;
    programHeads: IValue<string>;
}

export class ProgramCost {
    programCostCategoryId: IValue<string>;
    programCostAmount: IValue<string>;
    programCostPeriodId: IValue<string>;
    programCostUnit: IValue<string>;
    programCostCurrencyId: IValue<string>;
    programCostCategoryIdLookupName: IValue<string>;
    programCostPeriodIdLookupName: IValue<string>;
    programCostCurrencyIdLookupName: IValue<string>;
    programHeads: IValue<string>;

}

export class ProgramWorkExperience {
    programWorkExperienceTypeId: IValue<string>;
    programWorkExperienceYears: IValue<string>;
    programWorkExperienceTypeIdLookupName: IValue<string>;
    programHeads: IValue<string>;
}

export class ProgramEmployment {
    programEmploymentMonths: IValue<string>;
    programEmploymentWithinXMonths: IValue<string>;
    programHeads: IValue<string>;
}

