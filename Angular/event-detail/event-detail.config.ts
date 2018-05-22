import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class EventDetailConfig extends BaseConfig {
    config = {

        eventDetails: {
            method: "events",
            otherParams: ["switches"],
            fields: ["startDate", "description", "endDate", "startHour", "isOnLine", "countryName", "city", "stateProvinceName", "postalCode", "endHour", "address1", "address2", "address3", "phoneNumber", "emailAddress", "websiteAddress", "eventName", "eventHostName", "registrationRequired"]
        }
    };
}