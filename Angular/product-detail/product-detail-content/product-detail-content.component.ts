import { Component, Input } from '@angular/core';
import { ProductDetailDataModel } from "../product-detail.model";
import { SiteCoreConfig } from '../../shared/config/sitecore.config';

@Component({
    selector: 'product-detail-content',
    templateUrl: './product-detail-content.component.html'
})

export class ProductDetailContentComponent {

    @Input() productContent: ProductDetailDataModel;
    configKey: string = "productDetail";
    relatedProductItemIds: string;

    constructor(private siteCoreConfig: SiteCoreConfig) {
        this.relatedProductItemIds = this.siteCoreConfig.relatedProduct;

    }

}