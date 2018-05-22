import { Component, Input, OnInit } from '@angular/core';
import { SiteCoreConfig } from '../../config/sitecore.config';


@Component({
    selector: 'no-product-available',
    templateUrl: './no-product-available.component.html'
})

export class NoProductAvailableComponent implements OnInit {
    contactUsUrl: string;
    noProductAvailable: string;

    constructor(private siteCoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {        
        this.noProductAvailable = this.siteCoreConfig.noProductAvailable;
        this.contactUsUrl = this.siteCoreConfig.contactUsUrl;
    }   
    
}