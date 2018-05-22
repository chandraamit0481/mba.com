import { Component, Input, OnInit } from '@angular/core';
import { ProgramDataModel } from "./program-list.model";
import { ProgramsListConfig } from "./programs-list.config";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProfileService } from "../../shared/services/profile.service";
import { SaveModel } from "../../shared/models/common.models";

@Component({
    selector: "programs-list",
    templateUrl: "./programs-list.component.html"
})

export class ProgramsListComponent implements OnInit {
    @Input() programData: ProgramDataModel[] = [];
    saveKey: string = 'programMatch';
    savedProgramList: SaveModel[];
    constructor(private programsListConfig: ProgramsListConfig, private siteCoreConfig: SiteCoreConfig, private profileService: ProfileService) {
    }

    ngOnInit(): void {
        this.getSavedProgramList();
    }

    private getSavedProgramList(): void {
        let identityId = this.siteCoreConfig.currentAccount.identityID;
        if (identityId) {
            let config = this.programsListConfig.getConfiguration("savedPrograms");
            config["identityId"] = identityId;
            this.profileService.getSavedItems(config).subscribe(response => {
                this.savedProgramList = response;
            }
            );
        }
    }
}