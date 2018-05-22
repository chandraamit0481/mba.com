import { Component, OnInit } from '@angular/core';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { DataService } from "../../shared/services/share-data.service";
import { ILookupModel } from "../../school-finder/school-finder.model";
import { EventSearchLeftModel } from "./event-search-left.model";
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { FormatType } from './format-type.enum';
import { Base } from '../../shared/models/common.models';
import { IMyDpOptions, IMyOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';

@Component({
    selector: 'event-search-left',
    templateUrl: './event-search-left.component.html'
})

export class EventSearchLeftComponent extends Base implements OnInit {

    classStyleList: ILookupModel[] = [];
    keyword: string = "";
    startDate: any;
    endDate: any;
    invalidStartDate: string = "";
    invalidEndDate: string = "";
    location: ILookupModel[];
    disableLocation: boolean = false;
    public placeHolder: string = 'DD MMM YYYY';
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'd mmm yyyy',
        showClearDateBtn: true,
        disableUntil: { year: 0, month: 0, day: 0 },
        openSelectorTopOfInput: true,
        allowSelectionOnlyInCurrentMonth: false
    };
    public myDatePickerOptionsEndDate;
    private filterObjects: EventSearchLeftModel;
    private searchedObjects: EventSearchLeftModel;
    private minDate: string;
    private selectedClassStyleList: boolean;
    private preferences: EventSearchLeftModel;
    private objKey: string = "EventSearch";

    constructor(private siteCoreConfig: SiteCoreConfig, private dataService: DataService) { super(); }

    ngOnInit(): void {
        this.minDate = this.dateToLocaleDateString(new Date());
        this.bindMultiSelectList();
        this.setDefaultPreferences();
        if (this.startDate) {
            this.disableUntil(new Date(), "startDate");
            this.disableUntil(this.startDate.jsdate, "endDate");
        } else {
            this.disableUntil(new Date(), "");
        }
        this.setFilterObject();
    }

    onStartDateChanged(event: IMyDateModel): void {
        this.startDate = event;
        this.disableUntil(event.jsdate, "endDate");
        if (this.endDate && this.endDate.jsdate && this.startDate && this.startDate.jsdate) {
            if (Date.parse(this.endDate.jsdate) < Date.parse(this.startDate.jsdate)) {
                this.endDate = '';
            }
        }
        this.setFilterObject();
    }

    onEndDateChanged(event: IMyDateModel): void {
        this.endDate = event;
        this.setFilterObject();
    }

    onStartInputChanged(event: IMyInputFieldChanged) {
        if (event.value && !event.valid) {
            this.invalidStartDate = "Please enter valid start date";
        } else {
            this.invalidStartDate = "";
        }
    }

    onEndInputChanged(event: IMyInputFieldChanged) {
        if (event.value && !event.valid) {
            this.invalidEndDate = "Please enter valid end date";
        } else {
            this.invalidEndDate = "";
        }

    }

    refreshMultiSelectList(selectList: ILookupModel[], key: string): void {
        this.filterObjects[key] = selectList;
        this.location = this.filterObjects.location;
        if ((this.location && this.location.length <= 0) && !this.keyword && !(this.startDate && this.startDate.jsdate) && !(this.endDate && this.endDate.jsdate) && !this.selectedClassStyleList) {
            this.getPreferredCountryLocation();
        }
        this.refreshData();
    }

    private disableUntil(startDate, dateType = ""): void {
        let dateInput: Date = new Date(startDate);
        dateInput.setDate(dateInput.getDate() - 1);
        let copy = this.getCopyOfOptions();
        copy.disableUntil = {
            year: dateInput.getFullYear(),
            month: dateInput.getMonth() + 1,
            day: dateInput.getDate()
        };

        if (dateType === "startDate") {
            this.myDatePickerOptions = copy;
        } else if (dateType === "endDate") {
            this.myDatePickerOptionsEndDate = copy;
        } else {
            this.myDatePickerOptions = copy;
            this.myDatePickerOptionsEndDate = copy;
        }
    }

    private getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }

    private bindMultiSelectList(): void {

        let inPerson: ILookupModel = { id: FormatType.InPerson.toString(), value: "In Person", checked: false };
        let online: ILookupModel = { id: FormatType.Online.toString(), value: "Online", checked: false };
        this.classStyleList = [inPerson, online];

    }

    private refreshData(): void {
        this.savePreferences(this.filterObjects);
        this.setSearched();
        this.dataService.setOption(this.objKey, this.searchedObjects);
    }

    private setSearched(): void {
        this.searchedObjects = new EventSearchLeftModel();
        this.searchedObjects.eventIsOnline = this.filterObjects.isOnline;
        this.searchedObjects.eventEndDate = this.filterObjects.eventEndDate;
        if (!this.searchedObjects.eventIsOnline || this.searchedObjects.eventIsOnline === "false") {
            this.searchedObjects.geoLocation = this.filterObjects.location && this.filterObjects.location.length > 0 ? this.filterObjects.location[0].id : "";
            if (!this.searchedObjects.geoLocation && this.searchedObjects.geoLocation.length <= 0) {
                if (this.filterObjects.geoLocation) {
                    this.searchedObjects.geoLocation = this.filterObjects.geoLocation;
                } else {
                    this.searchedObjects.eventCountryName = this.filterObjects.eventCountryName ? '"' + this.filterObjects.eventCountryName + '"' : "";
                    this.searchedObjects.eventCityName = this.filterObjects.eventCityName ? '"' + this.filterObjects.eventCityName + '"' : "";
                    this.searchedObjects.eventStateName = this.filterObjects.eventStateName ? '"' + this.filterObjects.eventStateName + '"' : "";
                }

            }
        } else {
            this.searchedObjects.eventCountryName = "";
            this.searchedObjects.eventCityName = "";
            this.searchedObjects.eventStateName = "";
            this.searchedObjects.geoLocation = "";
        }
        this.searchedObjects.eventSearchText = this.filterObjects.eventSearchText === "" ? "" : OperatorsEnum.Contains + " " + '"' + this.filterObjects.eventSearchText + '"';
    }

    private setFilterObject(): void {
        this.filterObjects = new EventSearchLeftModel();

        let formatType = this.getSelectedValue(this.classStyleList);

        if ((formatType === FormatType.Both) || (formatType === FormatType.None)) {
            this.filterObjects.isOnline = "";
        } else if (((formatType & FormatType.Online) === FormatType.Online)) {
            this.filterObjects.isOnline = "true";
        } else {
            this.filterObjects.isOnline = "false";
        }

        this.selectedClassStyleList = !(formatType === FormatType.None);
        this.filterObjects.formatType = formatType;

        this.filterObjects.eventSearchText = this.keyword === undefined ? "" : this.keyword;

        let startDt: any;
        if (this.startDate && this.startDate.jsdate) {
            startDt = this.convertDateToString(this.startDate);
            this.filterObjects.startDate = this.startDate.jsdate ? this.startDate : "";
        } else {
            startDt = this.minDate;
            this.filterObjects.startDate = "";
        }
        let endDt: any;
        if (this.endDate && this.endDate.jsdate) {
            this.filterObjects.endDate = this.endDate;
            endDt = this.convertDateToString(this.endDate);
            this.filterObjects.eventEndDate = OperatorsEnum.Between + " " + startDt + " " + OperatorsEnum.To + " " + endDt;
        } else {
            this.filterObjects.endDate = "";
            this.filterObjects.eventEndDate = OperatorsEnum.GreaterThanOrEqualTo + " " + startDt;
        }
        if ((this.location && this.location.length > 0) || this.keyword || (this.startDate && this.startDate.jsdate) || (this.endDate && this.endDate.jsdate) || this.selectedClassStyleList) {
            this.filterObjects.location = this.location;
        } else {
            this.getPreferredCountryLocation();
        }
        this.disableLocation = this.filterObjects.isOnline && this.filterObjects.isOnline === "true" ? true : false;
        this.refreshData();
    }

    private dateToLocaleDateString(date: Date): string {
        return date.toLocaleDateString("en-US");
    }

    private getPreferredCountryLocation() {
        if (this.siteCoreConfig.preferredCountry) {
            if (this.siteCoreConfig.preferredCountry.latitude && this.siteCoreConfig.preferredCountry.longitude) {
                let lat = this.siteCoreConfig.preferredCountry.latitude;
                let lng = this.siteCoreConfig.preferredCountry.longitude;
                this.filterObjects.geoLocation = lat && lng ? lat + "," + lng : "";
            } else {
                this.filterObjects.geoLocation = "";
                this.filterObjects.eventCityName = this.siteCoreConfig.preferredCountry.cityName;
                this.filterObjects.eventStateName = this.siteCoreConfig.preferredCountry.stateProvinceName;
                this.filterObjects.eventCountryName = this.siteCoreConfig.preferredCountry.countryName;
            }
        }
    }

    private convertDateToString(datePicker: any): string {
        let dateToString: string;
        if (datePicker && datePicker.jsdate) {
            dateToString = this.dateToLocaleDateString(new Date(datePicker.jsdate));
        } else {
            dateToString = this.minDate;
        }
        return dateToString;
    }

    private getSelectedValue(model: ILookupModel[]): FormatType {

        let retObj: number = 0;
        model.filter(o => o.checked).map(i => {
            retObj = retObj | parseInt(i.id);
            return retObj;
        });
        return retObj;
    }

    private savePreferences(filterObjects: EventSearchLeftModel): void {
        sessionStorage.setItem(this.objKey, JSON.stringify(filterObjects));
    }

    private setDefaultPreferences(): void {
        let preferencesString = sessionStorage.getItem(this.objKey);
        if (preferencesString) {
            this.preferences = <EventSearchLeftModel>JSON.parse(preferencesString);
            this.keyword = this.preferences.eventSearchText;
            this.location = this.preferences.location ? this.preferences.location : [];
            this.startDate = this.preferences.startDate;
            this.endDate = this.preferences.endDate;
            this.setSelectedValue(this.preferences.formatType, FormatType.Online);
            this.setSelectedValue(this.preferences.formatType, FormatType.InPerson);
        }

    }

    private setSelectedValue(preferences: FormatType, selectedValue: FormatType): void {
        if (selectedValue && ((preferences & selectedValue) === selectedValue) && this.classStyleList) {
            let element = this.classStyleList.filter(o => o.id === selectedValue.toString());
            if (element)
                element[0].checked = true;
            this.selectedClassStyleList = true;
        }
    }

    private clearPreferences(list): void {

        for (let result of list) {
            result.checked = false;
        }
        this.setFilterObject();
    }



}