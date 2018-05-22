import { Component, OnInit, Input } from '@angular/core';
import { EventContentDataModel } from "./event-content.model";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { SafeHtmlPipe } from "../../shared/pipes/safe-html";
import { AddressModel } from '../../shared/models/common.models';

@Component({
    selector: 'event-content-component',
    templateUrl: './event-detail-content.component.html'
})

export class EventContentComponent implements OnInit {
    eventId: string;
    @Input() eventContent: EventContentDataModel;
    configKey: string = "eventDetail";
    isDetail: boolean = true;
    mapAddress: string = "";

    constructor(private siteCoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {
        if (this.eventContent) {
            let address = new AddressModel();
            address.address1 = this.eventContent.address1;
            address.address2 = this.eventContent.address2;
            address.address3 = this.eventContent.address3;
            address.city = this.eventContent.eventCityName;
            address.country = this.eventContent.eventCountryName;
            address.state = this.eventContent.eventStateName;
            address.postalCode = this.eventContent.eventPostalCode;
            this.mapAddress = address.getAddress();
            this.eventContent.isOnLine = this.mapAddress ? false : true;
        }
        this.eventId = this.siteCoreConfig.id;
    }

    registerNow() {
        window.open(this.eventContent.websiteAddress);
    }
}