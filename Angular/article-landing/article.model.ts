
export class Articles {
    title: string;
    itemId: string;
    fullpath: string;
    score: number;
    featureImageUrl: string;
    parentId: string;
    topicName: string;
    topicList: string[];
    itemUrl: string;
    body: string;
    contentTypeName: string;
    authorName: string;
    publishDate: string;
    largeImage: string;
    smallImage: string;
    eventDate: string;
    thumbnailImageUrl: string;
    bannerImage: string;
    thumbnailImage: string;
    bannerImageUrl: string;
    schoolTagName: string[];
    topicTagName: string[];
    description: string;
}

export class ArticlesList {
    primaryArticleOne: Articles;
    primaryArticleTwo: Articles;
    secondaryArticle: Articles[];
}

export class ArticleBottom {
    contentTypeName: string;
    fullpath: string;
    itemId: string;
    itemUrl: string;
    parentId: string;
    score: number;
    templateId: string;
    title: string;
}

export class ArticleDataSet {
    excludeItems: string;
    topicTag: string;
}
