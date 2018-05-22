import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ProgramProfileService } from "./program-profile.service";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { ProgramProfileConfig } from "./program-profile.config";
import { EventListModel } from "../shared/components/event-list/event-list.model";
import { Base, AddressModel } from "../shared/models/common.models";
import { OperatorsEnum } from '../shared/enums/operators.enum';
import { BaseService } from '../shared/services/base.service';
import { HeaderDataModel } from './header/header.model';

@Component({
    selector: 'program-profile',
    templateUrl: './program-profile.component.html'
})

export class ProgramProfileComponent extends Base implements OnInit {

    eventDetails: EventListModel[];
    programProfile: any;
    noEvent: boolean = false;
    configKey: string = "programProfile";
    schoolItemId: string;
    mapAddress: string;
    programHeaderText: string;
    constructor(private programProfileService: ProgramProfileService, private programProfileConfig: ProgramProfileConfig, private siteCoreConfig: SiteCoreConfig,
        private baseService: BaseService) {
        super();
    }

    ngOnInit(): void {
        let url = window.location.href;
        let queryParams = this.getParameterByName("guid", url);
        if (queryParams)
            this.configKey = "programPreview";
        let config = this.programProfileConfig.getConfiguration(this.configKey);
        config.id = queryParams || this.siteCoreConfig.id;
        this.getProgramData(config);
        this.programHeaderText = this.siteCoreConfig.socialMediaHeader;
    }

    private getParameterByName(name, url) {
        if (!url)
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        return results && results[2] ? decodeURIComponent(results[2].replace(/\+/g, " ")) : "";
    }

    private getProgramData(config: any): void {
        this.isLoading = true;
        this.programProfileService.getAll(config).subscribe(response => {
            this.programProfile = response;
            if (response && response.programheaderData) {
                let address = new AddressModel();
                let header = <HeaderDataModel>response.programheaderData;
                address.address2 = header.programAddressLine2;
                address.address3 = header.programAddressLine3;
                address.city = header.programCity;
                address.state = header.programStateProvinceIdLookupName;
                address.country = header.programCountryIdLookupName;
                address.postalCode = header.programPostalCode;
                this.mapAddress = address.getAddress();
            }
            if (config.id) {
                let programConfig = this.programProfileConfig.getConfiguration("program");
                programConfig.programId = config.id;
                this.programProfileService.getSchoolItemId(programConfig).subscribe(result => {
                    this.schoolItemId = this.baseService.setValues(result);
                });
            }
            if (this.programProfile && this.programProfile.programEventsData && this.programProfile.programEventsData.length > 0) {
                let futureEvents = this.programProfile.programEventsData.filter(f => this.baseService.compareEndDate(this.baseService.getValue(f.fields.endDate))).map(i => this.baseService.getValue(i.id)).join(",");

                if (futureEvents) {
                    config = this.programProfileConfig.getConfiguration("event");
                    config.eventId = OperatorsEnum.In + " " + futureEvents;
                    this.isLoading = true;
                    this.programProfileService.getEventDetail(config).subscribe(result => {
                        this.eventDetails = result;
                        this.isLoading = false;
                    }, () => { this.isLoading = false; });
                } else {
                    this.noEvent = true;
                }
            } else {
                this.noEvent = true;
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