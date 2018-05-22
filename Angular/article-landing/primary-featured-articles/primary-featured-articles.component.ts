import { Component, OnInit } from '@angular/core';
import { Article } from "../../shared/models/response.model";
import { Observable } from "rxjs/Observable";
import { FeaturedArticleService } from "./primary-featured-articles.service";
import { DataService } from "../../shared/services/share-data.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { TruncatePipe } from "../../shared/pipes/truncate";
import { CapitalizePipe } from "../../shared/pipes/capitalize";
import { SafeHtmlPipe } from "../../shared/pipes/safe-html";
import { ArticleLandingConfig } from "../article-landing.config";
import { Articles, ArticlesList, ArticleDataSet } from "../article.model";
import { Base } from "../../shared/models/common.models";

@Component({
    selector: 'article-primary-featured-articles',
    templateUrl: './primary-featured-articles.component.html'
})

export class PrimaryFeaturedArticlesComponent extends Base implements OnInit {
    articles: ArticlesList;
    selectedTopic: string = "";
    primaryArticleOne: Articles;
    primaryArticleTwo: Articles;
    secondaryArticle: Articles[] = [];
    selectedDataval: string;
    boostedIds: string;
    configObject: any;

    constructor(private featuredArticleService: FeaturedArticleService, private siteCoreConfig: SiteCoreConfig, private dataService: DataService, private articleConfig: ArticleLandingConfig) { super(); }

    ngOnInit(): void {

        this.isLoading = true;
        this.configObject = this.articleConfig.getConfiguration("primaryConfig");
        let locArray = location.href.split('/');
        if (locArray.indexOf('topics') !== -1) {
            this.selectedTopic = this.siteCoreConfig.title;
            this.configObject.topicName = '"'+this.selectedTopic.toLowerCase() + '"';
        }

        this.boostedIds = this.siteCoreConfig.boostedId;
        this.configObject.topResults = this.boostedIds;

        this.featuredArticleService.getAll(this.configObject).subscribe(response => {
            if (response && response.length > 0) {
                this.getItems(response);
                this.selectedData(response);
            }
            this.isLoading = false;
        },
            err => {
                    this.isLoading = false;
                    this.errored = true;
            }
            );
    }

    private selectedData(featuredArticles: any): void {
        
        for (let index = 0; featuredArticles.length > index; index += 1) {
            if (index === 0)
                this.primaryArticleOne = featuredArticles[index];
            if (index === 1)
                this.primaryArticleTwo = featuredArticles[index];
            else if (index > 1 && this.secondaryArticle && this.secondaryArticle.length <= 2)
                this.secondaryArticle.push(featuredArticles[index]);
        }
       
        this.articles = new ArticlesList();
        this.articles.primaryArticleOne = this.primaryArticleOne;
        this.articles.primaryArticleTwo = this.primaryArticleTwo;
        this.articles.secondaryArticle = this.secondaryArticle;
    }

    private getItems(items: Articles[]): void {
        let item = "";
        let topicName = "";
        let data = new ArticleDataSet();
        let uniqueTopicList = [];
        item = items.map(i => {
            i.topicList.map(t => {
                if (uniqueTopicList.indexOf(t) < 0) {
                    uniqueTopicList.push(t);
                }
            });
            return i.itemId;
        }).join(",");
        topicName = uniqueTopicList.join(",");
        data.excludeItems = item.replace(/(^,)|(,$)/g, "");
        data.topicTag = topicName;        
        this.dataService.setOption("data", data);

    }
}