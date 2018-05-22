import { Component, OnInit, Input } from '@angular/core';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProductDataModel } from "./profile-products.model";
import { ProfileProductService } from "./profile-products.service";
import { ProfileProductPurchaseConfig } from "./profile-products.config";
import { Base } from "../../shared/models/common.models";
import { Observable } from 'rxjs/Observable';
declare let DoLogin: any;
@Component({
    selector: 'profile-product',
    templateUrl: './profile-products.component.html'
})
export class ProfileProductComponent extends Base implements OnInit {
    @Input() configKey: string;
    productPurchase: ProductDataModel[];
    productConstant: any;
    noPurchasedProduct: string;
    isCandidateHomeVisible: boolean = false;
    isProfile: boolean = true;
    showGmatPrepLink: boolean = false;
    constructor(private productPurchaseService: ProfileProductService, private siteCoreConfig: SiteCoreConfig, private purchaseConfig: ProfileProductPurchaseConfig) { super(); }

    ngOnInit() {
        this.productConstant = this.purchaseConfig.getConfiguration('productConstantConfig');
        this.configKey = this.configKey ? this.configKey : this.productConstant.keyAllProduct;
        this.getPurchasedProduct(this.configKey);
        this.showGmatPrepLink = this.siteCoreConfig.showGmatPrepLink;
    }

    download(link: string) {
        window.open(link, "_blank");
    }

    showPrepLink(sku: string): boolean {
        return this.siteCoreConfig.showGmatPrepLink &&
            this.siteCoreConfig.gmatPrepProductSkus &&
            sku &&
            this.siteCoreConfig.gmatPrepProductSkus.indexOf(sku) >= 0;
    }

    navigateToGmatPrep(): void {
        DoLogin(this.siteCoreConfig.gmatPrepSsoRedirectLink);
    }
       
    private getPurchasedProduct(configKey: string): void {

        let config = this.purchaseConfig.getConfiguration(configKey);
        let configSearch = this.purchaseConfig.getConfiguration("productSearchConfig");
        let licenseConfig = this.purchaseConfig.getConfiguration("productLicenseConfig");
        let reportConfig = this.purchaseConfig.getConfiguration("productReportConfig");

        config.identityId = this.siteCoreConfig.currentAccount.identityID;
        this.isProfile = config.isProfile;
        this.isLoading = true;

        this.productPurchaseService.getAll(config, configSearch, licenseConfig, reportConfig).subscribe(purchaseResponse => {
            this.isLoading = false;
            this.isCandidateHomeVisible = true;
            if (purchaseResponse && purchaseResponse.length > 0) {
                this.productPurchase = purchaseResponse;
                this.noPurchasedProduct = "";
            } else {
                this.noPurchasedProduct = this.productConstant.emptyMessage;
            }
        }, err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }
   
}
