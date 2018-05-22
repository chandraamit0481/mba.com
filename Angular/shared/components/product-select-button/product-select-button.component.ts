import { Component, Input, OnInit } from '@angular/core';
import { ProductSelectButtonConfig } from "./product-select-button.config";
import { ProductPurchasedDataModel } from "../../../preparation/product-listing/product-listing.model";
import { Base } from '../../models/common.models';
import { Products } from '../../../preparation/preparation.models';
declare let DoLogin: any;
@Component({
    selector: "product-select-button",
    templateUrl: "./product-select-button.component.html"
})

export class ProductPurchasedComponent extends Base implements OnInit {
    @Input() product: Products;
    @Input() qty: number = 1;
    addToCart: boolean = false;
    

    constructor(private productSelectButtonConfig: ProductSelectButtonConfig) {
        super();
    }

    ngOnInit(): void {

    }

    redirectPage(btnText: string, url: string): void {
        if (btnText.toLowerCase() === "access gmat official prep")
            DoLogin(url);
        else
            location.href = url;
    }
}