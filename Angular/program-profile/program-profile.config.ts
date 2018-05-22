import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class ProgramProfileConfig extends BaseConfig {
    config = {
        programProfile: {
            method: "programs",
            id: "",
            financialAidMessage: "Program Financial Aid is available",
            fullyFundedMessage: "Program is Fully Funded"

        },
        programPreview: {
            method: "program-previews",
            id: "",
            financialAidMessage: "Program Financial Aid is available",
            fullyFundedMessage: "Program is Fully Funded"
        },
        programInstitutionName: {
            method: "programmatches",
            filters: ["programId"],
            otherParams: ["switches"],
            fields: ["programInstitutionName", "programSchoolLogo"]
        },
        event: {
            method: "eventmatches",
            sort: "eventStartDate asc and eventStartHour asc",
            filters: ["eventId"],
            otherParams: ["switches"],
            queries: ["countryName", "regionName", "segmentationName"]
        },
        program: {
            method: "search",
            programId: "",
            contentTypeName: "Program",
            otherParams: ["switches"],
            filters: ["programId", " contentTypeName"],
            fields: ["schoolItemId"]
        }
    };
}