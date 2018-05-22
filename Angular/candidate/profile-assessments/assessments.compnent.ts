import { Component, OnInit, Input } from "@angular/core";
import { IAssessment, AssessmentsModel, IAssessmentAttributes } from "./assessments.models";
import { AssessmentsService } from "./assessments.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { AssessmentsConfig } from "./assessments.config";
declare let DoLogin: any;
import { Base } from "../../shared/models/common.models";
import { BaseService } from '../../shared/services/base.service';
import { EnumAssessmentStatus } from "./assessments.enums";
import { CandidateProfileSitecoreModel } from "../../shared/models/candidate-profile-sitecore.models";
import { DataService } from "../../shared/services/share-data.service";
@Component({
    selector: "candidate-assessments",
    templateUrl: './assessments.component.html'
})

export class AssessmentsComponent extends Base implements OnInit {
    @Input() configKey: string = "assessmentsConfig";
    model: AssessmentsModel;
    isProfile: boolean = false;    
    assessmentUrl: string;
    registerButtonText: string;
    private connectlinkUrl: string;
    private serviceTimeOut: number;
    private updateKey: string = "PUVUpdate";
    private profileLabels: CandidateProfileSitecoreModel;
    constructor(private http: AssessmentsService, private sitecoreConfig: SiteCoreConfig, private assessmentsConfig: AssessmentsConfig, private dataService: DataService) {
        super();
        this.model = new AssessmentsModel();
    }

    ngOnInit(): void {      
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
        this.serviceTimeOut = this.profileLabels.serviceTimeout;
        this.dataService.itemAdded$.subscribe(item => {
            if (item && item.data === "Refresh") {
                this.serviceTimeOut = 0;
                this.refereshData();
            }
        });
        this.refereshData();
    }

    navigateToPearsonVUE(): void {
        sessionStorage.setItem(this.updateKey, "true");
        if (this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.identityID) {
            window.open(this.profileLabels.orderSchoolReportUrl, "_blank");
        } else {
            DoLogin(window.location.href);
        }
    }

    navigateToGMATConnect(): void {
        if (this.connectlinkUrl) {
            window.open(this.connectlinkUrl, "_blank");
        }
    }

    navigateReportUrl(): void {
        if (this.sitecoreConfig && this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.pvueCandidateID) {
            let officialReportConfigKey = this.assessmentsConfig.getConfiguration('officialScoreReportKey');
            officialReportConfigKey.candidateID = this.sitecoreConfig.currentAccount.pvueCandidateID;
            if (this.model.latestPastActiveExamId) {
                officialReportConfigKey.registrationID = this.model.latestPastActiveExamId;
                this.http.getScoreReportKey(officialReportConfigKey).subscribe(response => {
                    let scoreReportsURL = this.profileLabels.officialScoreReportsBaseURL + "?regID=" + officialReportConfigKey.registrationID + "&key=" + response;
                    window.location.href = scoreReportsURL;
                });
            }
        }
    }

    private setButtonText(): void {
        if (this.model && ((this.model.pastExam && this.model.pastExam.length > 0) || (this.model.futureExam && this.model.futureExam.length > 0))) {
            this.registerButtonText = this.profileLabels.assessmentsButtonText;
        } else {
            this.registerButtonText = this.profileLabels.noAssessmentsButtonText;
        }
    }

    private refereshData(): void {
        this.isLoading = true;
        let timeoutId = setTimeout(() => {
            let config = this.assessmentsConfig.getConfiguration(this.configKey);
            let scoreConfig = this.assessmentsConfig.getConfiguration("reportActivation");
            let resultConfig = this.assessmentsConfig.getConfiguration("testResult");
            config.newAppointmentStatus = this.profileLabels.newAppointmentStatus;
            config.gmatCandidateId = this.sitecoreConfig.currentAccount.gmatid;
            this.assessmentUrl = this.profileLabels.assessmentUrl;
            this.isProfile = config.isProfile;

            let gmatConnectconfig = this.assessmentsConfig.getConfiguration("gmatConnectLinkConfig");

            if (this.sitecoreConfig.currentAccount) {
                gmatConnectconfig.gmatCandidateId = this.sitecoreConfig.currentAccount.gmatid;
            }

            if (config.gmatCandidateId) {
                this.http.processedAssessment(config, scoreConfig, resultConfig).subscribe(response => {
                    this.model = response;
                    this.isLoading = false;
                    this.setButtonText();
                },
                    () => {
                        this.isLoading = false;
                        this.setButtonText();
                    });

                this.http.getGMATConnectLink(gmatConnectconfig).subscribe(link => {
                    this.connectlinkUrl = link;
                });
            } else {
                this.isLoading = false;
                this.setButtonText();
            }

            clearTimeout(timeoutId);
        }, this.serviceTimeOut);
    }
}
