import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SchoolHeaderDataModel } from "./school-header.model";
import { Base } from '../../shared/models/common.models';

@Component({
    selector: 'school-header-component',
    templateUrl: './school-profile-header.component.html'
})

export class SchoolHeaderComponent extends Base implements OnInit {
    @Input() schoolHeader: SchoolHeaderDataModel;
    address: string = "";

    constructor() { super(); }

    ngOnInit(): void {
        this.address = this.modelAddress(this.schoolHeader);
    }

    private modelAddress(school: SchoolHeaderDataModel): string {

        let address = (school.schoolAddressLine1 ? school.schoolAddressLine1 + ", " : "") +
            (school.schoolAddressLine2 ? school.schoolAddressLine2 + ", " : "") +
            (school.schoolCity ? school.schoolCity + ", " : "") +
            (school.schoolStateProvinceIdLookupName ? school.schoolStateProvinceIdLookupName + " " : "") +
            (school.schoolPostalCode ? school.schoolPostalCode + ", " : "") +
            (school.schoolCountryIdLookupName ? school.schoolCountryIdLookupName + " " : "");

        return address.slice(0, -1);
    }

}