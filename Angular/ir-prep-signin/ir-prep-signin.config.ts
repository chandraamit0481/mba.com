import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class IRPrepSignInConfig extends BaseConfig {
    config = {
        irPrepSignInConfig: {
            method: "license",
            filters: ["licenseKey"]
        }
    };
}