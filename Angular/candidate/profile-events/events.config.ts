import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class CandidateEventConfig extends BaseConfig {
    config = {
        savedEventConfig: {
            method: "saved-events",
            filters: ["identityId"],
            isProfile: true
        },

        allSavedEventConfig: {
            method: "saved-events",
            filters: ["identityId"],
            identityId: ""
        },

        eventConfig: {
            method: "eventmatches",
            filters: ["eventId"],
            otherParams: ["pageSize", "switches"],
            fields: ["eventName", "eventStartDate", "eventEndDate", "eventStartHour", "eventRegistrationRequired", "itemUrl", "eventWebsiteAddress", "address1", "address2", "address3", "eventCityName", "eventStateName", "eventPostalCode", "eventCountryName"],
            sort: "eventStartDate desc",
            eventId: ""
        },
        pageConstantMessage: {
            noEventMessage: "You do not have any saved events."
        }
    };
}