import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/observable/of';
import { DomSanitizer } from "@angular/platform-browser";
import { ILookupModel } from "../../../school-finder/school-finder.model";
import { DataService } from "../../services/share-data.service";
import { MultiSelectDropdownService } from './multiselect-dropdown.service';
import { MultiSelectDropdownConfig } from './multiselect-dropdown.config';
import { OperatorsEnum } from '../../enums/operators.enum';
import { ClickOutsideModule } from 'ng-click-outside';
import { Base } from '../../models/common.models';
import { Ng2ScrollableDirective } from 'ng2-scrollable';

@Component({
    selector: 'multiselect-dropdown',
    templateUrl: './multiselect-dropdown.component.html'
})

export class MultiselectDropdownComponent extends Base implements OnInit {

    @Input() placeholder: string;
    @Input() configKey: string;
    @Input() selectedItems: ILookupModel[];
    @Input() disableLocation: boolean;
    @Output() emitMethod: EventEmitter<ILookupModel[]> = new EventEmitter();
    selectedItem: ILookupModel;
    selectedItemList: ILookupModel[];
    config: any;
    keyword: string;
    showResult: boolean;
    noRecord: boolean = false;
    totalRows: number;
    modelBody: ILookupModel[];
    mouseover: boolean;
    @ViewChild('firstLi') firstLi: ElementRef;

    constructor(private sanitizer: DomSanitizer, private dataService: DataService, private multiSelectDropdownService: MultiSelectDropdownService, private multiSelectDropdownConfig: MultiSelectDropdownConfig) {
        super();
    }

    ngOnInit(): void {
        this.mouseover = false;
        this.config = this.multiSelectDropdownConfig.getConfiguration(this.configKey);
        if (!this.selectedItems) {
            this.selectedItems = <ILookupModel[]>[];
        }
    }

    add(selectedValue: ILookupModel): void {
        if (selectedValue) {
            if (this.config.isSingleSelect) {
                this.selectedItems = [];
                this.selectedItems.push(selectedValue);
                this.dataRefreshed();
            } else {
                let item = this.selectedItems.find(i => i.value === selectedValue.value);
                if (!item) {
                    this.selectedItems.push(selectedValue);
                    this.dataRefreshed();
                }
            }
        }
        this.selectedItem = null;
        this.showResult = false;
    }

    showDivSection(): void {
        this.showResult = true;
        this.selectedItem = null;
    }

    hideDivSection(): void {
        this.showResult = false;
    }


    remove(selectedValue: ILookupModel): void {
        let item = this.selectedItems.find(i => i.value === selectedValue.value);
        let index: number = this.selectedItems.indexOf(item);
        if (index !== -1) {
            this.selectedItems.splice(index, 1);
            this.dataRefreshed();
        }
        this.showResult = false;
    }

    dataRefreshed(): void {

        if (this.configKey === "JumpToSchool") {
            this.dataService.setOption(this.configKey, [this.selectedItems, this.keyword]);
        } else {
            this.emitMethod.emit(this.selectedItems);
        }
    }

    onModelScrollDown(): void {
        let totalPage = (this.totalRows) / this.config.pageSize;
        totalPage = Number(totalPage.toFixed());
        this.config.page++;
        if (this.config.page <= totalPage) {            
            this.config[this.config.filterField] = this.config.filterField === "q" ? this.keyword : OperatorsEnum.Contains + " " + this.keyword;
            this.multiSelectDropdownService.getData(this.config)
                .subscribe(response => {                    
                    let data = this.modelBody.concat(response.sourceList);
                    this.modelBody = data;
                });
        }

    }

    private getData(keyword: string, event) { 
        this.noRecord = false;
        if (event.keyCode !== 40) {
            this.config.page = 1;
            this.modelBody = <ILookupModel[]>[];           
            if (keyword && keyword.trim().length > 2) {                
                this.isLoading = true;  
                this.keyword = keyword;
                this.config[this.config.filterField] = this.config.filterField === "q" ? keyword.replace(/[&\/\\#;=<>|^$~%'?{}]/g, '') : OperatorsEnum.Contains + " " + keyword.replace(/[&\/\\#;=<>|^$~%'?{}]/g, '');
                this.multiSelectDropdownService.getData(this.config)
                    .subscribe(response => {
                        this.totalRows = response.totalRows;
                        this.modelBody = response.sourceList;
                        this.noRecord = (this.modelBody && this.modelBody.length === 0) ? true : false;
                        this.isLoading = false;                  
                  
                    },
                    () => this.isLoading = false);
            } 
        } else {
            if (this.firstLi && this.firstLi.nativeElement && this.firstLi.nativeElement.children[0]) {
                this.firstLi.nativeElement.children[0].focus();

            }
        }
    }

    private setCurrentFocous(event): void {
        event.currentTarget.focus();

    }

    private removeCurrentClass(event): void {
        event.currentTarget.className = '';
    }

    private downArrow(event): void {
        event.currentTarget.nextSibling.focus();
        event.currentTarget.previousSibling.className = '';
        this.firstLi.nativeElement.children[0].className = '';

    }

    private upArrow(event): void {

        if (event.currentTarget.previousSibling.firstChild) {
            event.currentTarget.previousSibling.focus();
        }
        event.currentTarget.nextSibling.className = '';
    }

    private clearKeyword(event: any): void {
        this.selectedItem = null;
        event.cancelBubble = true;
        this.showResult = true;
    }

    private selected(): void {
        if (this.modelBody)
            this.add(this.modelBody[0]);
    }

    private onClickedOutside(): void {
        this.showResult = false;
    }


}