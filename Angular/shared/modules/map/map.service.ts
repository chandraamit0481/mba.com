import { Injectable } from '@angular/core';
import { IResults, ILocation, IApiKeys } from "./map.models";
import { Observable } from "rxjs/Observable";
import { ControlAnchor, NavigationControlType } from "angular2-baidu-map";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { HttpService } from "../../services/http.service";
import { MapsConfig } from "./map.config";
import 'rxjs/add/operator/mergemap';

@Injectable()
export class MapService {
    constructor(private http: HttpService, private coreConfig: SiteCoreConfig, private config: MapsConfig) { }

    getLocation(address: string): Observable<ILocation> {
        let url = this.config.getConfiguration("googleApi").url;
        url = url + address + "&key=" + this.coreConfig.googleApiKey;
        return this.http.getByExternalUrl<IResults>(url)
            .map(response => {
                if (response !== null && response.status === "OK" && response.results.length > 0 && response.results[0].geometry) {
                    return response.results[0].geometry.location;
                }
                return null;
            });
    }


    getOpts(lat: number, lng: number, zoom: number): any {
        let opts = {
            center: {
                longitude: lng,
                latitude: lat
            },
            zoom: zoom,
            markers: [{
                longitude: lng,
                latitude: lat,
            }],
            scaleCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
            },
            overviewCtrl: {
                isOpen: false
            },
            navCtrl: {
                type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            },
            apiKey: this.coreConfig.baiduApiKey
        };
        return opts;
    }

    getApiConfig(): IApiKeys {
        let retObject: IApiKeys = <IApiKeys>{};
        retObject.googleApiKey = this.coreConfig.googleApiKey;
        retObject.baiduApiKey = this.coreConfig.baiduApiKey;
        return retObject;
    }
}