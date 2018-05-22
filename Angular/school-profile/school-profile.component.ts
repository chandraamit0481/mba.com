import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SchoolProfileService } from "./school-profile.service";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { SchoolProfileConfig } from "./school-profile.config";
import { ProgramDataModel } from "./program-list-data.model";
import { IProgramLink } from "../shared/components/video-list/video-list.models";
import { LookupsEnum } from "../shared/enums/lookups.enums";
import { EventListService } from "../shared/components/event-list/event-list.service";
import { EventListModel } from "../shared/components/event-list/event-list.model";
import { Base } from "../shared/models/common.models";
import { BaseService } from '../shared/services/base.service';
import { OperatorsEnum } from '../shared/enums/operators.enum';
import { SchoolProfileDataModel } from "./school-profile.model";

@Component({
    selector: 'school-profile',
    templateUrl: './school-profile.component.html'
})

export class SchoolProfileComponent extends Base implements OnInit {
    eventDetails: EventListModel[];
    noEvent: boolean = false;
    configKey: string = "schoolProfile";
    schoolProfile: SchoolProfileDataModel;
    schoolItemId: string;


    constructor(private schoolProfileService: SchoolProfileService, private baseService: BaseService, private siteCoreConfig: SiteCoreConfig, private schoolProfileConfig: SchoolProfileConfig) { super(); }

    ngOnInit(): void {
        this.getSchoolData();
        this.schoolItemId = this.siteCoreConfig.itemId;
    }

    private getSchoolData(): void {
        let schoolProfileconfig = this.schoolProfileConfig.getConfiguration(this.configKey);
        schoolProfileconfig.id = this.siteCoreConfig.id;

        let schoolProgramConfig = this.schoolProfileConfig.getConfiguration("schoolProgram");
        let schoolProgramMatchConfig = this.schoolProfileConfig.getConfiguration("programs");
        let schoolEventConfig = this.schoolProfileConfig.getConfiguration("event");
        this.isLoading = true;
        this.schoolProfileService.getSchoolProfile(schoolProfileconfig, schoolProgramConfig, schoolProgramMatchConfig, schoolEventConfig).subscribe(response => {
            this.schoolProfile = response;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }
}