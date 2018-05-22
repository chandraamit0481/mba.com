import { Injectable } from "@angular/core";
import { BaseConfig } from "../../config/base.config";

@Injectable()
export class CartIconConfig extends BaseConfig {

    config = {

        cartIcon: {
            method: "shopping-cart",
            filters: ["identityId"],
            id: ""
        }
    };
}