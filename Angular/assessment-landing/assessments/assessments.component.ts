import { Component, OnInit } from "@angular/core";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { AssessmentsModel } from "./assessments.model";
import { Base } from "../../shared/models/common.models";
@Component({
    selector: "assessments",
    templateUrl: './assessments.component.html'
})

export class AssessmentsComponent extends Base implements OnInit {
    assessments: AssessmentsModel[];
    private updateKey: string = "PUVUpdate";
    constructor(private sitecoreConfig: SiteCoreConfig) {super();
    }

    ngOnInit(): void {
      
        if (this.sitecoreConfig && this.sitecoreConfig.assessments) {
            this.assessments = <AssessmentsModel[]>JSON.parse(this.sitecoreConfig.assessments);
        }
          
    }

    registerExam(url): void {        
        sessionStorage.setItem(this.updateKey, "true");
        this.redirectPage(url);
    }

  
}
