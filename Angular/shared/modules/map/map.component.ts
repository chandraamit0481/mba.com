import { Component, OnInit, Input } from "@angular/core";
import { OfflineOptions, ControlAnchor, NavigationControlType } from 'angular2-baidu-map';
import { MapService } from "./map.service";
import { IGeometry, ILocation } from "./map.models";
import { SiteCoreConfig } from "../../config/sitecore.config";

@Component({
    selector: "map-comp",
    templateUrl: './map.component.html',
    styles: [`
        agm-map {
            height:300px;
        }`, `
        baidu-map{
            height: 300px;
            display: block;
        }
    `]

})

export class MapComponent implements OnInit {
    isChina: boolean;
    opts: any;
    offlineOpts: OfflineOptions;
    baiduMapKey: string;
    showMap: boolean;
    @Input() lat: number;
    @Input() lng: number;
    @Input("map-address") address: string;
    @Input() zoom: number;

    constructor(private mapService: MapService, private sitecoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {
        this.zoom = !this.zoom ? 12 : this.zoom;
        this.isChina = (this.sitecoreConfig.preferredCountry && this.sitecoreConfig.preferredCountry.countryName && this.sitecoreConfig.preferredCountry.countryName.toLowerCase() === "china");
        if (!this.lat || !this.lng) {
            this.mapService.getLocation(this.address)
                .subscribe(response => {
                    if (response) {
                        let geolocation = <ILocation>response;
                        this.lat = geolocation.lat;
                        this.lng = geolocation.lng;
                        this.setOpts();
                        this.showMap = true;
                    }
                    else {
                        this.showMap = false;
                    }
                });
        }
        else {
            this.showMap = true;
            this.setOpts();
        }
            
    }

    setOpts() {
        if (this.isChina) {
            this.opts = this.mapService.getOpts(this.lat, this.lng, this.zoom);
            this.baiduMapKey = this.opts.apiKey;
            this.offlineOpts = {
                retryInterval: 5000,
                txt: 'NO-NETWORK'
            };
        }
    }

    loadMap(map: any) {
        //Function will be used to instantiate map
    }

    clickMarker(marker: any) {
        //Function will be used to trace marker
    }

    clickmap(e: any) {
        //Function will be used to trace map's clicked coordinate: ${e.point.lng}, ${e.point.lat}
    }

}