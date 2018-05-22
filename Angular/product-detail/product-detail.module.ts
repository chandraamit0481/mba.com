import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpService } from "../shared/services/http.service";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductDetailContentComponent } from "./product-detail-content/product-detail-content.component";
import { SaveComponent } from "../shared/components/save/save.component";
import { ViewSavedComponent } from "../shared/components/ViewSaved/viewsaved.component";
import { SocialMediaIcon } from "../shared/components/social-media-icon/social-media-icon.component";
import { ProductDetailConfig } from "./product-detail.config";
import { ProductDetailService } from "./product-detail.service";
import { UrlBuilderService } from "../shared/services/url-builder.service";
import { BaseService } from "../shared/services/base.service";
import { SaveService } from "../shared/components/save/save.service";
import { SaveConfig } from "../shared/components/save/save.config";
import { CookieModule } from 'ngx-cookie';
import { RelatedContentModule } from '../shared/components/related-content/related-content.module';
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { RangePipe } from '../shared/pipes/range';
import { ProductRightSectionComponent } from './product-detail-right-section/product-detail-right-section.component';
import { AddToCartComponent } from '../shared/components/add-to-cart/add-to-cart.component';
import { FormsModule } from '@angular/forms';
import { AddToCartService } from '../shared/components/add-to-cart/add-to-cart.service';
import { AddToCartConfig } from '../shared/components/add-to-cart/add-to-cart.config';
import { ShoppingCartComponent } from '../shared/components/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../shared/components/shopping-cart/shopping-cart.service';
import { ShoppingCartConfig } from '../shared/components/shopping-cart/shopping-cart.config';
import { SafeHtmlPipe } from '../shared/pipes/safe-html';
import { DataService } from '../shared/services/share-data.service';
import { CartIconService } from "../shared/components/cart-icon/cart-icon.service";
import { CartIconConfig } from "../shared/components/cart-icon/cart-icon.config";
import { CartIconComponent } from "../shared/components/cart-icon/cart-icon.component";
import { CurrencyFormatPipe } from '../shared/pipes/currency';
import { CurrencyPipe } from '@angular/common';
import { NoProductAvailableComponent } from '../shared/components/no-product-available/no-product-available.component';
import { MainModule } from '../shared/modules/main.module';
import { RelatedContentComponent } from '../shared/components/related-content/related-content.component';
import { RelatedContentService } from '../shared/components/related-content/related-content.service';
import { RelatedContentConfig } from '../shared/components/related-content/related-content.config';
import { AutoSaveDirective } from '../shared/directives/auto-save.directive';
import { ProductPurchasedComponent } from '../shared/components/product-select-button/product-select-button.component';
import { ProductSelectButtonConfig } from '../shared/components/product-select-button/product-select-button.config';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CookieModule.forRoot(), MainModule],
    declarations: [ProductDetailComponent, CartIconComponent, ProductPurchasedComponent, ProductDetailContentComponent, SafeHtmlPipe, AddToCartComponent, ShoppingCartComponent, ProductRightSectionComponent, RangePipe, SaveComponent, SocialMediaIcon, ViewSavedComponent, RelatedContentComponent, CurrencyFormatPipe, NoProductAvailableComponent, AutoSaveDirective],
    providers: [ProductDetailConfig, ProductSelectButtonConfig ,DataService, ProductDetailService, AddToCartService, AddToCartConfig, SaveService, SaveConfig, ShoppingCartService, ShoppingCartConfig, HttpService, UrlBuilderService, BaseService, SiteCoreConfig, RelatedContentConfig, RelatedContentService, CartIconService, CartIconConfig, CurrencyPipe],
    bootstrap: [ProductDetailComponent]
})

export class ProductDetailModule { }