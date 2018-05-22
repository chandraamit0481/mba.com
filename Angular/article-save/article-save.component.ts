import { Component, OnInit } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";

@Component({
    selector: "article-save",
    templateUrl: './article-save.component.html',
})

export class ArticleSaveComponent implements OnInit {
    articleId: string;
    configKey: string = "articleDetail";
    isDetail: boolean = true;

    constructor(private siteCoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {
        this.articleId = this.getGuid(this.siteCoreConfig.itemId);
    }

    private getGuid(str): string {
        return str.slice(0, 8) + "-" + str.slice(8, 12) + "-" + str.slice(12, 16) +
            "-" + str.slice(16, 20) + "-" + str.slice(20, str.length + 1);
    }
}
