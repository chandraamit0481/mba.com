import { Component, OnInit, Directive } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { AddToCartService } from "../components/add-to-cart/add-to-cart.service";
import { SiteCoreConfig } from "../config/sitecore.config";

@Directive({
    selector: "[auto-save]",
})

export class AutoSaveDirective implements OnInit {
    cartSessionKey = "productInformation";
    configKey = "shoppingCart";
    constructor(private siteCoreConfig: SiteCoreConfig, private cartService: AddToCartService, private cookieService: CookieService) {
       
    }

    ngOnInit(): void {
        let asknetCookie = "gmacmc";
        if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID && sessionStorage.getItem(this.cartSessionKey) && !this.cookieService.get(asknetCookie)) {           
            this.cartService.saveToCart(this.cartService.getSessionData());
        } else if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID && sessionStorage.getItem(this.cartSessionKey) && this.cookieService.get(asknetCookie)) {
            sessionStorage.removeItem(this.cartSessionKey);
        }
    }
    
}