import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IBaseModel } from "../../../../shared/models/common.models";
import { MainModule } from '../../../../shared/modules/main.module';
import { HttpService } from '../../../../shared/services/http.service';
import { MockHttpService } from '../../../../shared/services/mock-http.services';
import { SiteCoreConfig } from '../../../../shared/config/sitecore.config';
import { ApplyESRComponent } from './apply-esr.compnent';
import { ESRActivationMock } from '../../../../test-mock-up/esr-activation';
import { MockComponent } from '../../../../shared/config/mock-component';
import { ExamsConfig } from '../../exams/exams.config';
import { ExamsService } from '../../exams/exams.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../shared/services/share-data.service';


let component: ApplyESRComponent;
let fixture: ComponentFixture<ApplyESRComponent>;
let page: Page;

describe('Apply ESR Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({            
            imports: [MainModule, FormsModule],          
            declarations: [ApplyESRComponent],
            providers: [ExamsConfig, ExamsService, DataService,             
                { provide: HttpService, useValue: new MockHttpService(ESRActivationMock) },
                { provide: SiteCoreConfig, useValue: { currentAccount: { identityID: 43713105 }, candidateProfileLabels: {} } }
               
            ]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
});

/** Create the component and set the `page` test variables */
function createComponent() {    
    fixture = TestBed.createComponent(ApplyESRComponent);
    component = fixture.componentInstance;   
    component.activationCode = 'ESR-BVIU-EYJK';
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        page = new Page();
    });
}

class Page {
    pageData: HTMLLIElement[];
    constructor() {
        this.pageData = fixture.debugElement.queryAll(By.css('tbody.shopping-cart-details')).map(de => de.nativeElement);
    }
}