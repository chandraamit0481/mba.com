import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../shared/services/http.service";
import { ConfigModel, IValue } from "../shared/models/common.models";
import { BaseService } from "../shared/services/base.service";
import { ProductDetailDataModel } from "./product-detail.model";
import { altTextConstants } from '../shared/consts/consts';
import { ProductDetailConfig } from './product-detail.config';

@Injectable()
export class ProductDetailService extends BaseService {

    constructor(private http: HttpService, private productDetailConfig: ProductDetailConfig) { super(); }

    getAll(config: ConfigModel): Observable<ProductDetailDataModel> {
        return this.http.getData(config)
            .map(response => {
                return this.getContentData(response);
            });
    }

    private getContentData(productDetailContent: any): ProductDetailDataModel {
        let productContentData: ProductDetailDataModel = new ProductDetailDataModel();
        if (this.hasResults(productDetailContent) && productDetailContent.data[0].searchResults[0].fields) {
            let productDetail = productDetailContent.data[0].searchResults[0].fields;
            productContentData.productId = this.getIntValue(productDetail.productId);
            productContentData.productDetailDescription = this.getValue(productDetail.body);
            productContentData.productAlertMessage = this.getValue(productDetail.productAlertMessage);
            productContentData.productTitle = this.getValue(productDetail.title);
            productContentData.productCaption = this.getValue(productDetail.caption);            
            productContentData.productImage = this.getValue(productDetail.productImageAltText) === "" ? altTextConstants.AltImgText : this.getValue(productDetail.productImageAltText);
            productContentData.productImageUrl = this.getValue(productDetail.productImageUrl);
            productContentData.productOnsale = this.getBoolValue(productDetail.onSale);
            productContentData.productPrice = (productDetail.price && productDetail.price.value && productDetail.price.value === null) ? null : this.getIntValue(productDetail.price);            
            productContentData.productDiscountedPrice = this.getValue(productDetail.retailPrice);
            productContentData.productMessageBelowPrice = this.getValue(productDetail.cartMessageBelowPrice);
            productContentData.productFormat = this.getValue(productDetail.productFormat);
            productContentData.productAltAddToCartButtonText = this.getValue(productDetail.cartAltAddToCartButtonText);
            productContentData.productAltAddToCartButtonLink = this.getValue(productDetail.cartAltAddToCartButtonLink);
            productContentData.productShowAddToCart = this.getBoolValue(productDetail.cartShowAddButton);        
            productContentData.productQuantityMaxAllowedInCart = this.getIntValue(productDetail.cartQuantityMaxAllowed) === 0 ? this.productDetailConfig.maxQuantity : this.getIntValue(productDetail.cartQuantityMaxAllowed);
            productContentData.sku = this.getValue(productDetail.sku);
        }
        return productContentData;
    }

}