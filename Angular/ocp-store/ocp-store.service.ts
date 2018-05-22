import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { BaseService } from '../shared/services/base.service';
import { OcpStoreListingDataModel } from './ocp-store.models';

@Injectable()
export class OcpStoreService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }
    getData(config: any): Observable<OcpStoreListingDataModel[]> {

        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response)) {
                    return this.getOcpStoreListing(response.data[0].searchResults);
                }                
                return null;
            });
    }
  

    private getOcpStoreListing(products: any): OcpStoreListingDataModel[] {

        let item: OcpStoreListingDataModel[] = [];
        if (products.length > 0) {

            for (let data of products) {
                let prod = new OcpStoreListingDataModel();
                let productData = data.fields;

                prod.productBannerImageUrl = this.getValue(productData.bannerImageUrl);
                prod.productId = this.getIntValue(productData.productId);
                prod.productTitle = this.getValue(productData.title);
                prod.productItemUrl = this.getValue(productData.itemUrl);
                prod.productBannerImageUrl = this.getValue(productData.bannerImageUrl);
                prod.productBannerImage = this.getValue(productData.bannerImage);
                prod.productImageURL = this.getValue(productData.thumbnailImageUrl);
                prod.productThumbImageAltText = this.getValue(productData.thumbnailImage);
                prod.productCaption = this.getValue(productData.caption);
                prod.productFormat = this.getValue(productData.productFormat);
                prod.productOnSale = this.getBoolValue(productData.onSale);                
                prod.productPrice = this.getIntValue(productData.price);         
                prod.productDiscountedPrice = this.getIntValue(productData.retailPrice);    
                prod.productShowAddToCart = this.getBoolValue(productData.cartShowAddButton);
                prod.productAltAddToCartButtonText = this.getValue(productData.cartAltAddToCartButtonText);
                prod.productAltAddToCartButtonLink = this.getValue(productData.cartAltAddToCartButtonLink);
                
                item.push(prod);
            }
        }
        return item;

    }

    
}

