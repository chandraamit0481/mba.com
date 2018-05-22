import { Component, Input } from "@angular/core";
import { SiteCoreConfig } from "../../config/sitecore.config";
declare var DoLogin: any;

@Component({
    selector: "view-saved",
    templateUrl: "./viewsaved.component.html"
})

export class ViewSavedComponent {
    @Input() linkText: string = "view saved";
    @Input() cssName: string = "viewsaved";
    constructor(private siteCoreConfig: SiteCoreConfig) {}
    viewSaved(): void {
        if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.isAuthenticated) {
            location.pathname = "candidate-profile";
        } else {
            DoLogin();
        }
    }
}