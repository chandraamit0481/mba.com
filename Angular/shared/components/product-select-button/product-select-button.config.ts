import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class ProductSelectButtonConfig extends BaseConfig {
    config = {
        productButton: {
            addToCartText: "Add to cart",
            viewDetailText: "View Details",
            updateText: "Latest Version"
        }
    };
}