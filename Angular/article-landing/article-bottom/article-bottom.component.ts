import { Component, OnInit } from '@angular/core';
import { ArticleBottomService } from "./article-bottom.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { ArticleLandingConfig } from "../article-landing.config";
import { Articles, ArticleBottom } from "../article.model";
import { Base } from "../../shared/models/common.models";

@Component({
    selector: 'article-bottom',
    templateUrl: './article-bottom.component.html'
})

export class ArticleBottomComponent extends Base implements OnInit {
    topicItemList: ArticleBottom[];
    selectedTopic: string;
    isViewAll: boolean = false;
    configKey: string = "articleBottom";
    private objKey: string = "selectedTopic";
    itemUrl: string;

    constructor(private articleBottomService: ArticleBottomService, private siteCoreConfig: SiteCoreConfig, private articleBottomConfig: ArticleLandingConfig) {
        super();
    }

    ngOnInit(): void {
        let locArray = location.href.split('/');
        if (locArray.indexOf('topics') !== -1) {            
            this.selectedTopic = this.siteCoreConfig.title;
            this.isViewAll = true;
            this.configKey = "topicBottom";
        } else {            
            let config = this.articleBottomConfig.getConfiguration("bottomConfig");
            this.isLoading = true;
            this.articleBottomService.getData(config).subscribe(response => {
                this.topicItemList = response;
                if (this.topicItemList && this.topicItemList.length > 0)
                    this.selectedTopic = sessionStorage.getItem(this.objKey) ? sessionStorage.getItem(this.objKey) : this.topicItemList[0].title;
                else
                    this.isLoading = false;
            },
                err => {
                    this.isLoading = false;
                    this.errored = true ;
                }
            );
        }
    }

    updateArticleList(topic: any): void {
        this.selectedTopic = topic.title;
        this.itemUrl = topic.itemUrl;
        sessionStorage.setItem(this.objKey, this.selectedTopic);
    }

    navigateTopicPage(itemUrl): void {
        location.href = itemUrl;  
    }

}