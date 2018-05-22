import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MapComponent } from "./map.component";
import { MapModule } from "./map.module";
import { MapService } from "./map.service";
import { Observable } from "rxjs/Observable";
import { ILocation, IApiKeys } from "./map.models";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { HttpService } from '../../services/http.service';
import { MockHttpService } from '../../services/mock-http.services';
import { googleMapMockData } from '../../../test-mock-up/google-map-mock';


let lng = 77.3910265, lat = 28.5355161, zoom = 15, mapKey = "AIzaSyDO7zZoKKXBZxeqveNEL_pk9uQplwTneXY", mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
describe('MapComponent', () => {
    let fixture: ComponentFixture<MapComponent>,
        component: MapComponent,
        element: HTMLElement,
        debugEl: DebugElement;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MapModule],
            providers: [MapService,
                { provide: HttpService, useValue: new MockHttpService(googleMapMockData) },
                { provide: SiteCoreConfig, useValue: { preferredCountry: { countryName: "china" }, googleApiKey: mapKey, baiduApiKey: mapKey } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match latitude', () => {
        component.ngOnInit();
        expect(component.lat).toBe(lat);
    });
    it('should match longitude', () => {
        expect(component.lng).toBe(lng);
    });

    it('should match baidumapkey', () => {
        expect(component.baiduMapKey).toBe(mapKey);
    });

    it('country should be china', () => {
        expect(component.isChina).toBe(true);
    });

});