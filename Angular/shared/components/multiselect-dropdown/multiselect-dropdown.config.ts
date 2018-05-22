import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";


@Injectable()
export class MultiSelectDropdownConfig extends BaseConfig {

    config = {
        JumpToSchool: {
            method: "programmatches",
            fields: "programInstitutionName,programSchoolName,programSchoolId",
            idKey: "programSchoolId",
            field: ["programInstitutionName", "programSchoolName"],
            configKey: "searchResults",
            filterField: "q",
            otherParams: ["pageSize", "switches", "page", "q", "rh"],
            rh: "schoolac",
            pageSize: 10,
            page: 1
        },
        countries: {
            method: "locationmatches",
            field: ["city", "state", "country"],
            idKey: "geoLocation",
            configKey: "searchResults",
            filterField: "q",
            otherParams: ["pageSize", "page", "q", "switches"],            
            isSingleSelect: true,
            pageSize: 10,
            page: 1
        },
        areaOfStudy: {
            method: "lookups/area-studies",
            field: ["name"],
            configKey: "AreaOfStudy",
            filters: ["name"],
            filterField: "name",
            otherParams: ["pageSize", "page"],  
            pageSize: 10,
            page: 1
        }

    };

}