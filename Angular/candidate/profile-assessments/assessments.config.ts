import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class AssessmentsConfig extends BaseConfig {
    config = {

        assessmentsConfig: {
            method: "appointments",
            filters: ["active", "gmatCandidateId"],
            fields: ["testCenterName", "testCenterCity", "testCenterState", "testCenterCountry", "scheduledApptDateTime", "status", "gmatCandidateId", "timestamp", "apptEvent"],
            active: 1,
            gmatCandidateId: "",
            sort: "scheduledApptDateTime desc",
            isProfile: false
        },
        candidateAssessmentsConfig: {
            method: "appointments",
            filters: ["active", "gmatCandidateId"],
            fields: ["testCenterName", "testCenterCity", "testCenterState", "testCenterCountry", "scheduledApptDateTime", "status", "gmatCandidateId", "timestamp", "apptEvent"],
            active: 1,
            gmatCandidateId: "",
            sort: "scheduledApptDateTime desc",
            maxRecords: "2",
            isProfile: true
        },
        testResult: {
            method: "test-results",
            filters: ["registrationID"]
        },
        reportActivation: {
            method: "scorereportactivation",
            filters: ["appointmentID"]
        },
        gmatConnectLinkConfig: {
            method: "gmatconnectlink",
            filters: ["gmatCandidateId"],
            otherParams: ["page", "pageSize"],
            page: 1,
            pageSize: 1,
            sort: "recommendDate desc"
        },
        officialScoreReportKey: {
            method: "official-score-report-key",
            filters: ["candidateID", "registrationID"]
        }
    };
}