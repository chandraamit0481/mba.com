import { Component, Input, OnInit } from '@angular/core';
import { CartIconService } from "./cart-icon.service";
import { CartIconConfig } from "./cart-icon.config";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { Base, CartModel } from '../../models/common.models';
import { DataService } from '../../services/share-data.service';

@Component({
    selector: "cart-icon",
    templateUrl: "./cart-icon.component.html"
})

export class CartIconComponent extends Base implements OnInit {
    @Input() configKey: string = "cartIcon";
    count: number;
    @Input() cartData: CartModel[];
    private config: any;

    constructor(private cartIconService: CartIconService, private cartIconConfig: CartIconConfig, private siteCoreConfig: SiteCoreConfig, private dataService: DataService) { super(); }

    ngOnInit(): void {        
        this.dataService.itemAdded$.subscribe(x => {
            this.getCartCount();
        });
        this.getCartCount();
        
    }

    private getCountFromSession(): void {
        this.count = this.cartIconService.getCountFromSession();

    }

    private getCountFromServices(): void {      
        this.cartIconService.getCount(this.config).subscribe(response => {
            this.count = response;
        });
    }

    private getCartCount(): void {
        this.config = this.cartIconConfig.getConfiguration(this.configKey);
        if (this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID) {
            this.config.identityId = this.siteCoreConfig.currentAccount.identityID;
            this.getCountFromServices();
        } else {
            this.getCountFromSession();
        }
    }
}