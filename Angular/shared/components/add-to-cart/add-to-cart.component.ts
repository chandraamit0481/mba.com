import { Component, OnInit, Input } from "@angular/core";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { CartModel } from "../../models/common.models";
import { AddToCartService } from "./add-to-cart.service";
import { AddToCartConfig } from "./add-to-cart.config";
import { DataService } from "../../services/share-data.service";
import { ProductDetailConfig } from "../../../product-detail/product-detail.config";

@Component({
    selector: "add-to-cart",
    templateUrl: "./add-to-cart.component.html"
})

export class AddToCartComponent implements OnInit {

    @Input() configKey: string;
    @Input() productId: number;
    @Input() qty: number = 1;
    @Input() productFormat: string;
    @Input() selectButtonText: string;
    cartSessionKey = "productInformation";
    cartData: CartModel[];
    constructor(private addToCartService: AddToCartService, private productDetailConfig: ProductDetailConfig, private addToCartConfig: AddToCartConfig, private siteCoreConfig: SiteCoreConfig, private dataService: DataService) { }

    ngOnInit(): void { }
    
    addToCart(): void {      
        let cart = new CartModel();
        cart.productId = this.productId;
        cart.qty = this.qty;
        cart.isVoucher = (this.productFormat && this.productFormat.toLowerCase() === this.addToCartConfig.productFormat) ? true : false;

        if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID) {
            cart.identityId = this.siteCoreConfig.currentAccount.identityID;           
            let cartItem = <CartModel[]>[];
            cartItem.push(cart);
            this.cartData = cartItem;
            this.addToCartService.saveToCart(this.cartData);
        } else {
            cart.identityId = '';
            this.processData(cart);
        }

    }


    private processData(cart: CartModel): void {
        if (sessionStorage.getItem(this.cartSessionKey)) {
            this.cartData = <CartModel[]>[];
            let totalCartData: CartModel[];
            totalCartData = this.addToCartService.getSessionData();
            if (totalCartData.length > 0) {
                let matchSameProduct = totalCartData.filter(o => Number(o.productId) === Number(this.productId));
                if (matchSameProduct && matchSameProduct.length) {
                    if (this.productFormat && this.productFormat.toLowerCase() === this.addToCartConfig.productFormat) {
                        matchSameProduct[0].qty = (Number(matchSameProduct[0].qty) + Number(this.qty)) > this.productDetailConfig.maxQuantity ? this.productDetailConfig.maxQuantity : Number(matchSameProduct[0].qty) + Number(this.qty);
                    } else {
                        matchSameProduct[0].qty = Number(matchSameProduct[0].qty) + Number(this.qty);
                    }

                } else {
                    totalCartData.push(cart);
                }
            } else {
                totalCartData.push(cart);
            }

            this.addToCartService.setSessionData(totalCartData);
            this.cartData = totalCartData;
        } else {
            let cartItem = <CartModel[]>[];
            cartItem.push(cart);
            this.cartData = cartItem;
            this.addToCartService.setSessionData(cartItem);
        }
        
        this.dataService.setOption("cartItem", this.cartData);
    }


}