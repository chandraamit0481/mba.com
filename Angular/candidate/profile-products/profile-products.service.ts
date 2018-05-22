import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { BaseService } from "../../shared/services/base.service";
import { ProductDataModel } from "./profile-products.model";
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import 'rxjs/add/observable/forkJoin';
import { LicenseStatusEnum, ProductIDEnum } from '../../shared/enums/lookups.enums';

@Injectable()
export class ProfileProductService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getAll(config, configSearch, licenseConfig, reportConfig): Observable<ProductDataModel[]> {
        return this.http.getData(config)
            .mergeMap(response => {
                return this.getProductPurchasedData(response, configSearch, licenseConfig, reportConfig);
            }).map(model => {
                return this.getModifiedPurchasedProduct(model);
            });
    }

    private getModifiedPurchasedProduct(purchaseProducts: ProductDataModel[]): ProductDataModel[] {
        let _purchaseProduct: ProductDataModel[];
        if (purchaseProducts && purchaseProducts.length > 0) {
            var products = purchaseProducts.filter((p, i, self) => i === self.findIndex((s) => (s.productId === p.productId && s.orderId == p.orderId)));
            for (let product of products) {
                let ctr = 1;
                let filteredRecords = purchaseProducts.filter(x => x.productId == product.productId && x.orderId == product.orderId);
                if (filteredRecords && filteredRecords.length > 1) {
                    filteredRecords.map(p => {
                            p.purchaseQuantity = ctr + " of " + p.purchaseQuantity
                            ctr++;
                    });
                }

            }

            return purchaseProducts;
        }
    }

    private getProductPurchasedData(productData, configSearch, licenseConfig, reportConfig): Observable<ProductDataModel[]> {
        let productPurchase = <ProductDataModel[]>[];
        if (this.hasResults(productData, "productpurchases")) {
            let productIds = [];
            let esrProductIds = [];

            productData.data[0].productpurchases.map(item => {
                if (item.fields) {
                    let product = item.fields;
                    let productId = this.getValue(item.id);
                    let key = this.getValue(product.key);
                    if (productIds.indexOf(productId) === -1) {
                        productIds.push(productId);
                    }
                    if (productId === ProductIDEnum.ESRCode.toString() && key) {
                        esrProductIds.push(key);
                    }
                    productPurchase.push(
                        <ProductDataModel>{
                            productId: this.getValue(item.id),
                            title: this.getValue(product.title),
                            currentProductVersionId: this.getValue(product.currentProductVersionID),
                            productFormatText: this.getValue(product.productFormatText),
                            productVersionId: this.getValue(product.productVersionID),
                            orderDate: this.getValue(product.orderDate),
                            purchaseQuantity: this.getValue(product.quantity),
                            orderId: this.getValue(product.orderID),
                            bodyText: this.getValue(product.bodyText),
                            caption: this.getValue(product.caption),
                            productLineText: this.getValue(product.productLineText),
                            productActivationCode: this.getValue(product.key),
                            sku: this.getValue(product.sku)
                        });
                }
            });

            configSearch.productId = OperatorsEnum.In + " " + productIds.join(',');
            let requestArr = [];

            requestArr.push(this.http.getData(configSearch));

            if (esrProductIds.length) {
                licenseConfig.licenseKey = OperatorsEnum.In + " " + esrProductIds.join(",");
                requestArr.push(this.http.getData(licenseConfig));
            }
            return Observable.forkJoin(requestArr).mergeMap(data => {
                const deliveryFormatName = 'ACCESS/DOWNLOAD IT NOW';
                if (data[0] && this.hasResults(data[0])) {
                    data[0]["data"][0].searchResults.map(ps => {
                        if (ps.fields) {
                            let item = ps.fields;
                            let found = productPurchase.filter(pp => pp.productId === this.getValue(item.productId));
                            let searchModel = <ProductDataModel>{};
                            searchModel.itemUrl = this.getValue(item.itemUrl);
                            searchModel.productDownloadLink = this.getValue(item.mediaFilePath);
                            searchModel.isDigital = (<string>(item.deliveryFormat && item.deliveryFormat.length ? this.getValue(item.deliveryFormat[0].deliveryFormatName) : '')).toUpperCase() === deliveryFormatName;
                            found.map(f => {
                                f = Object.assign(f, searchModel);
                            });
                        }

                    });
                }
                if (data[1] && this.hasResults(data[1], "License")) {
                    let licenseIds = [];
                    data[1]["data"][0].License.map(ls => {
                        if (ls.fields) {
                            let item = ls.fields;
                            let found = productPurchase.find(pp => pp.productActivationCode === this.getValue(item.licenseKey));
                            if (found) {
                                switch (this.getIntValue(item.licenseStatusID)) {
                                    case LicenseStatusEnum.Purchased: {
                                        found.isNotActivated = true;
                                        break;
                                    }
                                    case LicenseStatusEnum.Activated: {
                                        licenseIds.push({ key: found.productActivationCode, id: this.getValue(ls.id) });
                                        break;
                                    }
                                }
                            }

                        }
                    });
                    if (licenseIds.length > 0) {
                        reportConfig.licenseID = OperatorsEnum.In + " " + licenseIds.map(ids => { return ids.id; }).join(",");
                        return this.http.getData(reportConfig).map(repoActi => {
                            if (this.hasResults(repoActi, "ScoreReportActivation")) {
                                repoActi.data[0].ScoreReportActivation.map(sra => {
                                    if (sra.fields) {
                                        let item = sra.fields;
                                        let found = licenseIds.find(f => f.id === this.getValue(item.LicenseID));
                                        if (found) {
                                            let foundPP = productPurchase.find(pp => pp.productActivationCode === found.key);
                                            foundPP.appoinmentId = this.getValue(item.AppointmentID);
                                        }
                                    }
                                });
                            }
                            return productPurchase;
                        });
                    } else {
                        return Observable.of(productPurchase);
                    }
                } else {
                    return Observable.of(productPurchase);
                }
            });
        } else {
            return Observable.of(productPurchase);
        }

    }
}