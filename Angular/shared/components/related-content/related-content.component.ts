import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RelatedContentService } from "./related-content.service";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { RelatedContentConfig } from "./related-content.config";
import { Base, AddressModel } from '../../models/common.models';
import { OperatorsEnum } from '../../enums/operators.enum';
import { BaseService } from '../../services/base.service';


@Component({
    selector: 'related-content',
    templateUrl: './related-content.html'
})

export class RelatedContentComponent extends Base implements OnInit {
    relatedContent: any;
    @Input() configKey: string = "articleDetail";
    @Input() relatedItemIds: string = "";

    constructor(private relatedContentService: RelatedContentService, private siteCoreConfig: SiteCoreConfig, private relatedContentConfig: RelatedContentConfig, private baseService: BaseService) { super(); }

    ngOnInit() {
        let config = this.relatedContentConfig.getConfiguration(this.configKey);
        config.topicItemId = this.baseService.setValues(this.siteCoreConfig.topicTags);
        config.country = this.baseService.setValues(this.siteCoreConfig.countryTags);
        config.region = this.baseService.setValues(this.siteCoreConfig.regionTags);
        config.schoolItemId = this.baseService.setValues(this.siteCoreConfig.schoolTags);
        config.topResults = this.baseService.setValues(this.siteCoreConfig.boostedId);
        if (!this.relatedItemIds) {
            config.itemId = this.siteCoreConfig.itemId ? OperatorsEnum.NotIn + " " + this.siteCoreConfig.itemId : "";
        } else {
            config.itemId = OperatorsEnum.In + " " + this.relatedItemIds;
        }

        this.isLoading = true;
        this.relatedContentService.getRelatedContent(config).subscribe(response => {
            this.relatedContent = response;
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            this.errored = true;
        }
        );
    }

    getLocation(location, relatedItem) {

        let address = new AddressModel();
        if (relatedItem === 'Event') {
            address.address1 = this.baseService.getValue(location.eventAddress1);
            address.address2 = this.baseService.getValue(location.eventAddress2);
            address.address3 = this.baseService.getValue(location.eventAddress3);
            address.city = this.baseService.getValue(location.eventCityName);
            address.state = this.baseService.getValue(location.eventStateName);
            address.postalCode = this.baseService.getValue(location.eventPostalCode);
            address.country = this.baseService.getValue(location.eventCountryName);
        }
        return address.getAddress();

    }

}