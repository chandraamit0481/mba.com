import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";
import { Observable } from "rxjs/Observable";
import { AccommodationService } from "./accommodation.service";
import { AccommodationComponent } from "./accommodation-component";
import { accommodationDataSample } from "../../../test-mock-up/accommodation";
import { AccommodationConfig } from "./accommodation.config";
import { HttpService } from "../../../shared/services/http.service";
import { MockHttpService } from "../../../shared/services/mock-http.services";
import { MainModule } from "../../../shared/modules/main.module";
import 'rxjs/add/observable/of';
let component: AccommodationComponent;
let fixture: ComponentFixture<AccommodationComponent>;
let page: Page;

describe('Accommodation Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MainModule],
            providers: [AccommodationService, { provide: HttpService, useValue: new MockHttpService(accommodationDataSample) }, AccommodationConfig, { provide: SiteCoreConfig, useValue: { currentAccount: { gmatid: "100000166161" }, accommodationText: { newRequestMessage: "New Request", decisionMadeMessage: "Msg", underReviewMessage:"review"} } }],
            declarations: [AccommodationComponent]

        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should have 10 items', () => {
        
        expect(page.accommodationTest.length).toBe(10);
    });

    it('should have first title ', () => {
        let parentDiv = page.accommodationTest[0].querySelector('div.event-title').textContent;
        expect(parentDiv).toContain("New Request");
    });

});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(AccommodationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    accommodationTest: HTMLLIElement[];
    constructor() {
        this.accommodationTest = fixture.debugElement.queryAll(By.css('div.content-wrap')).map(de => de.nativeElement);
    }
}
