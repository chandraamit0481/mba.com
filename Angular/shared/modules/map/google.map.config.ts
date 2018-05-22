import { Injectable } from '@angular/core';
import { MapService } from "./map.service";
@Injectable()
export class GoogleMapsConfig {
    apiKey: string;
    constructor(private http: MapService) {
        this.apiKey = this.http.getApiConfig().googleApiKey;
    }
}