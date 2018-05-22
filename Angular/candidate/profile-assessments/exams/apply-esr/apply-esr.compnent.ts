import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { SiteCoreConfig } from "../../../../shared/config/sitecore.config";
import { Base } from "../../../../shared/models/common.models";
import { ExamsConfig } from "../exams.config";
import { ExamsService } from "../exams.service";
import { CandidateProfileSitecoreModel } from "../../../../shared/models/candidate-profile-sitecore.models";
import { DataService } from "../../../../shared/services/share-data.service";
@Component({
    selector: "apply-esr",
    templateUrl: './apply-esr.component.html'
})

export class ApplyESRComponent extends Base implements OnInit, OnChanges {
    @ViewChild('confirmationModel') confirmationModelPopUp: ElementRef;
    @Input() appointmentId: string;
    confirmationMessage: string = "";
    alertMessage: string = "";
    activationCode: string;
    responseMessage: string;
    esrProductPurchaseURL: string;
    applyConfigKey: any;
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private sitecoreConfig: SiteCoreConfig, private applyConfig: ExamsConfig, private service: ExamsService, private dataService: DataService) {
        super();
    }

    ngOnInit(): void {
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
        this.esrProductPurchaseURL = this.profileLabels.esrProductPurchaseURL;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && !changes.appointmentId.firstChange) {
            this.getESRCode();
        }
    }

    getESRCode(): void {
        let getESRConfigKey = this.applyConfig.getConfiguration('productPurchase');
        getESRConfigKey.identityID = this.sitecoreConfig.currentAccount.identityID;
        this.isLoading = true;
        this.service.getESRKey(getESRConfigKey).subscribe(response => {
            this.activationCode = response;
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            this.errored = true;
        }
        );

    }

    applyCode(): void {
        this.errored = false;
        this.applyConfigKey = this.applyConfig.getPostConfiguration('applyCode');
        this.applyConfigKey.appointmentID = this.appointmentId;
        this.applyConfigKey.licenseKey = this.activationCode;
        this.applyConfigKey.identityID = this.sitecoreConfig.currentAccount.identityID;
        if (this.activationCode) {
            this.confirmationMessage = this.applyConfigKey.confirmationMessage;
            this.confirmationMessage = this.confirmationMessage.replace("{0}", this.activationCode || "").replace("{1}", this.appointmentId);
            this.confirmationModelPopUp.nativeElement.className = 'modal fade show';
        }
        else
            this.alertMessage = this.applyConfigKey.alertMessage;
        this.responseMessage = "";
    }

    processESRCode(): void {
        this.confirmationMessage = "";
        this.isLoading = true;
        this.service.applyCode(this.applyConfigKey).subscribe(res => {
            if (res.toUpperCase() === "SUCCESS") {
                let email = this.sitecoreConfig.currentAccount.email || "your email";
                this.responseMessage = this.applyConfig.config.pageMessage.sucessMessage.replace("{0}", email);
            }
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            this.errored = true;
        }
        );
    }

    refreshExamSection(): void {
        if (this.responseMessage) {
            this.dataService.setOption("data", "Refresh");
        }

    }
}
