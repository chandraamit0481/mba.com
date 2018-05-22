import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import * as _ from 'underscore';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { CandidateProfileModel } from "../../shared/models/candidate-profile.models";


@Component({
    selector: 'program-description',
    templateUrl: './program-description.component.html'
})

export class ProgramDescriptionComponent implements OnInit {
    @Input() programDescription: any;
    @Input() programDetail: any;
    programDescriptionData: any;
    programDetailData: any;
    programMilitaryFriendlyUrl: string;
    areaOfStudy: string[] = [];
    configKey: string;
    idKey: string;
    isDetail: boolean = true;
    programOrgID: string;
    identityId: string;
    isProgramDescription: boolean = true;

    constructor(private siteCoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {
        this.configKey = "programDescription";
        this.idKey = "ProgramOrgID";
        this.programOrgID = this.siteCoreConfig.id;
        this.identityId = this.siteCoreConfig.currentAccount.identityID;
        this.programDescriptionData = this.programDescription;
        if (this.programDetail) {
            this.programMilitaryFriendlyUrl = this.programDetail.programMilitaryFriendlyUrl;
            this.programDetail.programMilitaryFriendlyUrl = "";
            this.areaOfStudy = this.programDetail.programAreaOfStudy;
            this.programDetail.programAreaOfStudy = [];
            this.programDetailData = this.getProgramDetail(this.programDetail);
        }
    }
    private getProgramDetail(programDetail: any): any {
        let array = [];
        for (let key in this.programDetail) {
            if (this.programDetail.hasOwnProperty(key)) {
                array.push(this.programDetail[key]);
            }
        }
        let resultantArray = array.filter(x => x.length !== 0);
        return resultantArray;
    }
}