import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SchoolPreferencesConfig } from "./school-preferences.config";
import { ILookupModel } from "../school-finder.model";
import { SchoolFinderService } from "../school-finder.service";
import { DataService } from "../../shared/services/share-data.service";
import { SchoolPreferencesModel } from "./school-preferences.model";
import { MultiselectDropdownComponent } from "../../shared/components/multiselect-dropdown/multiselect-dropdown.component";
import 'rxjs/add/observable/forkJoin';
import { Base } from '../../shared/models/common.models';
@Component({
    selector: 'school-preferences',
    templateUrl: './school-preferences.component.html'
})

export class SchoolPreferencesComponent extends Base implements OnInit {
    selectedClassStyleList: ILookupModel[];
    selectedYearsAvailable: ILookupModel[];
    selectedProgramType: ILookupModel[];
    selectedDesiredDegree: ILookupModel[];
    classStyleList: ILookupModel[] = [];
    programTypeList: ILookupModel[] = [];
    desiredDegreesList: ILookupModel[] = [];
    yearsAvailableList: ILookupModel[] = [];
    militaryFriendlySelected: boolean = false;
    filterObjects: SchoolPreferencesModel;
    private preferences: SchoolPreferencesModel;
    private programInitiativeValue: string = "Military Friendly";
    private key: string = "SchoolFinder";

    constructor(private schoolPreferencesConfig: SchoolPreferencesConfig, private schoolFinderService: SchoolFinderService, private dataService: DataService) {
        super();
    }

    ngOnInit(): void {
        if (!this.filterObjects)
            this.filterObjects = new SchoolPreferencesModel();
        let preferencesString = sessionStorage.getItem(this.key);
        if (preferencesString) {
            this.preferences = <SchoolPreferencesModel>JSON.parse(preferencesString);
            this.militaryFriendlySelected = this.preferences.programInitiative ? true : false;
            if (this.militaryFriendlySelected)
                this.filterObjects.programInitiative = this.programInitiativeValue;
        }
        this.bindMultiSelectList();
    }

    clearPreferences(list): void {
        for (let result of list) {
            result.checked = false;
        }
        this.refreshData();
    }

    refreshMultiSelectList(selectList: ILookupModel[], key: string): void {
        this.filterObjects[key] = selectList;
        this.savePreferences();
        this.dataService.setOption(this.key, this.filterObjects);
    }

    refreshData(): void {
        this.setFilterObject();
        this.savePreferences();
        this.dataService.setOption(this.key, this.filterObjects);
    }

    private bindMultiSelectList(): void {

        let requestApiContainer = [];

        requestApiContainer.push(this.schoolFinderService.getData(this.schoolPreferencesConfig.getConfiguration("preferredClassStyle")));
        requestApiContainer.push(this.schoolFinderService.getData(this.schoolPreferencesConfig.getConfiguration("desiredProgramType")));
        requestApiContainer.push(this.schoolFinderService.getData(this.schoolPreferencesConfig.getConfiguration("desireDegree")));
        requestApiContainer.push(this.schoolFinderService.getData(this.schoolPreferencesConfig.getConfiguration("desiredProgramLength")));
        this.isLoading = true;
        Observable.forkJoin(requestApiContainer).subscribe(data => {
            this.classStyleList = <Array<ILookupModel>>data[0];
            this.programTypeList = <Array<ILookupModel>>data[1];
            this.desiredDegreesList = <Array<ILookupModel>>data[2];
            this.yearsAvailableList = <Array<ILookupModel>>data[3];
            if (this.preferences) {
                this.filterObjects.programAreaOfStudy = this.preferences.programAreaOfStudy;
                this.filterObjects.desiredLocation = this.preferences.desiredLocation;
                if (this.preferences.programDeliveryFormat) {
                    this.setSelectedValue(this.preferences.programDeliveryFormat, this.classStyleList);
                    this.selectedClassStyleList = this.preferences.programDeliveryFormat;
                    this.filterObjects.programDeliveryFormat = this.selectedClassStyleList;
                }
                if (this.preferences.programType) {
                    this.setSelectedValue(this.preferences.programType, this.programTypeList);
                    this.selectedProgramType = this.preferences.programType;
                    this.filterObjects.programType = this.selectedProgramType;
                }
                if (this.preferences.programDegree) {
                    this.setSelectedValue(this.preferences.programDegree, this.desiredDegreesList);
                    this.selectedDesiredDegree = this.preferences.programDegree;
                    this.filterObjects.programDegree = this.selectedDesiredDegree;
                }
                if (this.preferences.programLength) {
                    this.setSelectedValue(this.preferences.programLength, this.yearsAvailableList);
                    this.selectedYearsAvailable = this.preferences.programLength;
                    this.filterObjects.programLength = this.selectedYearsAvailable;
                }
            }
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }

    private setFilterObject(): void {
        this.selectedClassStyleList = this.getSelectedValue(this.classStyleList);
        this.filterObjects.programDeliveryFormat = this.selectedClassStyleList;
        this.selectedProgramType = this.getSelectedValue(this.programTypeList);
        this.filterObjects.programType = this.selectedProgramType;
        this.selectedDesiredDegree = this.getSelectedValue(this.desiredDegreesList);
        this.filterObjects.programDegree = this.selectedDesiredDegree;
        this.selectedYearsAvailable = this.getSelectedValue(this.yearsAvailableList);
        this.filterObjects.programLength = this.selectedYearsAvailable;
        if (this.militaryFriendlySelected)
            this.filterObjects.programInitiative = '"' + this.programInitiativeValue + '"';
        else
            this.filterObjects.programInitiative = "";
    }

    private getSelectedValue(model: ILookupModel[]): ILookupModel[] {
        return model ? model.filter(o => o.checked) : [];
    }

    private setSelectedValue(selectedValue: ILookupModel[], list: ILookupModel[]): void {
        if (selectedValue && list) {
            selectedValue.forEach(item => {
                let element = list.filter(o => o.value.replace('"', "") === item.value);
                if (element && element[0])
                    element[0].checked = true;

            });
        }
    }

    private savePreferences(): void {
        sessionStorage.setItem(this.key, JSON.stringify(this.filterObjects));
    }

}
