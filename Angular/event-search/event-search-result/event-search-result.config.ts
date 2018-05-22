import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class EventSearchResultConfig extends BaseConfig {

    config = {
        eventSearch: {
            method: "eventmatches",
            sort: "eventStartDate asc",
            queries: ["geoLocation"],
            filters: ["eventCountryName", "eventEndDate", "eventSearchText", "eventIsOnline", "eventStartDate", "itemId"],
            pageSize: 10,
            fields: ["itemUrl", "eventName", "eventEndDate", "eventStartDate", "eventRegistrationUrl", "eventRegistrationRequired", "eventId", "eventHostName", "description", "itemId", "eventIsOnline", "eventWebsiteAddress", "address1", "address2", "address3", "eventCityName", "eventStateName", "eventCountryName", "eventPostalCode"],
            otherParams: ["pageSize", "page", "switches"],
            errorMessage: "Your search did not match any results"
        },
        savedEvents: {
            method: "saved-events",
            filters: ["identityId"]
        }
    };

}