import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ArticleItemsService } from "./article-items.service";
import { DataService } from "../../../shared/services/share-data.service";
import { ArticleListConfig } from "./article-items.config";
import { Articles } from "../../../article-landing/article.model";
import { Base } from "../../../shared/models/common.models";
import { OperatorsEnum } from '../../enums/operators.enum';
import { SiteCoreConfig } from '../../config/sitecore.config';

@Component({
    selector: 'article-items',
    templateUrl: './article-items.component.html',
    providers: [ArticleListConfig]
})

export class ArticleItemsComponent extends Base implements OnInit, OnChanges {

    articleItems: Articles[];
    searchText: string = "";
    errorText: string = "";
    totalItems: number;
    currentPage: number = 1;
    page: number;
    rows: number;
    sort: string = "score desc";
    isVisible: boolean;
    excludeItems: any;
    config: any;
    pagination: boolean;
    @Input() selectedTopic: string;
    @Input() itemId: string;
    @Input() configKey: string;
    @Input() schoolItemId: string;
    @Input() headerTitle: string;
    @Output() loaderDisabled = new EventEmitter();
    topicTag: string;
    constructor(private articleItemsService: ArticleItemsService, private siteCoreConfig: SiteCoreConfig, private dataService: DataService, private articleListConfig: ArticleListConfig) {
        super();
    }

    ngOnInit(): void {
        this.config = this.articleListConfig.getConfiguration(this.configKey);
        this.dataService.itemAdded$.subscribe(item => {
            this.config.itemId = item.data.excludeItems ? OperatorsEnum.NotIn + " " + item.data.excludeItems : "";
            this.topicTag = item.data.topicTag || "";
            if (this.selectedTopic) {

                this.getArticleList();
            }

        });

        if (this.configKey === "announcement" || this.configKey === "programProfile" || this.configKey === "schoolProfile") {
            this.getArticleList();
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['selectedTopic'] && !changes['selectedTopic'].firstChange && this.config.itemId !== "") || (changes['itemId'] && !changes['itemId'].firstChange)) {
            this.config.sort = "score desc";
            this.isVisible = false;
            this.searchText = "";
            this.errorText = "";
            this.getArticleList();
        }
    }

    getArticleList(): void {
        let backFillconfig = this.articleListConfig.getConfiguration("backfillArticle");
        this.config.topicName = '"' + this.selectedTopic + '"';
        this.config.itemId = this.config.itemId;
        this.config.schoolItemId = this.schoolItemId || '';
        this.config.text = this.searchText ? "(" + this.searchText.replace(/[&\/\\#;=<>|^$~%'?{}]/g, '') + ")" : "";
        this.isLoading = true;
        this.articleItemsService.getData(this.config, backFillconfig, this.topicTag).subscribe(response => {
            this.articleItems = response.data;
            this.rows = this.config.pageSize;
            if (response && response.envelope)
                this.totalItems = response.envelope.totalRows;
            this.isLoading = false;
        },
            err => {
                this.isLoading = false;
                this.errored = true;
            }
        );

    }


    refreshPaging(currentPage: number): void {
        this.config.page = currentPage;
        this.getArticleList();
    }

    relevance(): void {
        this.config.sort = "score desc";
        this.config.latestArticle = false;
        this.getArticleList();
    }

    latest(): void {
        this.config.sort = "publishDate desc";
        this.config.latestArticle = true;
        this.getArticleList();
    }

    toggleSearch(): void {
        if (this.isVisible) {
            this.config.page = 1;
            this.getArticleList();
        }

        if (!this.searchText) {
            this.isVisible = !this.isVisible;
        }
        else {
            this.errorText = this.searchText;
        }
    }

}