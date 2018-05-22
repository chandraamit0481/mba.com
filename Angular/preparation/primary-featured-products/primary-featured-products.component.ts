import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PreparationLandingConfig } from "../preparation.config";
import { ProductsList, Products } from "../preparation.models";
import { ProductListingService } from '../preparation.service';
import { Base } from '../../shared/models/common.models';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { DataService } from "../../shared/services/share-data.service";
@Component({
    selector: 'primary-product-featured',
    templateUrl: './primary-featured-products.component.html'
})

export class PrimaryFeaturedProductsComponent extends Base implements OnInit {
    products: ProductsList;
    selectedTopic: string = "";
    primaryProductOne: Products;
    secondaryProduct: Products[] = [];
    cartKey: string = "shoppingCart";
    title: string = "";
   
    constructor(private productListingService: ProductListingService, private siteCoreConfig: SiteCoreConfig, private preparationConfig: PreparationLandingConfig, private dataService: DataService) {
        super();
        this.title = this.siteCoreConfig.title;
    }

    ngOnInit(): void {
        let configObject = this.preparationConfig.getConfiguration("productPrimaryConfig");
        if (this.siteCoreConfig.boostedId) {

            configObject.topResults = this.siteCoreConfig.boostedId;
        }
        this.isLoading = true;
        this.productListingService.getData(configObject).subscribe(response => {
            this.getItems(response);
            this.selectedData(response);
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
            this.errored = true;
        }
        );
    }

    private selectedData(featuredProducts: any): void {
        if (featuredProducts) {
            for (let index = 0; index < featuredProducts.length && index < 3; index++) {
                if (index === 0)
                    this.primaryProductOne = featuredProducts[index];
                else if (index > 0 && this.secondaryProduct.length < 2)
                    this.secondaryProduct.push(featuredProducts[index]);
            }
        }
        this.products = new ProductsList();
        this.products.primaryProductOne = this.primaryProductOne;
        this.products.secondaryProduct = this.secondaryProduct;
    }

    private getItems(items: any): void {
        let item = items.map(o => o.itemId).join(",");
        this.dataService.setOption("excludeItems", item.replace(/(^,)|(,$)/g, ""));
    }
}

