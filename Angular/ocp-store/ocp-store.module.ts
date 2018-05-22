import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { DataService } from "../shared/services/share-data.service";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from '../shared/modules/main.module';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { AddToCartComponent } from "../shared/components/add-to-cart/add-to-cart.component";
import { AddToCartService } from "../shared/components/add-to-cart/add-to-cart.service";
import { AddToCartConfig } from "../shared/components/add-to-cart/add-to-cart.config";
import { ShoppingCartComponent } from '../shared/components/shopping-cart/shopping-cart.component';
import { CartIconComponent } from '../shared/components/cart-icon/cart-icon.component';
import { CartIconService } from '../shared/components/cart-icon/cart-icon.service';
import { CartIconConfig } from '../shared/components/cart-icon/cart-icon.config';
import { ShoppingCartService } from '../shared/components/shopping-cart/shopping-cart.service';
import { ShoppingCartConfig } from '../shared/components/shopping-cart/shopping-cart.config';
import { BaseService } from '../shared/services/base.service';
import { CurrencyFormatPipe } from '../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';
import { NoProductAvailableComponent } from '../shared/components/no-product-available/no-product-available.component';
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { OcpStoreConfig } from './ocp-store.config';
import { OcpStoreComponent } from './ocp-store.component';
import { OcpStoreService } from './ocp-store.service';
import { ProductPurchasedComponent } from '../shared/components/product-select-button/product-select-button.component';
import { ProductSelectButtonConfig } from '../shared/components/product-select-button/product-select-button.config';
import { ProductDetailConfig } from '../product-detail/product-detail.config';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule],
    declarations: [OcpStoreComponent, ShoppingCartComponent, ProductPurchasedComponent, CartIconComponent, AddToCartComponent, ViewSavedComponent, CurrencyFormatPipe, NoProductAvailableComponent ],
    providers: [BaseService, OcpStoreService, HttpService, UrlBuilderService, CartIconService, ProductDetailConfig, ProductSelectButtonConfig, CartIconConfig, AddToCartService, AddToCartConfig, ShoppingCartService, ShoppingCartConfig, DataService, OcpStoreConfig, SiteCoreConfig, CurrencyPipe ],
    bootstrap: [OcpStoreComponent]
})

export class OcpStoreModule { }