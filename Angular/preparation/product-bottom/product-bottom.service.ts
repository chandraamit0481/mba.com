import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { BaseService } from "../../shared/services/base.service";
import { ProductBottom } from "../preparation.models";

@Injectable()
export class ProductBottomService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getData(config): Observable<string[]> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response)) {
                    return this.getProductBottomData(response.data[0].searchResults);
                } else {
                    return null;
                }
            });
    }

    private getProductBottomData(productBottom: any): string[] {
        const allTestSection: string = "All Test Sections";
        let item = [];
        for (let data of productBottom) {
            let productData = data.fields;
            if (productData.testSection && productData.testSection.length > 0) {
                for (let i = 0; i < productData.testSection.length; i++) {
                    let testSection = this.getValue(productData.testSection[i].testSectionName);
                    if (item.indexOf(testSection) === -1) {
                        if (testSection.toLowerCase() !== allTestSection.toLowerCase()) {
                            item.push(testSection);
                        }
                    }
                }
            }
        }
        if (item.indexOf(allTestSection) === -1) {
            item.unshift(allTestSection);
        }
        return item;
    }

}