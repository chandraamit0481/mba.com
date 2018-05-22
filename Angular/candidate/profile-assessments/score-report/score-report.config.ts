import { Injectable } from "@angular/core";
import { BaseConfig } from "../../../shared/config/base.config";

@Injectable()
export class ScoreReportConfig extends BaseConfig {
    config = {
        reportConfig: {
            method: "scorereportrequest",
            filters: ["appointmentID"]
        }
    };
}