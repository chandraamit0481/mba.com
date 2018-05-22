import { altTextConstants } from "../consts/consts";

export interface IValue<T> {
    value: T;
}

export class ConfigModel {
    method: string;
    field: string;
    filters: string[];
    queries: string[];
    topResults: string;
    include: string;
    exclude: string;
    sort: string;
    pageSize: string;
    rows: string;
    page: string;
    configKey: string;
    id: string;
    mbaAppId: string;
}

export class SaveModel {
    id: number;
    savedId: number;
}

export class AddressModel {

    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;

    getAddress() {
        let address = (this.address1 ? this.address1 + ", " : "") +
            (this.address2 ? this.address2 + ", " : "") +
            (this.address3 ? this.address3 + ", " : "") +
            (this.city ? this.city + ", " : "") +
            (this.state ? this.state + ", " : "") +
            (this.country ? this.country + "," : "") +
            (this.postalCode ? this.postalCode + "," : "");

        return address.slice(0, -1);
    }
}

export interface IBaseModel<T> {
    id: IValue<string>;
    fields: T;
}

export class CartModel {
    productId: number;
    qty: number;
    identityId: string;
    sessionId: string;
    isVoucher: boolean;
}

export class PostModel {
    envelope: any;
    data: any;
}

export class Base {
    isLoading: boolean = false;
    errored: boolean = false;

    pageConstants = altTextConstants;
    disableLoader(flag: boolean): void {
        this.isLoading = flag;
    }
    redirectPage(url: string, partUrl: string = ""): void {
        partUrl = partUrl && partUrl.trim();
        location.href = url + (partUrl && '/' + partUrl);
    }

}
