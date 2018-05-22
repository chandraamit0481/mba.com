import { Injectable } from '@angular/core';
import { BaseConfig } from "../../config/base.config";
@Injectable()
export class MapsConfig extends BaseConfig {
    config = {
        googleApi: {
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="
        }
    };
}