import { async, ComponentFixture, getTestBed, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SaveComponent } from "./save.component";
import { SaveService } from "./save.service";
import { SaveConfig } from "./save.config";
import { getEvent } from "../../../test-mock-up/getEvent";
import { SiteCoreConfig } from "../../config/sitecore.config";

let component: SaveComponent;
let fixture: ComponentFixture<SaveComponent>;
let page: Page;

describe('Save Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SaveComponent],
            providers: [SiteCoreConfig, SaveConfig, { provide: SaveService, useClass: SaveServiceMockService }]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('Anchor tag should have saveicon css', () => {
        component.savedId = getEvent.data[0]["saved-events"][0].id.value;
        const expectedResult = "saveicon";
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const actualResult = page.anchor[0].className;
            expect(expectedResult).toContain(actualResult);
        })
    });

    it('Anchor tag should have saveicon unsaveicon', () => {
        component.savedId = null;
        const expectedResult = "unsaveicon";
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const actualResult = page.anchor[0].className;
            expect(expectedResult).toContain(actualResult);
        })
        
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {
    fixture = TestBed.createComponent(SaveComponent);
    component = fixture.componentInstance;
    component.configKey = "eventDetail";
    component.identityId = "46289702";
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    anchor: HTMLLIElement[];

    constructor() {
        this.anchor = fixture.nativeElement.querySelectorAll('div a');
    }
}

class SaveServiceMockService extends SaveService {
    constructor() {
        super(null); 
    }

    getSavedItem() {
        return Observable.of(getEvent);
    }
   
}
