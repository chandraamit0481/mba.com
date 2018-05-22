import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IBaseModel, Base } from "../../../shared/models/common.models";
import { IAssessmentAttributes } from "../assessments.models";
import { ExamsService } from "./exams.service";
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";
import { ExamsConfig } from "./exams.config";
import { EnumAssessmentAction, EnumAssessmentStatus } from "../assessments.enums";
import { CandidateProfileSitecoreModel } from "../../../shared/models/candidate-profile-sitecore.models";

@Component({
    selector: "exams",
    templateUrl: './exams.component.html'
})

export class ExamsComponent extends Base implements OnInit {
    @ViewChild('viewESRModel') viewESRPopup: ElementRef;
    @Input() model: IBaseModel<IAssessmentAttributes>[];
    @Input() isPast: boolean;
    @Input() pastLatestExamId:string
    officialScoreReportsBaseURL: string;
    toggle = {};
    activationCode: string;
    currentAppointmentId: number;
    assessmentAction: typeof EnumAssessmentAction = EnumAssessmentAction;
    assessmentStatus: typeof EnumAssessmentStatus = EnumAssessmentStatus;
    private profileLabels: CandidateProfileSitecoreModel;
    viewESRMessage: string;
    constructor(private http: ExamsService, private sitecoreConfig: SiteCoreConfig, private examsConfig: ExamsConfig) {
        super();
    }

    ngOnInit(): void {       
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
        this.officialScoreReportsBaseURL = this.profileLabels.officialScoreReportsBaseURL;
        this.viewESRMessage = this.profileLabels.viewESRMessage +" "+ this.sitecoreConfig.currentAccount.email;
    }

    location(attrs: IAssessmentAttributes): string {
        return (attrs.testCenterCity.value ? attrs.testCenterCity.value + " , " : "") + (attrs.testCenterState.value ? attrs.testCenterState.value + " , " : "") + attrs.testCenterCountry.value;
    }

    navigateReportUrl(appointmentId: number, action: EnumAssessmentAction): void {
        if (action === EnumAssessmentAction.ViewOfficialScore && this.sitecoreConfig && this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.pvueCandidateID) {
            let officialReportConfigKey = this.examsConfig.getConfiguration('officialScoreReportKey');
            officialReportConfigKey.candidateID = this.sitecoreConfig.currentAccount.pvueCandidateID;
            officialReportConfigKey.registrationID = this.pastLatestExamId;
            this.isLoading = true;
            this.http.getScoreReportKey(officialReportConfigKey).subscribe(response => {
                this.isLoading = false;
                let scoreReportsURL = this.officialScoreReportsBaseURL + "?regID=" + this.pastLatestExamId + "&key=" + response;
                window.location.href = scoreReportsURL;
            }, err => {
                this.isLoading = false;
                this.errored = true;
            });
        } else if (action === EnumAssessmentAction.ViewESR && this.sitecoreConfig && this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.identityID) {
            let config = this.examsConfig.getPostConfiguration('reportActivation');
            config.appointmentID = appointmentId;
            config.identityID = this.sitecoreConfig.currentAccount.identityID;
            this.isLoading = true;
            this.viewESRPopup.nativeElement.click();
            this.http.getReportActivationGUID(config).subscribe(guid => {
                this.isLoading = false;
            }, err => {
                this.isLoading = false;
                this.errored = true;
            });
        } else {
            let partUrl = "?Appt=" + appointmentId;
            let updateKey = "PUVUpdate";
            switch (action) {
                case EnumAssessmentAction.ReinstateScore: {
                    sessionStorage.setItem(updateKey, "true");
                    window.location.href = this.profileLabels.reinstateScoreURL + partUrl;
                    break;
                }
                case EnumAssessmentAction.Reschedule: {
                    sessionStorage.setItem(updateKey, "true");
                    window.location.href = this.profileLabels.rescheduleExamURL + partUrl;
                    break;
                }
                case EnumAssessmentAction.Cancel: {
                    sessionStorage.setItem(updateKey, "true");
                    window.location.href = this.profileLabels.cancelExamURL + partUrl;
                    break;
                }
                case EnumAssessmentAction.CancelScore: {
                    sessionStorage.setItem(updateKey, "true");
                    window.location.href = this.profileLabels.cancelScoreURL + partUrl;
                    break;
                }
                    
            }
        }
    }

    getESRCode(appointmentID) {
        this.currentAppointmentId = appointmentID;
    }

}
