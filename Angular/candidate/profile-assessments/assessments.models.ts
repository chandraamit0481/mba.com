import { IBaseModel, IValue } from "../../shared/models/common.models";

export class AssessmentsModel {
    pastExam: IBaseModel<IAssessmentAttributes>[];
    futureExam: IBaseModel<IAssessmentAttributes>[];
    latestPastActiveExamId:string
    constructor() {
        this.futureExam = <IBaseModel<IAssessmentAttributes>[]>[];
        this.pastExam = <IBaseModel<IAssessmentAttributes>[]>[];
    }
}

export interface IAssessment {
    appointments: IBaseModel<IAssessmentAttributes>[];
}

export interface IAssessmentAttributes {
    appointmentID: IValue<string>;
    testCenterName: IValue<string>;
    testCenterCity: IValue<string>;
    testCenterState: IValue<string>;
    testCenterCountry: IValue<string>;
    scheduledApptDateTime: IValue<Date>;
    timestamp: IValue<Date>;
    status: IValue<string>;
    testCenterPhone: IValue<string>;
    testCenterDirections: IValue<string>;
    dateScoreReportActivated: IValue<string>;
    apptEvent: IValue<string>;
    actions: IAssessmentAction[];
}

export interface IAssessmentAction {
    url: string;
    text: string;
}