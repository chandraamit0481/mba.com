import { Component, OnInit, Input } from "@angular/core";
import { BottomColumnConfig } from "./bottom-column.config";
import { BottomColumnService } from "./bottom-column.service";
import { DataService } from "../../shared/services/share-data.service";
import { OperatorsEnum } from "../../shared/enums/operators.enum";

@Component({
    selector: "bottom-column",
    templateUrl: './bottom-column.html'
})

export class BottomColumnComponent implements OnInit {
    @Input() item: any;
    config: any;
    itemList: any;

    constructor(private bottomColumnService: BottomColumnService, private bottomColumnConfig: BottomColumnConfig, private dataService: DataService) { }

    ngOnInit(): void {

        this.config = this.bottomColumnConfig.getConfiguration(this.item.displayType);
        if (this.item.displayType === "Events") {
            this.config.eventStartDate = OperatorsEnum.GreaterThanOrEqualTo + " " + new Date().toLocaleDateString("en-US");
        }
        this.dataService.itemAdded$.subscribe(item => {
            this.config.itemId = item.excludeItems ? OperatorsEnum.NotIn + " " + item.excludeItems : "";
            if (this.config.contentTypeName !== 'Events')
                this.config.topicName = this.item.topicName;

            if (this.item.articleOverrideIds !== undefined && this.item.articleOverrideIds !== "")
                this.config.topResults = this.item.articleOverrideIds;

            this.getdata();

        });
    }

    getdata(): void {
        this.bottomColumnService.getData(this.config).subscribe(response => {
            this.itemList = response;
        });
    }
}