import { Component, OnInit, OnChanges, SimpleChanges, Input } from "@angular/core";
import { SaveModel } from "../../models/common.models";
import { EventListModel } from "./event-list.model";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { EventListService } from "./event-list.service";
import { EventListConfig } from "./event-list.config";
import { Base } from "../../models/common.models";
import { BaseService } from "../../services/base.service";
import { ProfileService } from "../../services/profile.service";
@Component({
    selector: 'event-list',
    templateUrl: './event-list.component.html'
})

export class EventListComponent extends Base implements OnInit, OnChanges {
    @Input() eventResult: EventListModel[];
    eventData: EventListModel[]; 
    @Input() isShowTitle: boolean = false;
    savedEventList: SaveModel[];
    saveKey: string = "eventList";

    constructor(private eventListService: EventListService, private siteCoreConfig: SiteCoreConfig, private eventListConfig: EventListConfig, private baseService: BaseService, private profileService: ProfileService) {
        super();
    }

    ngOnInit(): void {       
        if (this.baseService.hasLength(this.eventResult)) {
            this.eventData = this.eventResult[0]['searchResults'];
        }
        this.getSavedEventList();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['eventResult'].firstChange && this.baseService.hasLength(this.eventResult)) {
            this.eventData = this.eventResult[0]['searchResults'];
            this.getSavedEventList();
        }

    }

    private getSavedEventList(): void {
        let identityId = this.siteCoreConfig.currentAccount.identityID;
        if (identityId) {
            let config = this.eventListConfig.getConfiguration("savedEvents");
            config["identityId"] = identityId;
            this.profileService.getSavedItems(config).subscribe(response => {
                this.savedEventList = response;
            });
        }
    }
}