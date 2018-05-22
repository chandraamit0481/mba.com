import { Component, OnInit, Directive } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { Router, NavigationEnd } from '@angular/router';
import { CandidateProfileModel } from "../shared/models/candidate-profile.models";
import { CandidateProfileConfig } from "./candidate-profile.config";
import { CandidateProfileService } from "./candidate-profile.service";
import { Observable } from "rxjs/Observable";
import { Base } from "../shared/models/common.models";
import { CandidateProfileSitecoreModel } from "../shared/models/candidate-profile-sitecore.models";


@Component({
    selector: "candidate-profile",
    templateUrl: './candidate-profile.component.html'
})

export class CandidateProfileComponent extends Base implements OnInit {
    model: CandidateProfileModel;
    changePasswordUrl: string;
    pvueProfileUrl: string;
    profilePageUrl: string;
    profileUpdMessage: string;
    private timeoutId: any;
    private serviceTimeOut: number;
    private updateKey: string = "PUVUpdate";
    private profileLabels: CandidateProfileSitecoreModel;
    constructor(private sitecoreConfig: SiteCoreConfig, private router: Router, private candidateProfileConfig: CandidateProfileConfig, private candidateProfileService: CandidateProfileService) {
        super();
    }

    ngOnInit(): void {     
        
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
        this.serviceTimeOut = this.profileLabels.serviceTimeout;
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0);
        });

        if (this.sitecoreConfig.currentAccount) {
            this.isLoading = true;
            this.timeoutId = setTimeout(() => {
                this.getData();
            }, this.serviceTimeOut);
        }

        if (sessionStorage.getItem(this.updateKey)) {
            this.profileUpdMessage = this.profileLabels.profileUpdMessage;
        }
        else {
            this.profileUpdMessage = "";
        }       
        this.changePasswordUrl = this.profileLabels.changePasswordUrl;
        this.pvueProfileUrl = this.profileLabels.pvueProfileUrl;
        this.profilePageUrl = this.profileLabels.profilePageUrl;
    }

    redirect(url: string): void {
        if (url.length > 0) {
            if (url == this.pvueProfileUrl) {
                sessionStorage.setItem(this.updateKey, "true");
            }
            location.href = url.replace("{0}", location.href);            
        }
    }

    closeMessageBox(): void {
        sessionStorage.removeItem(this.updateKey);
        this.profileUpdMessage = "";
    }

    redirectCommPref(gmatId: string): void {
        if (gmatId) {
            if (this.pvueProfileUrl) {
                sessionStorage.setItem(this.updateKey, "true");
                location.href = this.pvueProfileUrl.replace("{0}", location.href)
            } else {
                location.href = ""
            } 
        } else {
            location.href = this.profilePageUrl ? this.profilePageUrl.replace("{0}", location.href) : "";
        }        
    }

    private getData = function (): void {
        let configObject = this.candidateProfileConfig.getConfiguration("profileConfig");
        configObject.id = this.sitecoreConfig.currentAccount.identityID;
        this.isLoading = true;
        this.candidateProfileService.getData(configObject).subscribe(response => {
            this.model = response;
            this.isLoading = false;
            clearTimeout(this.timeoutId);
        }, err => {
            this.isLoading = false;
            this.errored = true;
        }
        );
    };
}
