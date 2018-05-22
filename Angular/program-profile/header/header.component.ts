import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HeaderDataModel } from "./header.model";


@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    @Input() programHeader: HeaderDataModel;
    address: string = "";

    constructor() { }

    ngOnInit(): void {
         this.address = this.modelAddress(this.programHeader);
    }

    private modelAddress(program: HeaderDataModel): string {
        if (program) {
            let address = (program.programAddressLine1 ? program.programAddressLine1 + ", " : "") +
                (program.programAddressLine2 ? program.programAddressLine2 + ", " : "") +
                (program.programCity ? program.programCity + ", " : "") +
                (program.programStateProvinceIdLookupName ? program.programStateProvinceIdLookupName + ", " : "") +
                (program.programCountryIdLookupName ? program.programCountryIdLookupName + ", " : "") +
                (program.programPostalCode ? program.programPostalCode + " " : "");
            return address.slice(0, -1);
        } else
            return "";       
       
    }

}