
export class Products {
    title: string;
    itemUrl: string;
    tabTechnicalBody: string;
    contentTypeName: string;
    thumbnailImageUrl: string;
    featureImageUrl: string;
    bannerImageUrl: string;
    retailPrice: string;
    productFormat: string;
    productId: number;
   
   
}

export class ProductsList {
    primaryArticleOne: Products;
    primaryArticleTwo: Products;
    secondaryArticle: Products[];
}

export class ProductBottom {
    contentTypeName: string;
    fullpath: string;
    itemId: string;
    itemUrl: string;
    parentId: string;
    score: string;
    templateId: string;
    title: string;
    retailPrice: string;
    productId: number;
}
