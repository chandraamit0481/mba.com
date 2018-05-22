import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartDataModel } from "./shopping-cart.model";
import { ShoppingCartService } from "./shopping-cart.service";
import { ShoppingCartConfig } from "./shopping-cart.config";
import { CartModel, Base } from "../../models/common.models";
import { DataService } from "../../services/share-data.service";
import { SiteCoreConfig } from "../../config/sitecore.config";

@Component({
    selector: "shopping-cart",
    templateUrl: "./shopping-cart.component.html"
})

export class ShoppingCartComponent extends Base implements OnInit {
    @Input() configKey: string = "shoppingCart";
    @Input() cartData: CartModel[];
    cartSessionKey = "productInformation";    
    noData: string;  
    disclaimer: string;
    shoppingCartDetails: ShoppingCartDataModel[];
    constructor(private shoppingCartService: ShoppingCartService, private config: ShoppingCartConfig, private siteCoreConfig: SiteCoreConfig, private dataService: DataService) { super(); }

    ngOnInit(): void {
        this.disclaimer = this.siteCoreConfig.disclaimer;         
        this.dataService.itemAdded$.subscribe(x => {
            this.cartData = x.cartItem;
            this.getProducts();     
        });
        this.getProducts();
       
    }

    getSessionData(): CartModel[] {
        return <CartModel[]>JSON.parse(sessionStorage.getItem(this.cartSessionKey));
    }

    setSessionData(cartData: CartModel[]): void {
        sessionStorage.setItem(this.cartSessionKey, JSON.stringify(cartData));
    }

    delete( cartId, productId) : void {
        if (cartId !== 0) {
            let configObject = this.config.getConfiguration("deleteItem");            
            this.shoppingCartService.delete(configObject, cartId).subscribe();           
        } else {
            let totalCartData: CartModel[];
            totalCartData = this.getSessionData();
            let matchSameProduct = totalCartData.filter(o => Number(o.productId) === Number(productId));
            if (matchSameProduct && matchSameProduct.length) {
                if (totalCartData.length > 0) {
                    let index = totalCartData.indexOf(matchSameProduct[0]);
                        totalCartData.splice(index, 1);
                        this.setSessionData(totalCartData);
                }

            }
        }
        
        this.dataService.setOption("cartItem", this.cartData);
        
    }


    getProducts(): void {
        this.noData = '';
        let configObj = this.config.getConfiguration(this.configKey);
        let shoppingCartConfigObject = this.config.getConfiguration("productConfig");
        this.shoppingCartDetails = <ShoppingCartDataModel[]>[];
        this.isLoading = true;
        this.shoppingCartService.getProducts(configObj, shoppingCartConfigObject, this.cartData).subscribe(response => {            
            if (response) {
                this.shoppingCartDetails = response;
            } else {
                this.noData = 'Your cart is empty.';
            }
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }

    checkout(): void {
        this.shoppingCartService.checkout().subscribe(response => {
            if (response) {
                window.location.href = response;
            }
        });
    }
}