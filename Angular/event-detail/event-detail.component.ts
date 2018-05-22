import { Component, OnInit } from '@angular/core';
import { EventDetailService } from "./event-detail.service";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { EventDetailDataModel } from "./event-detail.model";
import { EventDetailConfig } from "./event-detail.config";
import { Base } from "../shared/models/common.models";

@Component({
    selector: 'event-detail',
    templateUrl: './event-detail.component.html'
})

export class EventDetailComponent extends Base implements OnInit {
    eventDetail: EventDetailDataModel;

    constructor(private eventDetailService: EventDetailService, private siteCoreConfig: SiteCoreConfig,
        private eventDetailConfig: EventDetailConfig) { super(); }

    ngOnInit(): void {

        let eventDetail = this.eventDetailConfig.getConfiguration("eventDetails");
        eventDetail.id = this.siteCoreConfig.id;
        this.isLoading = true;
        this.eventDetailService.getAll(eventDetail).subscribe(response => {
            this.eventDetail = response;
            this.isLoading = false;
        }, err => {
                this.isLoading = false;
                this.errored = true;
            }
        );

    }
}