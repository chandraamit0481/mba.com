import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { AddToCartComponent } from "../shared/components/add-to-cart/add-to-cart.component";
import { AddToCartService } from "../shared/components/add-to-cart/add-to-cart.service";
import { HttpService } from "../shared/services/http.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { DataService } from "../shared/services/share-data.service";
import { PrimaryFeaturedProductsComponent } from "./primary-featured-products/primary-featured-products.component";
import { PreparationLandingConfig } from "./preparation.config";
import { AddToCartConfig } from "../shared/components/add-to-cart/add-to-cart.config";
import { SecondaryFeaturedProductComponent } from "./secondary-featured-products/secondary-featured-products.component";
import { ProductBottomComponent } from "./product-bottom/product-bottom.component";
import { ProductBottomService } from "./product-bottom/product-bottom.service";
import { PreparationComponent } from './preparation.component';
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { CookieModule } from 'ngx-cookie';
import { MainModule } from '../shared/modules/main.module';
import { SiteCoreConfig } from '../shared/config/sitecore.config';
import { ShoppingCartComponent } from '../shared/components/shopping-cart/shopping-cart.component';
import { CartIconComponent } from '../shared/components/cart-icon/cart-icon.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CartIconService } from '../shared/components/cart-icon/cart-icon.service';
import { CartIconConfig } from '../shared/components/cart-icon/cart-icon.config';
import { ShoppingCartService } from '../shared/components/shopping-cart/shopping-cart.service';
import { ShoppingCartConfig } from '../shared/components/shopping-cart/shopping-cart.config';
import { BaseService } from '../shared/services/base.service';
import { ProductPurchasedComponent } from '../shared/components/product-select-button/product-select-button.component';
import { ProductSelectButtonConfig } from '../shared/components/product-select-button/product-select-button.config';
import { ProductListingService } from './preparation.service';
import { ProductDetailConfig } from '../product-detail/product-detail.config';
import { CurrencyFormatPipe } from '../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';
import { NoProductAvailableComponent } from '../shared/components/no-product-available/no-product-available.component';
import { AutoSaveDirective } from '../shared/directives/auto-save.directive';
import { SafeHtmlPipe } from '../shared/pipes/safe-html';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule],
    declarations: [PreparationComponent, ProductPurchasedComponent, ShoppingCartComponent, ProductListingComponent, CartIconComponent, AddToCartComponent, PrimaryFeaturedProductsComponent, SecondaryFeaturedProductComponent, ProductBottomComponent, ViewSavedComponent, CurrencyFormatPipe, NoProductAvailableComponent, AutoSaveDirective, SafeHtmlPipe ],
    providers: [ProductListingService, ProductDetailConfig, BaseService, ProductSelectButtonConfig, HttpService, UrlBuilderService, CartIconService, CartIconConfig, AddToCartService, AddToCartConfig, ShoppingCartService, ShoppingCartConfig, ProductBottomService, DataService, PreparationLandingConfig, SiteCoreConfig, CurrencyPipe ],
    bootstrap: [PreparationComponent]
})

export class PreparationModule { }