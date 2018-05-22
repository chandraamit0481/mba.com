import { NgModule } from '@angular/core';
import { RelatedContentModule } from '../shared/components/related-content/related-content.module';
import { RelatedTopicModule } from '../shared/components/related-topic/related-topic.module';
import { ArticleRelatedComponent } from "./article-related.component";

@NgModule({
    imports: [RelatedContentModule, RelatedTopicModule],
    declarations: [ArticleRelatedComponent],
    bootstrap: [ArticleRelatedComponent]
})

export class ArticleRelatedModule { }