import { Component } from "@angular/core";
import { Base } from "../shared/models/common.models";
import { IRPrepSignInConfig } from "./ir-prep-signin.config";
import { IRPrepSigninService } from "./ir-prep-signin.service";
import { IRPrepKeyStatusEnum } from "./ir-prep-signin.enum";
import { SiteCoreConfig } from "../shared/config/sitecore.config";

@Component({
    selector: "ir-prep-signin",
    templateUrl: './ir-prep-signin.component.html'
})

export class IRPrepSigninComponent extends Base  {    
    licenseKey: string;
    keyStatusEnum: typeof IRPrepKeyStatusEnum = IRPrepKeyStatusEnum;
    keyStatus: IRPrepKeyStatusEnum;

    constructor(private service: IRPrepSigninService, private config: IRPrepSignInConfig, private siteCoreConfig: SiteCoreConfig) {
        super();
        this.resetPage();
    }    

    validateKey(): void {        
        if (this.licenseKey) {
            let config = this.config.getConfiguration('irPrepSignInConfig');
            config.licenseKey = this.licenseKey;
            this.service.getKeyStatus(config).subscribe(response => {
                this.keyStatus = response;
                if (this.keyStatus === IRPrepKeyStatusEnum.Purchased) {
                    window.location.href = this.siteCoreConfig.irPrepSignIn;
                }                
            });
        }
    }
    resetPage() {
        this.keyStatus = IRPrepKeyStatusEnum.Purchased;
        this.licenseKey = "";
    }
}
