import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AccommodationService } from "./accommodation.service";
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";
import { AccommodationModel } from "./accommodation.model";
import { AccommodationConfig } from "./accommodation.config";
import { Base } from "../../../shared/models/common.models";

@Component({
    selector: 'accommodation',
    templateUrl: './accommodation-component.html'
})

export class AccommodationComponent extends Base implements OnInit {

    accommodationData: AccommodationModel[];
    accommodationLinkText: string = "";
    accommodationLink: string = "";
    constructor(private accommodationService: AccommodationService, private siteCoreConfig: SiteCoreConfig, private accommodationConfig: AccommodationConfig) { super(); }

    ngOnInit() {
        if (this.siteCoreConfig && this.siteCoreConfig.accommodationText) {
            this.accommodationLinkText = this.siteCoreConfig.accommodationText.accommodationLinkText;
            this.accommodationLink = this.siteCoreConfig.accommodationText.accommodationLink;
        }
        this.getAccommodation();
    }

    getAccommodation() {        
        let config = this.accommodationConfig.getConfiguration("accommodationsConfig");
        config.id = this.siteCoreConfig.currentAccount.gmatid;
        if (!!config.id) {
            this.isLoading = true;
            this.accommodationService.getAll(config).subscribe(response => {
                if (response && response.length) {
                    this.accommodationData = response;
                    this.isLoading = false;
                }
            },
                err => {
                    this.isLoading = false;
                    this.errored = true;
                }
            );
        }
    }
}
