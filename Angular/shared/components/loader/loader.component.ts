import { Component, Input } from '@angular/core';
import { Base } from '../../models/common.models';

@Component({
    selector: 'loader-component',
    templateUrl: './loader.component.html'
})

export class LoaderComponent extends Base {
    @Input() loading: boolean = false;
    @Input() errored: boolean = false;
 }