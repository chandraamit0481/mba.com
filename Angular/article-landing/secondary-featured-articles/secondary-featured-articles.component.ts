import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Articles } from "../article.model";

@Component({
    selector: 'app-secondary-featured-articles',
    templateUrl: './secondary-featured-articles.component.html'
})

export class SecondaryFeaturedArticlesComponent implements OnInit, OnChanges {
    secondaryArticleList: Articles[];
    @Input() secondaryArticle: Articles[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnInit(): void {
        this.secondaryArticleList = this.secondaryArticle;
    }
}
