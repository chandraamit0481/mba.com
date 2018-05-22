import { Component, OnInit } from '@angular/core';
import { ProductDetailConfig } from "./product-detail.config";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { ProductDetailService } from "./product-detail.service";
import { ProductDetailDataModel } from "./product-detail.model";
import { Base } from '../shared/models/common.models';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent extends Base implements OnInit {

    productDetail: ProductDetailDataModel;
    
    constructor(private productDetailConfig: ProductDetailConfig, private siteCoreConfig: SiteCoreConfig,
        private productDetailService: ProductDetailService) { super(); }

    ngOnInit(): void {
        let config = this.productDetailConfig.getConfiguration("productDetails");
        config.productId = this.siteCoreConfig.id;
        this.productDetailService.getAll(config).subscribe(response => {
            this.productDetail = response;
        });
    }

  }