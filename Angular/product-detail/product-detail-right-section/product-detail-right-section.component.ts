import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailDataModel } from "../product-detail.model";
import { ProductDetailConfig } from "../product-detail.config";
import { ProductIDEnum } from '../../shared/enums/lookups.enums';
import { SiteCoreConfig } from '../../shared/config/sitecore.config';
import { Base } from '../../shared/models/common.models';
declare let DoLogin: any;

@Component({
    selector: 'product-right-section',
    templateUrl: './product-detail-right-section.component.html'
})

export class ProductRightSectionComponent extends Base implements OnInit {

    @Input() productContent: ProductDetailDataModel;
    minLimit: number;
    voucher: number = 1;
    productDetail: string = "Detail";    
    isShowAddToCart: boolean = true;
    constructor(private productDetailConfig: ProductDetailConfig, private siteCoreConfig: SiteCoreConfig) {
        super();
    }

    ngOnInit(): void {
        if (this.productDetailConfig && this.productDetailConfig.config && this.productDetailConfig.config.productDetails) {
            this.minLimit = this.productDetailConfig.config.productDetails.minLimit;
        }
        if (this.productContent.productFormat.toLowerCase() === "download" && this.productContent.productPrice == 0) {
            this.isShowAddToCart = false;
        }

    }  

    redirectPage(btnText: string, url: string): void {
        if (btnText.toLowerCase() === "access gmat official prep")
            DoLogin(url);
        else
            location.href = url;
    }
}