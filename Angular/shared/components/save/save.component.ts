import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { SaveService } from "./save.service";
import { SaveConfig } from "./save.config";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { SaveModel, Base } from "../../models/common.models";

declare var DoLogin: any;

@Component({
    selector: "save",
    templateUrl: "./save.component.html"
})

export class SaveComponent extends Base implements OnInit, OnChanges {
    @Input() configKey: string;
    @Input() list: SaveModel[];
    @Input() id: number;
    @Input() isDetail: boolean = false;
    @Input() isLast: boolean = false;
    @Input() isTopInfo: boolean = false;
    savedId: number;
    identityId: string;

    private config: any;

    constructor(private siteCoreConfig: SiteCoreConfig, private saveService: SaveService, private saveConfig: SaveConfig) { super(); }

    ngOnInit(): void {
        this.setConfig();
    }

    ngOnChanges(change: SimpleChanges): void {
        if (change["list"] && !change["list"].firstChange) {
            this.setConfig();
        }
    }

    clickOnSave(): void {
        if (this.identityId) {
            if (!this.savedId) {
                this.config.post[this.config.idKey] = this.id;
                this.saveItem();
            } else {
                this.config.delete["id"] = this.savedId;
                this.saveService.delete(this.config.delete).subscribe(response => {
                    if (response && response.status === 204) {
                        this.updateSavedList(this.savedId);
                        this.savedId = null;
                    }
                });
            }
        } else {
            sessionStorage.setItem("idKey", this.id.toString());
            DoLogin(location.href);
        }
    }

    private saveItem(updateList: boolean = true): void {
        this.config.id = '';
        this.config.post.identityID = this.identityId;
       
        this.saveService.post(this.config.post).subscribe(response => {
            if (response && response.status === 201 && updateList) {
                this.savedId = response.headers.get("location").split("/").splice(-1, 1)[0];
                this.updateSavedList(this.savedId);
            } else {
                this.savedId = null;
            }
        });
    }

    private updateSavedList(savedId: number): void {
        if (!this.isDetail) {
            let item = <SaveModel>{};
            item.id = this.id;
            item.savedId = savedId;
            if (this.list) {
                let savedItem = this.list.find(i => i.savedId.toString() === savedId.toString());
                if (savedItem) {
                    this.list.splice(this.list.indexOf(savedItem, 0), 1);
                } else {
                    this.list.push(item);
                }
            } else {
                this.list = <SaveModel[]>[];
                this.list.push(item);
            }
        }
    }

    private setConfig(): void {
        this.config = this.saveConfig.getConfiguration(this.configKey);
        this.identityId = this.siteCoreConfig.currentAccount.identityID;
        this.config.identityId = this.identityId;
        this.checkSavedStatus();
        let storedIdKey = sessionStorage.getItem("idKey");
        if (storedIdKey && this.identityId && (storedIdKey === this.id.toString() || this.isLast)) {
            this.config.post[this.config.idKey] = storedIdKey;
            let updateList = true;
            if (this.isLast && storedIdKey !== this.id.toString()) {
                updateList = false;
            }
            this.saveItem(updateList);
            sessionStorage.removeItem("idKey");
        } else {
            this.config[this.config.idKey] = this.id;
        }
    }

    private checkSavedStatus(): void {
        if (this.identityId) {
            if (this.isDetail)
                this.getSavedItem();
            else if (this.list) {
                this.isItemSaved();
            } else
                this.savedId = null;
        } else
            this.savedId = null;
    }

    private isItemSaved(): void {
        let item = this.list.find(x => x.id.toString() === this.id.toString());
        if (item) {
            this.savedId = item.savedId;
        } else
            this.savedId = null;
    }

    private getSavedItem(): void {
        this.config[this.config.idKey] = this.id;
        this.saveService.getSavedItem(this.config).subscribe(response => {
            if (response && response[this.config.responseKey].length && response[this.config.responseKey][0].id) {
                this.savedId = response[this.config.responseKey][0].id.value;
            } else {
                this.savedId = null;
            }
        });
    }

}