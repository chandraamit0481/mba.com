import { Component, Input } from "@angular/core";
import { EventsModel } from "../events.models";
import { Base } from "../../../shared/models/common.models";
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";
import { CandidateProfileSitecoreModel } from "../../../shared/models/candidate-profile-sitecore.models";

@Component({
    selector: 'profile-event-content',
    templateUrl: './profile-event-content.component.html'
})
export class ProfileEventContentComponent extends Base {
    @Input() model: EventsModel[];
    @Input() isProfile: boolean;
    @Input() isRecentEvent: boolean;
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private sitecoreConfig: SiteCoreConfig) {
        super();
    }
    ngOnInit(): void {
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
    }

    openNewWindow(url: string): void {
        if (url)
            window.open(url, "new");
    }

}