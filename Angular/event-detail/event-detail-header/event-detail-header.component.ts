import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { EventHeaderDataModel } from "./event-header.model";

@Component({
    selector: 'event-header-component',
    templateUrl: './event-detail-header.component.html'
})

export class EventHeaderComponent implements OnInit {
    @Input() eventHeader: EventHeaderDataModel;   

    constructor() { }

    ngOnInit(): void {
        
    }
}