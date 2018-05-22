import { Component, OnInit, Input } from "@angular/core";
import { EventsDataModel } from "./events.models";
import { EventsService } from "./events.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { CandidateEventConfig } from "./events.config";
import { Base } from "../../shared/models/common.models";
import { CandidateProfileSitecoreModel } from '../../shared/models/candidate-profile-sitecore.models';

@Component({
    selector: "candidate-events",
    templateUrl: './events.component.html'
})

export class EventsComponent extends Base implements OnInit {
    @Input() configKey: string = "allSavedEventConfig";
    noEvent: string;
    model: EventsDataModel;
    profileUrl: string;
    isProfile: boolean;
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private eventsService: EventsService, private sitecoreConfig: SiteCoreConfig, private config: CandidateEventConfig) {
        super();
        this.profileUrl = this.sitecoreConfig.candidateProfileUrl;
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
    }

    ngOnInit(): void {
        let configObj = this.config.getConfiguration(this.configKey);
        let eventConfigObject = this.config.getConfiguration("eventConfig");
        this.isProfile = <boolean>configObj.isProfile;
        this.isLoading = true;
        this.eventsService.getEvents(configObj, eventConfigObject).subscribe(response => {
            if (response && response.recentEvent) {
                if (configObj.isProfile && response.restEvent.length > 1) {
                    response.restEvent.splice(1, response.restEvent.length);
                }
                this.model = response;
            } else {
                this.noEvent = this.config.config.pageConstantMessage.noEventMessage;
            }
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }
}
