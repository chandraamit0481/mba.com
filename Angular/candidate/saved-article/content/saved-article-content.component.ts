import { Component, Input } from "@angular/core";
import { ArticleModel, ArticleDataModel } from "../saved-article.model";
import { CandidateProfileSitecoreModel } from "../../../shared/models/candidate-profile-sitecore.models";
import { SiteCoreConfig } from "../../../shared/config/sitecore.config";

@Component({
    selector: 'saved-article-content',
    templateUrl: './saved-article-content.component.html'
})
export class SavedArticleContentComponent {
    @Input() model: ArticleModel[];
    @Input() isProfile: boolean;
    private profileLabels: CandidateProfileSitecoreModel;

    constructor(private sitecoreConfig: SiteCoreConfig) { }
      
    ngOnInit(): void {
        this.profileLabels = this.sitecoreConfig.candidateProfileLabels;
    }
}