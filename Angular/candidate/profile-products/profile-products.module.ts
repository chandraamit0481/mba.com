import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileProductComponent } from "./profile-products.component";
import { ProfileProductService } from "./profile-products.service";
import { ProfileProductPurchaseConfig } from "./profile-products.config";
import { RouterModule } from "@angular/router";
import { MainModule } from "../../shared/modules/main.module";
import { BaseService } from '../../shared/services/base.service';

@NgModule({
    imports: [BrowserModule, RouterModule, MainModule],
    declarations: [ProfileProductComponent],
    providers: [ProfileProductService, ProfileProductPurchaseConfig, BaseService],
    exports: [ProfileProductComponent]
})

export class ProfileProductModule { }