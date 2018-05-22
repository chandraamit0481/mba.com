import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../shared/services/http.service';
import { BaseService } from '../shared/services/base.service';
import { ProductListingDataModel } from './preparation.models';


@Injectable()
export class ProductListingService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }
    getData(config: any): Observable<ProductListingDataModel[]> {
        return this.http.getData(config)
            .map(response => {
                return this.getProductListing(response.data[0].searchResults);
            });
    }
    

    getProductListing(products: any): ProductListingDataModel[] {

        let item: ProductListingDataModel[] = [];
        if (products.length > 0) {

            for (let data of products) {
                let prod = new ProductListingDataModel();
                if (data.fields) {
                    let productData = data.fields;

                    prod.productBannerImageUrl = this.getValue(productData.bannerImageUrl);
                    prod.productId = this.getIntValue(productData.productId);
                    prod.itemId = this.getValue(productData.itemId);
                    prod.productTitle = this.getValue(productData.title);
                    prod.productItemUrl = this.getValue(productData.itemUrl);
                    prod.productBannerImageUrl = this.getValue(productData.bannerImageUrl);
                    prod.productBannerImage = this.getValue(productData.bannerImage);
                    prod.productImageURL = this.getValue(productData.thumbnailImageUrl);
                    prod.productThumbImageAltText = this.getValue(productData.thumbnailImage);
                    prod.productCaption = this.getValue(productData.caption);
                    prod.productFormat = this.getValue(productData.productFormat);
                    prod.productOnSale = this.getBoolValue(productData.onSale);
                    prod.productPrice = (productData.price && productData.price.value && productData.price.value === null) ? null : this.getIntValue(productData.price);                    
                    prod.productDiscountedPrice = this.getIntValue(productData.retailPrice);
                    prod.productShowAddToCart = this.getBoolValue(productData.cartShowAddButton);
                    prod.productAltAddToCartButtonText = this.getValue(productData.cartAltAddToCartButtonText);
                    prod.productAltAddToCartButtonLink = this.getValue(productData.cartAltAddToCartButtonLink);
                    item.push(prod);
                }
            }
        }
        return item;
    }
}

