import { Component } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
@Component({
    selector: "assessment-landing",
    templateUrl: './assessment-landing.component.html'
})

export class AssessmentLandingComponent {

    title: string = "";
    constructor(private sitecoreConfig: SiteCoreConfig) {        
        this.title = this.sitecoreConfig.title;

    }
}
