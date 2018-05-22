
export class ArticleModel {

    contentTypeName: string;
    title: string;
    registrationRequired: string;
    authorName: string;
    publishDate: string;
    thumbnailImageUrl: string;
    thumbnailImage: string;
    itemUrl: string;
}

export class ArticleDataModel {
    recentArticle: ArticleModel[];
    restArticle: ArticleModel[];
}

