import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from "../../shared/services/http.service";
import { BaseService } from "../../shared/services/base.service";
import { Articles } from "../article.model";
import { Observable } from 'rxjs/Observable';
import { altTextConstants } from '../../shared/consts/consts';

@Injectable()
export class FeaturedArticleService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getAll(config): Observable<Articles[]> {

        return this.http.getData(config)
            .map(response => {
                return this.getPrimaryArticleData(response);
            });
    }

    private getPrimaryArticleData(primaryArticle: any): Articles[] {

        let item = <Articles[]>[];
        if (this.hasResults(primaryArticle)) {
            let searhReasult = primaryArticle.data[0].searchResults;
            for (let data of searhReasult) {
                let articleData = data.fields;
                let model = <Articles>{};
                model.title = this.getValue(articleData.title);                
                if (articleData.topic && articleData.topic.length > 0) {                    
                    model.topicList = articleData.topic.map(t => this.getValue(t.topicName));
                }
                model.itemId = this.getValue(articleData.itemId);
                model.fullpath = this.getValue(articleData.fullpath);
                model.parentId = this.getValue(articleData.parentid);
                model.score = this.getIntValue(articleData.score);
                model.itemUrl = this.getValue(articleData.itemUrl);
                model.bannerImageUrl = this.getValue(articleData.bannerImageUrl);
                model.bannerImage = this.getValue(articleData.bannerImage) === "" ? altTextConstants.AltImgText : this.getValue(articleData.bannerImage);
                model.featureImageUrl = this.getValue(articleData.featureImageUrl);
                model.body = this.getValue(articleData.body);
                model.contentTypeName = this.getValue(articleData.contentTypeName);
                model.authorName = this.getValue(articleData.authorName);
                model.publishDate = this.getValue(articleData.publishDate);
                model.largeImage = this.getValue(articleData.largeImage);
                model.smallImage = this.getValue(articleData.smallImage);
                model.eventDate = this.getValue(articleData.eventDate);
                model.thumbnailImageUrl = this.getValue(articleData.thumbnailImageUrl);
                model.description = this.getValue(articleData.description);
                item.push(model);
            }
        }
        return item;

    }
}