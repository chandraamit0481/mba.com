import { Directive, Input, Renderer, ElementRef, OnInit } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";

@Directive({ selector: '[address]' })
export class AddressDirective implements OnInit {
    @Input() item: any;

    constructor(private baseService: BaseService, private renderer: Renderer, private element: ElementRef) { }

    ngOnInit() {
        let address = this.getAddress(this.item);
        if (address !== "")
            this.renderer.setElementProperty(this.element.nativeElement, 'innerHTML', address);
        else
            this.renderer.setElementClass(this.element.nativeElement, 'hidden', true);
    }

    private getAddress(item: any): string {
        let address: string;
        if (item) {            
            address = this.baseService.getValue(item.address1, "", ", ") + this.baseService.getValue(item.address2, "", ", ") + this.baseService.getValue(item.address3, "", ", ") + this.baseService.getValue(item.eventCityName, "", ", ") + this.baseService.getValue(item.eventStateName, " ", " ") + this.baseService.getValue(item.eventPostalCode, " ", " ") + this.baseService.getValue(item.eventCountryName);
        } else {
            address = "";
        }
        return address.trim().replace(/(^,)|(,$)/g, "");
    }
}