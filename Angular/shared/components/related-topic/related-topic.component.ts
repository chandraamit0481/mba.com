import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { RelatedTopicService } from "./related-topic.service";
import { ITopicPage } from "./related-topic.model";
import { RelatedTopicConfig } from "./related-topic.config";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { Base } from '../../models/common.models';


@Component({
    selector: 'related-topic',
    templateUrl: './related-topic.html'
})

export class RelatedTopicComponent extends Base implements OnInit {
    tags: ITopicPage[];
    @Input() configKey: string = "articleTopic";
    private config: any;

    constructor(private relatedTopicService: RelatedTopicService, private siteCoreConfig: SiteCoreConfig, private relatedTopicConfig: RelatedTopicConfig) {
        super();
    }

    ngOnInit(): void {        
        this.config = this.relatedTopicConfig.getConfiguration(this.configKey);
        this.config.itemId = this.siteCoreConfig.itemId;
        this.getRelatedTopic();
    }

    private getRelatedTopic(): void {
        
        this.isLoading = true;
        this.relatedTopicService.config = this.config;
        this.relatedTopicService.getAll().subscribe(response => {
            this.tags = response;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );
    }    
}