import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from "./saved-article.model";
import { ArticleDataModel } from "./saved-article.model";

import { SavedArticleService } from "./saved-article.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { SavedArticleConfig } from "./saved-article.config";
import { Base } from "../../shared/models/common.models";
import { CandidateProfileSitecoreModel } from '../../shared/models/candidate-profile-sitecore.models';

@Component({
    selector: 'saved-articles',
    templateUrl: './saved-article.component.html'
})

export class SavedArticleComponent extends Base implements OnInit {

    @Input() configKey = "allSavedArticle";
    isProfile: boolean;
    model: ArticleDataModel;
    noArticle: string;
    notSavedAnyArticle: boolean;
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private savedArticleService: SavedArticleService, private siteCoreConfig: SiteCoreConfig,
        private savedArticleConfig: SavedArticleConfig) { super(); }

    ngOnInit() {
        this.profileLabels = this.siteCoreConfig.candidateProfileLabels;
        this.notSavedAnyArticle = false;
        this.getSavedArticles();

    }

    getSavedArticles() {
        let configObject = this.savedArticleConfig.getConfiguration(this.configKey);
        configObject.identityId = this.siteCoreConfig.currentAccount.identityID;
        this.isProfile = !!configObject.isProfile;
       
        let configArticlesObject = this.savedArticleConfig.getConfiguration("articleDetails");
        configArticlesObject.pageSize = configObject.rowCount;
        this.isLoading = true;
        this.savedArticleService.getArticles(configObject, configArticlesObject).subscribe(response => {
            if (response && response.recentArticle && response.recentArticle.length) {
                this.notSavedAnyArticle = true;
                this.model = response;
            } else {
                this.noArticleData();
            }

            this.isLoading = false;


        },
            () => {
            this.isLoading = false;
            });
    }

    private noArticleData() {
        this.notSavedAnyArticle = false;
        this.noArticle = 'You do not have any saved articles.';
    }
}
