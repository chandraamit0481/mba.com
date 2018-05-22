import { Component, Input } from '@angular/core';
import { Base } from '../../models/common.models';
import { SiteCoreConfig } from '../../config/sitecore.config';

@Component({
    selector: 'about-text-component',
    templateUrl: './about-text.component.html'
})

export class AboutTextComponent extends Base {

    constructor(private siteCoreConfig: SiteCoreConfig) {
        super();
    }
}