import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class SchoolFinderMatchRateConfig extends BaseConfig {

    config = {
        schoolFinder: {
            method: "programmatches",
            queries: ["programCountryName", "geolocation", "desiredLocation", "programCityName", "programStateName", "programYearsWorkExperience", "programGmatScore", "programAreaOfStudy", "programDeliveryFormat", "programType", "programDegree", "programLength", "programInitiative"],
            filters: ["programSchoolId"],
            otherParams: ["page", "pageSize", "switches"],
            pageSize: 20,
            page: 1
        },
        savedPrograms: {
            method: "saved-programs",
            filters: ["identityId"]
        },
        sfActivity: {
            post: {
                method: "saved-sf-activity",
                dataField: "saved-sf-activity",
                fields: ["programID", "identityID"],
            },
        }
    };

}