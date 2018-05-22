import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { ArticleDataModel, ArticleModel } from "./saved-article.model";
import { BaseService } from "../../shared/services/base.service";
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { altTextConstants } from '../../shared/consts/consts';

@Injectable()
export class SavedArticleService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }


    getArticles(configObject, articleConfigObject): Observable<ArticleDataModel> {
        if (configObject.identityId) {
            let model = <ArticleModel[]>[];
            let itemId = [];
            return this.http.getData(configObject).mergeMap(response => {
                if (this.hasResults(response, "SavedArticle")) {
                    for (let siteCoreId of response.data[0].SavedArticle) {
                        itemId.push(siteCoreId.fields.sitecoreID.value.replace(/-/g, ""));
                    }
                    articleConfigObject.itemId = OperatorsEnum.In + " " + itemId.join(",");                    
                    return this.http.getData(articleConfigObject).map(articleData => {
                        model = this.processResponse(articleData);
                        return this.filterRecords(model);
                    });
                }
                return Observable.of(null);
            });
        } else {
            return Observable.of(null);
        }
    }

    processResponse(articleData): ArticleModel[] {
        let articleModel = <ArticleModel[]>[];
        if (this.hasResults(articleData)) {
            for (let searchResult of articleData.data[0].searchResults) {
                let item = new ArticleModel();
                let article = searchResult.fields;
                item.contentTypeName = this.getValue(article.contentTypeName);
                item.title = this.getValue(article.title);
                item.authorName = this.getValue(article.authorName);
                item.publishDate = this.getValue(article.publishDate);
                item.thumbnailImageUrl = this.getValue(article.thumbnailImageUrl);
                item.thumbnailImage = this.getValue(article.thumbnailImage) === "" ? altTextConstants.AltImgText : this.getValue(article.thumbnailImage);
                item.itemUrl = this.getValue(article.itemUrl);

                articleModel.push(item);
            }
        }
        return articleModel;
    }


    filterRecords(articleModel: ArticleModel[]): ArticleDataModel {
        let articleDataModel = <ArticleDataModel>{};
        if (articleModel && articleModel.length > 0) {
            articleDataModel.recentArticle = articleModel.slice(0, 1);
            if (articleModel.length > 1) {
                articleDataModel.restArticle = articleModel.slice(1, articleModel.length);
            }
        }
        return articleDataModel;
    }

}