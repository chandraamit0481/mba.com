import { Component, OnInit, Input } from '@angular/core';
import { Products } from "../preparation.models";

@Component({
    selector: 'secondary-featured-products',
    templateUrl: './secondary-featured-products.component.html'
})

export class SecondaryFeaturedProductComponent implements OnInit {

    secondaryProductList: Products[];
    @Input() secondaryProduct: Products[];
    cartKey: string = "shoppingCart";

    constructor() { }

    ngOnInit(): void {
        this.secondaryProductList = this.secondaryProduct;
    }
}
