import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class CandidateProfileConfig extends BaseConfig {
    config = {
        profileConfig: {
            method: "accounts",
            fields: ["student-guid", "email", "firstname", "lastname", "middlename", "pvue-email", "pvue-usa-state-of-residence-id", "pvue-country-of-citizenship-id", "optin-gmass", "optin-gmat", "optin-career",
                "optin-gmass-was-optedin", "optin-participation-in-surveys", "optin-contact-by-phone", "optin-contact-by-sms", "day-phone-number", "day-phone-extension", "day-phone-country-id", "evening-phone-number",
                "evening-phone-extension", "evening-phone-country-id", "fax-phone-number", "fax-phone-country-id", "home-address1", "home-address2", "home-address3", "home-country-id", "home-country-description",
                "home-city", "home-postal-code", "home-state-province-id", "gmat-id", "birthdate", "pvue-first-name", "pvue-last-name", "pvue-address1", "pvue-address2", "pvue-address3", "pvue-country-id", "pvue-country-description",
                "pvue-country-of-citizenship-description", "pvue-city", "pvue-postal-code", "pvue-state-province-id", "pvue-state-province-description", "pvue-mapping-status", "pvue-ethnicity-id", "pvue-native-language-id",
                "pvue-native-language-description", "pvue-years-of-work-experience-id", "pvue-years-of-work-experience-description", "pvue-undergraduate-institution-code", "pvue-undergraduate-institution-description",
                "pvue-undergraduate-major-id", "pvue-undergraduate-major-description", "pvue-undergraduate-graduation-date", "pvue-undergrad-gpa", "pvue-highest-education-level-id", "pvue-highest-education-level-description",
                "pvue-mba-degree-pursued-id", "pvue-how-mba-pursued-id", "pvue-full-or-part-time-student-id", "pvue-work-while-pursue-id", "pvue-mba-area-of-concentration-id", "pvue-world-study-region-id",
                "pvue-funct-exp-before-degree-id", "pvue-funct-exp-before-degree-description", "pvue-funct-exp-after-degree-id", "pvue-ind-exp-before-degree-id", "pvue-ind-exp-before-degree-description",
                "pvue-ind-exp-after-degree-id", "pvue-military-service", "gender-id", "migrated", "gmass-eligibility-date", "business-school-status", "enrolled-business-school-code", "enrolled-business-school-other", "not-attending-business-school-reason", "pvue-candidate-id", "pvue-mba-start-date", "pvue-world-study-region-description", "pvue-mba-degree-pursued-description",
                "pvue-mba-area-of-concentration-description", "pvue-how-mba-pursued-description", "pvue-full-or-part-time-student-description", "pvue-work-while-pursue-description", "pvue-funct-exp-after-degree-description",
                "pvue-ind-exp-after-degree-description"],
            otherParams: ["mbaAppID"],
            mbaAppID: 1000
        }
    };
}