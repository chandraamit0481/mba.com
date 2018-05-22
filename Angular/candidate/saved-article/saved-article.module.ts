import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SavedArticleConfig } from "./saved-article.config";
import { SavedArticleComponent } from "./saved-article.component";
import { SavedArticleService } from "./saved-article.service";
import { RouterModule } from "@angular/router";
import { SavedArticleContentComponent } from "./content/saved-article-content.component";
import { MainModule } from "../../shared/modules/main.module";

@NgModule({
    imports: [BrowserModule, RouterModule, MainModule],
    declarations: [SavedArticleComponent, SavedArticleContentComponent],
    providers: [SavedArticleService, SavedArticleConfig],
    exports: [SavedArticleComponent]
})

export class SavedArticleModule { }