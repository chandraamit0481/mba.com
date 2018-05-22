import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class SaveConfig extends BaseConfig {
    config = {
        eventDetail: {
            method: "saved-events",
            responseKey: "saved-events",
            filters: ["eventRecruitingCalendarID", "identityId"],
            idKey: "eventRecruitingCalendarID",
            post: {
                method: "saved-events",
                dataField: "saved-events",
                fields: ["identityID", "eventRecruitingCalendarID"],
                identityID: 0,
                eventRecruitingCalendarID: 0
            },
            delete: {
                method: "saved-events"
            },
        },
        programDescription: {
            method: "saved-programs",
            responseKey: "saved-programs",
            idKey: "programOrgID",
            filters: ["programOrgID", "identityId"],
            post: {
                method: "saved-programs",
                dataField: "saved-programs",
                fields: ["programOrgID", "identityID"],
                identityID: 0,
                ProgramOrgID: 0
            },
            delete: {
                method: "saved-programs"
            },
        },
        productDetail: {
            method: "saved-products",
            responseKey: "saved-products",
            idKey: "eventRecruitingCalendarID",
            filters: ["identityId", "eventRecruitingCalendarID"],
            id: "",
            post: {
                method: "saved-products",
                dataField: "saved-products",
                fields: ["identityID", "eventRecruitingCalendarID"],
                identityID: 0,
                eventRecruitingCalendarID: 0
            },
            delete: {
                method: "saved-products"
            },
        },
        articleDetail: {
            method: "saved-articles",
            responseKey: "SavedArticle",
            idKey: "sitecoreID",
            filters: ["sitecoreID","identityId"],
            post: {
                method: "saved-articles",
                dataField: "saved-articles",
                fields: ["sitecoreID", "identityID"],
                identityID: 0,
                sitecoreID: 0
            },
            delete: {
                method: "saved-articles"
            },

        },
        programMatch: {
            method: "saved-programs",
            responseKey: "saved-programs",
            idKey: "ProgramOrgID",
            post: {
                method: "saved-programs",
                dataField: "saved-programs",
                fields: ["ProgramOrgID", "identityID"],
                identityID: 0,
                ProgramOrgID: 0
            },
            delete: {
                method: "saved-programs"
            },
        },
        eventList: {
            method: "saved-events",
            responseKey: "saved-events",
            idKey: "eventRecruitingCalendarID",
            eventRecruitingCalendarID: "",
            post: {
                method: "saved-events",
                dataField: "saved-events",
                fields: ["eventRecruitingCalendarID", "identityID"],
                identityID: 0,
                eventRecruitingCalendarID: 0
            },
            delete: {
                method: "saved-events"
            },
        }
    };

}