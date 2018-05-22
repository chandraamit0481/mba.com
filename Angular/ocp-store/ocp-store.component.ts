import { Component, OnInit } from "@angular/core";
import { OcpStoreListingDataModel} from "./ocp-store.models";
import { OcpStoreService } from "./ocp-store.service";
import { DataService } from "../shared/services/share-data.service";
import { OcpStoreConfig } from "./ocp-store.config";
import { Base } from "../shared/models/common.models";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { OperatorsEnum } from "../shared/enums/operators.enum";

@Component({
    selector: "ocp-store",
    templateUrl: './ocp-store.component.html'
})

export class OcpStoreComponent extends Base implements OnInit {

    ocpStoreListing: OcpStoreListingDataModel[] = [];
    config: any;
    configKey: string = "ocpStoreListing";
    ocpFaqUrl: string;
    ocpContactUsUrl: string;
    ocpAccountUrl: string;
    
    constructor(private ocpStoreService: OcpStoreService, private dataService: DataService, private ocpStoreConfig: OcpStoreConfig, private sitecoreConfig: SiteCoreConfig) {
        super();

    }

    ngOnInit(): void {        
        this.ocpFaqUrl = this.sitecoreConfig.ocpFaqUrl;
        this.ocpContactUsUrl = this.sitecoreConfig.ocpContactUsUrl;
        this.ocpAccountUrl = this.sitecoreConfig.ocpAccountUrl;
        this.config = this.ocpStoreConfig.getConfiguration(this.configKey);        
        this.config.productId = OperatorsEnum.In + " " + this.sitecoreConfig.ocpStoreId;
        this.getOCPProduct();


    }
    private getOCPProduct() : void {

        this.isLoading = true;
        this.ocpStoreService.getData(this.config).subscribe(response => {
            this.ocpStoreListing = response;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }


}
