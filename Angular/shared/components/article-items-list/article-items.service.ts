import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../services/http.service";
import { UrlBuilderService } from "../../services/url-builder.service";
import { BaseService } from "../../services/base.service";
import { altTextConstants } from '../../consts/consts';
import { OperatorsEnum } from '../../enums/operators.enum';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/observable/of';
@Injectable()
export class ArticleItemsService extends BaseService {

    private url: string;

    constructor(private http: HttpService, private urlBuilder: UrlBuilderService) {
        super();
    }

    getData(config: any, backFillArticleconfig: any, topicTag: string): Observable<any> {
        return this.http.getData(config)
            .mergeMap(response => {
                let totalRecord = this.getArticleItem(response);
                if (config.text === '' && config.schoolItemId === '' && totalRecord.data && totalRecord.data.length == 0) {
                    config.topicName = topicTag ? OperatorsEnum.In + " " + '"' + topicTag + '"' : "";
                    config.pagination = false;
                    return this.http.getData(config).map(result => {
                        return this.getArticleItem(result);

                    });
                }
                else {
                    if (config.text === '' && config.schoolItemId === '' && config.page === 1 && this.hasResults(response) && response.data[0].searchResults.length < config.pageSize) {
                        let searchResults = response.data[0].searchResults;
                        let backFilltopiTag = this.getAllTags(searchResults);
                        let featuredItemIDs: string = config.itemId.replace("ntin ", "").split(",");
                        let itemId = this.getItemIds(searchResults).concat(featuredItemIDs);
                        backFillArticleconfig.sort = config.latestArticle ? "publishDate desc" : config.sort;
                        backFillArticleconfig.topicName = backFilltopiTag ? OperatorsEnum.In + " " + '"' + backFilltopiTag + '"': "";
                        backFillArticleconfig.itemId = itemId ? OperatorsEnum.NotIn + " " + itemId : "";
                        backFillArticleconfig.pageSize = config.pageSize - searchResults.length;

                        return this.http.getData(backFillArticleconfig).map(result => {
                            let getData = this.getArticleItem(result);
                            let backFillArticle = {};
                            backFillArticle["data"] = totalRecord.data.concat(getData.data);
                            if (config.latestArticle) {
                                backFillArticle["data"].sort(this.comparePublishDate);
                            }
                            return backFillArticle;
                        });

                    } else {

                        return Observable.of(totalRecord);
                    }
                }

            });
    }

    private getArticleItem(article: any): any {
        let articles = { "envelope": [], "data": [] };
        let item = [];
        if (this.hasResults(article)) {
            for (let data of article.data[0]['searchResults']) {
                let articleItems = data.fields;
                data.title = this.getValue(articleItems.title);
                data.itemId = this.getValue(articleItems.itemId);
                data.fullpath = this.getValue(articleItems.fullpath);
                data.parentid = this.getValue(articleItems.parentid);
                data.score = this.getIntValue(articleItems.score);
                data.itemUrl = this.getValue(articleItems.itemUrl);
                data.bannerImageUrl = this.getValue(articleItems.bannerImageUrl);
                data.featureImageUrl = this.getValue(articleItems.featureImageUrl);
                data.body = this.getValue(articleItems.body);
                data.contentTypeName = this.getValue(articleItems.contentTypeName);
                data.authorName = this.getValue(articleItems.authorName);
                data.publishDate = this.getValue(articleItems.publishDate);
                data.largeImage = this.getValue(articleItems.largeImage);
                data.smallImage = this.getValue(articleItems.smallImage);
                data.eventDate = this.getValue(articleItems.eventDate);
                data.thumbnailImageUrl = this.getValue(articleItems.thumbnailImageUrl);
                data.thumbnailImage = this.getValue(articleItems.thumbnailImage) === "" ? altTextConstants.AltImgText : this.getValue(articleItems.thumbnailImage);
                item.push(data);
            }

            articles['envelope'] = article.envelope;
            articles['data'] = item;
        }
        return articles;
    }
    private getAllTags(articleData): string[] {
        let totalTopicTag: string[] = <string[]>[];
        for (let topics of articleData) {
            let data = topics.fields.topic;
            for (let i = 0; i < data.length; i++) {
                let topicName = this.getValue(data[i].topicName);
                if (totalTopicTag.indexOf(topicName) === -1) {
                    totalTopicTag.push(topicName);
                }
            }
        }
        return totalTopicTag;
    }

    private getItemIds(data): string[] {
        let totalItemId = [];
        for (let item of data) {
            totalItemId.push(this.getValue(item.fields.itemId));
        }
        return totalItemId;

    }

    private comparePublishDate(a, b) {
        const publishDateA = new Date(a.publishDate);
        const publishDateB = new Date(b.publishDate);
        let comparison = 0;
        if (publishDateA < publishDateB) {
            comparison = 1;
        } else if (publishDateA > publishDateB) {
            comparison = -1;
        }
        return comparison;
    }

}