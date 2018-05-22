import { Component, OnInit } from '@angular/core';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ProductBottomService } from "./product-bottom.service";
import { ProductBottom } from "../preparation.models";
import { PreparationLandingConfig } from "../preparation.config";
import { Base } from '../../shared/models/common.models';

@Component({
    selector: 'product-bottom',
    templateUrl: './product-bottom.component.html'
})

export class ProductBottomComponent extends Base implements OnInit {
    testSection: string[];
    selectedTopic: string;
    configKey: string = "productListing";

    constructor(private productBottomService: ProductBottomService, private siteCoreConfig: SiteCoreConfig, private preparationLandingConfig: PreparationLandingConfig) { super(); }

    ngOnInit(): void {        
        let config = this.preparationLandingConfig.getConfiguration("bottomConfig");
        this.isLoading = true;
        this.productBottomService.getData(config).subscribe(response => {
            this.testSection = response;

            if (response && response[0]) {
                this.selectedTopic = response[0];
            }
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }

    updateProductList(selectedSectionName: string): void {
        this.selectedTopic = selectedSectionName;
    }
}
