import { Component, OnInit, Input } from "@angular/core";
import { ProgramsModel } from "./programs.models";
import { ProgramsService } from "./programs.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { CandidateProgramConfig } from "./programs.config";
import { Base } from "../../shared/models/common.models";
import { CandidateProfileSitecoreModel } from "../../shared/models/candidate-profile-sitecore.models";

@Component({
    selector: "candidate-programs",
    templateUrl: './programs.component.html'
})

export class ProgramsComponent extends Base implements OnInit {
    @Input() configKey: string = "allProgramConfig";
    model: ProgramsModel[];
    profileUrl: string;    
    isProfile: boolean;
    noProgramFound: string = "";
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private http: ProgramsService, private sitecoreConfig: SiteCoreConfig, private config: CandidateProgramConfig) {
        super();
        this.profileUrl = this.sitecoreConfig.candidateProfileUrl;      
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
    }

    ngOnInit(): void {
        this.loadData();
    }


    removeProgram(savedProgramId: number): void {
        let config = this.config.getConfiguration("deleteConfig");
        this.http.removeProgram(savedProgramId, config).subscribe(res => {
            this.loadData();
        });
    }

    private loadData(): void {
        let configObj = this.config.getConfiguration(this.configKey);
        let progConfigObject = this.config.getConfiguration("programMatchesConfig");
        let progServiceConfig = this.config.getConfiguration("programServiceConfig");
        configObj.identityId = this.sitecoreConfig.currentAccount.identityID;
        let constConfig = this.config.getConfiguration("programConstentConfig");
        this.isProfile = !!configObj.isProfile;
        if (configObj.identityId) {
            this.isLoading = true;
            this.http.getPrograms(configObj, progConfigObject, progServiceConfig).subscribe(response => {
                this.model = response;
                this.isLoading = false;
                if (this.model && this.model.length > 0) {
                    this.noProgramFound = "";
                } else {
                    this.noProgramFound = constConfig.emptyMessage;
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
