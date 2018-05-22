import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class EventListConfig extends BaseConfig {

    config = {       
        savedEvents: {
            method: "saved-events",
            filters: ["identityId"],
            key: "EventRecruitingCalendarID"
        }
    };
}