import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";


@Injectable()
export class CandidateProgramConfig extends BaseConfig {
    config = {
        allProgramConfig: {
            method: "saved-programs",
            filters: ["identityId"],
            sort: "dateSaved desc"
        },
        programConfig: {
            method: "saved-programs",
            filters: ["identityId"],
            otherParams: ["pageSize"],
            sort: "dateSaved desc",
            pageSize: 2,
            isProfile: true
        },
        programMatchesConfig: {
            method: "programmatches",
            filters: ["programId"],
            otherParams: ["switches"],
            programId: ""
        },
        programServiceConfig: {
            method: "programs",
            filters: ["programOrgId"]
        },
        deleteConfig: {
            method: "saved-programs"
        },
        programConstentConfig: {
            emptyMessage: "You do not have any saved programs"
        }
    };
}