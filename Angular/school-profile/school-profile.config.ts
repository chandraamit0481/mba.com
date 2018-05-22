import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class SchoolProfileConfig extends BaseConfig {
    config = {
        schoolProfile: {
            method: "schools",
            fields: ["schoolLogo", "schoolAddressLine1", "schoolAddressLine2", "schoolAddressLine3", "schoolCity", "schoolCountryIdLookupName", "schoolDisplayName", "schoolWebsiteUrl", "schoolPostalCode", "schoolStateProvinceId", "schoolStateProvinceIdLookupName", "schoolPhoneCountryCode", "schoolPhoneNumber", "schoolPhoneExtension"]
        },
        schoolProgram: {
            method: "programs",
            filters: ['programOrgId'],
            fields: ["programDisplayName", "programLengthIdLookupName", "programTest", "programLink", "programOrgId"]
        },
        event: {
            method: "eventmatches",
            sort: "eventStartDate asc and eventStartHour asc",
            filters: ["eventId"],
            otherParams: ["switches"],
            queries: ["countryName", "regionName", "segmentationName"],
            fields: ["itemUrl", "eventName", "eventStartDate", "eventRegistrationUrl", "eventRegistrationRequired", "eventId", "eventHostName", "description", "eventStartHour", "eventEndHour", "address1", "address2", "address3", "eventCityName", "eventStateName", "eventCountryName", "eventPostalCode"]
        },
        programs: {
            method: "programmatches",
            filters: ["programId"],
            otherParams: ["switches"],
            fields: ["itemUrl", "programId"]
        }
    };
}