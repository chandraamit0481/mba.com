import { Injectable } from "@angular/core";
import { BaseConfig } from "../../shared/config/base.config";

@Injectable()
export class ProgramsListConfig extends BaseConfig {
    config = {
        savedPrograms: {
            method: "saved-programs",
            filters: ["identityId"],
            key: "ProgramOrgID"
        },
        program: {
            method: "programmatches",
            programId: "",
            otherParams: ["switches"],
            filters: ["programId"],
        }
    };
}