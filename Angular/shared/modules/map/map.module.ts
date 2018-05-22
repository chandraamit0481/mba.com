import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';
import { BaiduMapModule } from 'angular2-baidu-map';
import { MapService } from "./map.service";
import { LAZY_MAPS_API_CONFIG } from '@agm/core/services';
import { GoogleMapsConfig } from "./google.map.config";
import { MapsConfig } from "./map.config";
@NgModule({
    imports: [BrowserModule, BaiduMapModule,
    AgmCoreModule.forRoot()],
    declarations: [MapComponent],
    exports: [
        MapComponent
    ],
    providers: [MapService,
               { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig },
                 MapsConfig
    ]
})

export class MapModule { }