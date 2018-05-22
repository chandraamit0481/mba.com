import { Injectable } from "@angular/core";
import { BaseConfig } from "../../../shared/config/base.config";

@Injectable()
export class AccommodationConfig extends BaseConfig {
    config = {
        accommodationsConfig: {
            method: "accommodations",
            sort: "requestDate desc"
        }
    };
}
