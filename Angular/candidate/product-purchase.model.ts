export class ProducPurChaseDataModel {

    data: ProductDataModel[];

    constructor() {

        this.data = <ProductDataModel[]>[];

    }

}
export class ProductDataModel {

    title: string;

    bodyText: string;

    caption: string;

    currentProductVersionID: string;

    extraText: string;

    orderDate: string;

    productFormatText: string;

    productID: string;

    productLineText: string;

    productVersionID: string;

    purchaseQuantity: string;

    orderID: string;

}

