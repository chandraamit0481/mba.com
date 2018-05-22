import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { ArticleBottom } from "../article.model";
import { BaseService } from "../../shared/services/base.service";

@Injectable()
export class ArticleBottomService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getData(config): Observable<ArticleBottom[]> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response)) {
                    let articleBottom = this.getArticleBottomData(response.data[0].searchResults);
                    return <ArticleBottom[]>articleBottom;
                }
            });
    }

    private getArticleBottomData(articleBottom: any): ArticleBottom[] {
        let item = <ArticleBottom[]>[];
        if (articleBottom[0].fields) {
            for (let data of articleBottom) {
                let bottomArticle = data.fields;
                data.contentTypeName = this.getValue(bottomArticle.contentTypeName);
                data.fullpath = this.getValue(bottomArticle.fullpath);
                data.itemId = this.getValue(bottomArticle.itemId);
                data.itemUrl = this.getValue(bottomArticle.itemUrl);
                data.title = this.getValue(bottomArticle.title);
                data.score = this.getIntValue(bottomArticle.score);
                data.templateId = this.getValue(bottomArticle.templateid);
                data.parentId = this.getValue(bottomArticle.parentid);

                item.push(data);
            }
            return item;
        } else {
            return null;
        }
    }
}