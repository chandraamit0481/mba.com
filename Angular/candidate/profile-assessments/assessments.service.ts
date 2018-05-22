import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { AssessmentsModel, IAssessment, IAssessmentAttributes, IAssessmentAction } from "./assessments.models";
import { EnumAssessmentType, EnumAssessmentStatus, EnumAssessmentEvent, EnumAssessmentAction } from "./assessments.enums";
import { IBaseModel } from "../../shared/models/common.models";
import { BaseService } from '../../shared/services/base.service';
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { SiteCoreConfig } from '../../shared/config/sitecore.config';

@Injectable()
export class AssessmentsService extends BaseService {
    private model: AssessmentsModel;
    private dateToCompare: Date;
    private allowedScoreCancelTimeFrame: number;
    constructor(private http: HttpService, private sitecoreConfig: SiteCoreConfig) {
        super();
        this.dateToCompare = new Date();
        this.allowedScoreCancelTimeFrame = Number(this.sitecoreConfig.allowedScoreCancelTimeFrame);
    }



    getAssessments(config: any): Observable<AssessmentsModel> {

        return this.http.getData<IAssessment[]>(config).map(response => {
            this.model = new AssessmentsModel();
            if (this.hasResults(response, "appointments")) {
                response.data[0].appointments.map(item => {
                    if (item.fields) {
                        let type = this.assessmentType(item);
                        item.fields.appointmentID = item.id;
                        switch (type) {
                            case EnumAssessmentType.Past: {
                                item.fields.actions = <IAssessmentAction[]>[];
                                let action = <IAssessmentAction>{};
                                if (item.fields && this.getValue(item.fields.status)) {
                                    switch (item.fields.status.value.toUpperCase()) {
                                        case EnumAssessmentStatus.NA:
                                            {
                                                if (item.fields && item.fields.scheduledApptDateTime.value) {
                                                    if (this.hoursDiff(item.fields.scheduledApptDateTime.value, this.dateToCompare) <= this.allowedScoreCancelTimeFrame) {
                                                        action.text = EnumAssessmentAction.CancelScore;
                                                        item.fields.actions.push(action);
                                                    }
                                                }
                                                break;
                                            }
                                        case EnumAssessmentStatus.Reportable:
                                            {
                                                if (item.fields && item.fields.scheduledApptDateTime.value) {
                                                    if (this.monthDiff(item.fields.scheduledApptDateTime.value, this.dateToCompare) < 60) {
                                                        action = <IAssessmentAction>{};
                                                        action.text = EnumAssessmentAction.ViewOfficialScore;
                                                        item.fields.actions.push(action);
                                                        this.model.latestPastActiveExamId = this.model.latestPastActiveExamId || this.getValue(item.fields.appointmentID);
                                                    }
                                                }
                                                break;
                                            }
                                        case EnumAssessmentStatus.ScoreCancelled:
                                            {
                                                if (item.fields && item.fields.scheduledApptDateTime.value) {
                                                    if (this.monthDiff(item.fields.scheduledApptDateTime.value, this.dateToCompare) <= 59) {
                                                        action.text = EnumAssessmentAction.ReinstateScore;
                                                        item.fields.actions.push(action);
                                                    }
                                                }
                                                break;
                                            }

                                        case EnumAssessmentStatus.Cancelled:
                                            {
                                                //No Action required as per 410
                                                break;
                                            }
                                        default: {
                                            item.fields.status.value = "";
                                        }
                                    }
                                }
                                this.model.pastExam.push(item);
                                break;
                            }
                            case EnumAssessmentType.Future: {
                                item.fields.actions = <IAssessmentAction[]>[];
                                let action = <IAssessmentAction>{};
                                if (item.fields && this.getValue(item.fields.status)) {
                                    switch (this.getValue(item.fields.status).toUpperCase()) {
                                        case EnumAssessmentStatus.New:
                                        case EnumAssessmentStatus.Scheduled:
                                        case EnumAssessmentStatus.Rescheduled:
                                            {
                                                action.text = EnumAssessmentAction.Reschedule;
                                                action.url = ""; //TODO: Would be define in another user story
                                                item.fields.actions.push(action);
                                                action = <IAssessmentAction>{};
                                                action.text = EnumAssessmentAction.Cancel;
                                                item.fields.actions.push(action);
                                                if (this.getValue(item.fields.status).toUpperCase() === EnumAssessmentStatus.New) {
                                                    item.fields.status.value = config.newAppointmentStatus;
                                                }
                                                break;
                                            }
                                    }
                                }
                                this.model.futureExam.push(item);
                                break;
                            }
                        }
                    }
                });

                this.model.pastExam = this.filterRecords(this.model.pastExam, config.maxRecords);
                this.model.futureExam = this.filterRecords(this.model.futureExam, config.maxRecords);
                return this.model;
            }

        });
    }

    processedAssessment(assessmentConfig: any, scoreAccConfig: any, testResultConfig: any): Observable<AssessmentsModel> {

        return this.getAssessments(assessmentConfig).mergeMap(response => {
            let ids = response.pastExam.map(item => {
                if (item.fields) {
                    let fields = item.fields;
                    let apptEvent = this.getValue(fields.apptEvent).toUpperCase();
                    let appDate = fields.scheduledApptDateTime.value;
                    if ((apptEvent === EnumAssessmentEvent.ScoreReportable || apptEvent === EnumAssessmentEvent.CandCancel || apptEvent === EnumAssessmentEvent.HoldRelease || apptEvent === EnumAssessmentEvent.ScorePending || apptEvent === EnumAssessmentEvent.Unrevoked) && appDate >= new Date('01-Oct-2013')) {
                        return this.getValue(fields.appointmentID);
                    }
                }
            }).filter(n => { return n !== undefined; });

            if (ids && ids.length) {
                testResultConfig.registrationID = OperatorsEnum.In + " " + ids.join(",");
                return this.http.getData(testResultConfig).mergeMap(result => {
                    let tableKey = "TestResults";
                    if (this.hasResults(result, tableKey)) {
                        let resultIds = result.data[0][tableKey].map(r => {
                            if (r.fields) {
                                return this.getValue(r.fields.registrationID);
                            }
                        }).filter(n => { return n !== undefined; });
                        if (resultIds && resultIds.length) {
                            //change config
                            scoreAccConfig.appointmentID = OperatorsEnum.In + " " + resultIds.join(",");
                            return this.http.getData(scoreAccConfig).map(score => {
                                let tableKey = "ScoreReportActivation";
                                if (this.hasResults(score, tableKey)) {
                                    let dateToValidate = new Date();
                                    dateToValidate.setFullYear(dateToValidate.getFullYear() - 5);
                                    let esrIds = score.data[0][tableKey].map(item => {
                                        if (item.fields) {
                                            let fields = item.fields;
                                            let dateActivated = new Date(this.getValue(fields.DateActivated));
                                            if (dateActivated > dateToValidate) {
                                                return this.getValue(fields.AppointmentID);
                                            }
                                        }
                                    }).filter(n => { return n !== undefined; });
                                    let exams = response.pastExam.filter(f => resultIds.includes(this.getValue(f.fields.appointmentID)));
                                    //esrids  has all the ids to show view ESR
                                    exams.map(e => {
                                        e.fields.actions = e.fields.actions || <IAssessmentAction[]>[];
                                        let hasESR = esrIds.find(esr => this.getValue(e.fields.appointmentID) === esr);

                                        let action = <IAssessmentAction>{};
                                        if (hasESR) {
                                            action.text = EnumAssessmentAction.ViewESR;
                                        } else {
                                            action.text = EnumAssessmentAction.EnterESRCode;
                                        }
                                        e.fields.actions.push(action);
                                    });
                                } else {
                                    let exams = response.pastExam.filter(f => resultIds.includes(this.getValue(f.fields.appointmentID)));
                                    let action = <IAssessmentAction>{};
                                    exams.map(e => {
                                        e.fields.actions = e.fields.actions || <IAssessmentAction[]>[];
                                        let action = <IAssessmentAction>{};
                                        action.text = EnumAssessmentAction.EnterESRCode;
                                        e.fields.actions.push(action);
                                    });
                                }
                                return response;
                            });
                        } else {
                            return Observable.of(response);
                        }

                    } else {
                        return Observable.of(response);
                    }
                });
            } else {
                return Observable.of(response);
            }

        });
    }

    getGMATConnectLink(config: any): Observable<string> {
        return this.http.getData(config).map(response => {
            let key = "gmatconnectlink";
            let retVal = "";
            if (this.hasResults(response, key)) {
                let field = response.data[0][key][0].fields;
                if (field) {
                    retVal = this.getValue(field.ConnectLink);
                }
            }
            return retVal;
        });
    }

    getScoreReportKey(config: any): Observable<string> {
        return this.http.getData(config).map(response => {
            let retVal = "";
            const key: string = 'official-score-report-key';
            if (this.hasResults(response, key) && response.data[0][key][0].fields) {
                retVal = this.getValue(response.data[0][key][0].fields.hashKey);
            }
            return retVal;
        });
    }

    private monthDiff(d1: Date, d2: Date): number {
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    private hoursDiff(dt1: Date, dt2: Date): number {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60);
        return diff;
    }

    private filterRecords(records: IBaseModel<IAssessmentAttributes>[], maxRecords: number): IBaseModel<IAssessmentAttributes>[] {
        records = this.removeDuplicate(records);
        if (records.length > maxRecords) {
            records = records.slice(0, maxRecords);
        }
        return records;
    }

    private removeDuplicate(assessmentlist: IBaseModel<IAssessmentAttributes>[]): IBaseModel<IAssessmentAttributes>[] {
        assessmentlist = assessmentlist.sort(this.sortTimestamp);
        let uniqueAssessmentList = <IBaseModel<IAssessmentAttributes>[]>[];
        assessmentlist.map(checkProgramLink => {
            let x = uniqueAssessmentList.filter(p => this.getValue(p.fields.appointmentID) === this.getValue(checkProgramLink.fields.appointmentID));
            if (x.length === 0) {
                uniqueAssessmentList.push(checkProgramLink);
            }
        });
        uniqueAssessmentList = uniqueAssessmentList.sort(this.sortScheduledApptDateTime);
        return uniqueAssessmentList;
    }

    private sortTimestamp(a, b) {
        if (a.fields && b.fields) {
            let timestampA = a.fields.timestamp.value;
            let timestampB = b.fields.timestamp.value;
            let comparison = 0;
            if (timestampA < timestampB) {
                comparison = 1;
            } else if (timestampA > timestampB) {
                comparison = -1;
            }
            return comparison;
        }

    }

    private sortScheduledApptDateTime(a, b) {
        if (a.fields && b.fields) {
            let scheduledApptDateTimeA = a.fields.scheduledApptDateTime.value;
            let scheduledApptDateTimeB = b.fields.scheduledApptDateTime.value;
            let comparison = 0;
            if (scheduledApptDateTimeA < scheduledApptDateTimeB) {
                comparison = 1;
            } else if (scheduledApptDateTimeA > scheduledApptDateTimeB) {
                comparison = -1;
            }
            return comparison;
        }

    }

    private assessmentType(item: IBaseModel<IAssessmentAttributes>): EnumAssessmentType {

        if (item.fields && item.fields.scheduledApptDateTime && item.fields.scheduledApptDateTime.value) {
            let pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            item.fields.scheduledApptDateTime.value = new Date(item.fields.scheduledApptDateTime.value.toString().replace(pattern, '$3-$1-$2'));
            if (item.fields.scheduledApptDateTime.value < this.dateToCompare) {
                return EnumAssessmentType.Past;
            } else {
                return EnumAssessmentType.Future;
            }
        } else {
            return EnumAssessmentType.Undefined;
        }
    }

}
