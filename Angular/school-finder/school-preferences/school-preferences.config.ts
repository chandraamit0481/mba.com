import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class SchoolPreferencesConfig extends BaseConfig {

    config = {
        preferredClassStyle: {
            method: "lookups/class-styles",
            field: "name",
            configKey: "PreferredClassStyle",
            sort: "sortOrder asc"
        },
        desiredProgramType: {
            method: "lookups/program-types",
            field: "name",
            configKey: "DesiredProgramType",
            sort: "sortOrder asc"
        },
        desireDegree: {
            method: "lookups/desired-degrees",
            field: "name",
            configKey: "DesireDegree",
            sort: "sortOrder asc"
        },
        desiredProgramLength: {
            method: "lookups/years-available",
            field: "name",
            configKey: "DesiredProgramLength",
            sort: "sortOrder asc",
            filters: ["activeFlag"],
            activeFlag: "1"
        }
    };
}