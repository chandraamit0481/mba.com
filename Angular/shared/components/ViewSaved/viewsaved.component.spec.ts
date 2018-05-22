import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSavedComponent } from "./viewsaved.component";
import { SiteCoreConfig } from "../../config/sitecore.config";

let component: ViewSavedComponent;
let fixture: ComponentFixture<ViewSavedComponent>;

describe('ViewSaved Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewSavedComponent],
            providers: [SiteCoreConfig]
        }).compileComponents().then(createComponent);
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });
});

function createComponent() {
    fixture = TestBed.createComponent(ViewSavedComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
    });
}
