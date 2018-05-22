import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../../shared/services/share-data.service";
import { Base } from "../../shared/models/common.models";
import { ProductListingService } from "../preparation.service";
import { ProductListingDataModel } from "../preparation.models";
import { PreparationLandingConfig } from "../preparation.config";
import { OperatorsEnum } from "../../shared/enums/operators.enum";

@Component({
    selector: "product-listing",
    templateUrl: "./product-listing.component.html"

})

export class ProductListingComponent extends Base implements OnInit, OnChanges {

    productListing: ProductListingDataModel[] = [];
    productFormat: string;
    config: any;
    @Input() selectedTopic: string;
    @Input() configKey: string;
    @ViewChild('allProduct') allProduct: ElementRef;
    @ViewChild('book') book: ElementRef;
    @ViewChild('online') online: ElementRef;
    constructor(private productListingService: ProductListingService, private dataService: DataService, private productListingConfig: PreparationLandingConfig) {
        super();
    }

    ngOnInit(): void {
        this.config = this.productListingConfig.getConfiguration(this.configKey);

        this.dataService.itemAdded$.subscribe(item => {           
            this.config.itemId = item.excludeItems ? OperatorsEnum.NotIn + " " + item.excludeItems : "";
            if (this.selectedTopic && this.isLoading) {
                this.getProductList();
            }

        });


    }
   
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.selectedTopic && !changes.selectedTopic.firstChange) {
            this.all();
        }
    }

    public getProductList(): void {

        this.config = this.productListingConfig.getConfiguration(this.configKey);
        this.config.productFormat = "";
        if (this.selectedTopic && this.selectedTopic.toLowerCase() !== this.config.allProduct.toLowerCase()) {           
            this.config.testSectionName = this.selectedTopic;
        } else {           
            this.config.testSectionName = "";
        }

        if (this.productFormat) {
            this.config.productFormat = this.productFormat;
        }

        this.isLoading = true;
        this.productListingService.getData(this.config).subscribe(response => {
            this.productListing = response;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );

    }

    private all(): void {
        this.allProduct.nativeElement.className = "Links selected";  
        this.book.nativeElement.className = "Links";
        this.online.nativeElement.className = "Links";
        this.productListing = <ProductListingDataModel[]>[];
        this.getProductList();
    }

    private format(format): void {
        if (format === 'book'){
            this.allProduct.nativeElement.className = "Links";
            this.book.nativeElement.className = "Links selected";
            this.online.nativeElement.className = "Links";
        }
        if (format === 'online') {
            this.allProduct.nativeElement.className = "Links";
            this.book.nativeElement.className = "Links";
            this.online.nativeElement.className = "Links selected";
        }
        this.productListing = <ProductListingDataModel[]>[];
        this.productFormat = format;
        this.getProductList();
        this.productFormat = "";
    }

}