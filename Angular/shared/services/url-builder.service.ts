import { Injectable } from "@angular/core";
import { OperatorsEnum } from "../enums/operators.enum";
import { SiteCoreConfig } from "../config/sitecore.config";
import { PostModel } from "../models/common.models";
import { CookieService } from "ngx-cookie";
import { BaseService } from "./base.service";

@Injectable()
export class UrlBuilderService extends BaseService {
    private url: string;
    private segmentationName: string = "";

    constructor(private siteCoreConfig: SiteCoreConfig, private cookieService: CookieService) {
        super();
        if (this.siteCoreConfig && this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.segmentation) {
            this.segmentationName = this.siteCoreConfig.currentAccount.dominantType;
        } else {
            let cookieValue = cookieService.get("typingToolSegmentCookie");
            if (cookieValue)
                this.segmentationName = JSON.parse(cookieValue).dominantType ? JSON.parse(cookieValue).dominantType : "";
        }
    }
    getServiceUrl(config: any): string {
        if (!config)
            return "";
        if (!config.method)
            return "";
        
        config = this.setDefaultValues(config);

        this.url = config.method + (config.id ? "/" + config.id : "") + "?";

        if (config.filters && config.filters.length > 0) {
            let filterString = "";
            for (let item of config.filters) {
                if (config[item]) {
                    if (filterString)
                        filterString += " and ";
                    let isOperatorAvailable = this.checkOperator(config[item]);
                    if (isOperatorAvailable)
                        filterString += item + " " + config[item];
                    else
                        filterString += item + " " + OperatorsEnum.Equal + " " + config[item];
                }
            }
            if (filterString) {
                this.url += "filter=" + filterString.trim() + "&";
            }
        }

        if (config.queries && config.queries.length > 0) {
            let queryString = "";
            for (let item of config.queries) {
                if (config[item]) {
                    if (queryString)
                        queryString += " and ";
                    let isOperatorAvailable = this.checkOperator(config[item]);
                    if (isOperatorAvailable)
                        queryString += item + " " + config[item];
                    else
                        queryString += item + " " + OperatorsEnum.Equal + " " + config[item];
                }
            }
            if (queryString)
                this.url += "query=" + queryString.trim() + "&";
        }

        if (config.sort) {
            this.url += "sort=" + config.sort + "&";
        }

        if (config.fields)

            this.url += "fields=" + config.fields + "&";

        if (config.otherParams && config.otherParams.length > 0) {
            for (let item of config.otherParams) {
                if (config[item]) {

                    this.url += item + "=" + config[item] + "&";
                }
            }
        }
        return this.url.replace(/(^&)|(&$)/g, "");
    }

    getPostModel(config: any): PostModel {
        let retModel = <PostModel>{};
        retModel.envelope = {};
        retModel.data = [];

        if (config && config.dataField) {
            let data = {};
            let fields = this.processFields(config);
            data[config.dataField] = [];
            data[config.dataField].push({ fields });
            retModel.data.push(data);
        }

        return retModel;
    }

    private checkOperator(filterValue: string): boolean {
        let values = filterValue.toString().split(" ");
        let isOperator = Object.keys(OperatorsEnum).map(key => OperatorsEnum[key]).indexOf(values[0]) > -1;
        return isOperator;
    }

    private processFields(config: any): any {
        let dataFields = {};
        for (let field of config.fields) {
            let fieldValue = config[field];
            if (fieldValue) {
                if (typeof (fieldValue) === "object") {
                    let processedData = this.processFields(fieldValue);
                    dataFields[field] = Object.keys(processedData).map(item => { return { [item]: processedData[item] }; });
                } else {
                    dataFields[field] = {};
                    dataFields[field].value = fieldValue;
                }
            } else if (fieldValue === null) {//if value is null then it should be pass as null. We would not take care undefined or empty values 
                dataFields[field] = {};
                dataFields[field].value = fieldValue;
            }
        }
        return dataFields;
    }

    private setDefaultValues(config: any): any {
        let preferredCountry = this.siteCoreConfig.preferredCountry;
        if (preferredCountry) {
            config.countryName = this.setValues(preferredCountry.countryName);
            config.regionName = this.setValues(preferredCountry.regionName);
        }

        if (this.segmentationName) {
            config.segmentationName = '"' + this.segmentationName + '"';
        }
        let cmSwitches = this.siteCoreConfig.cmServer;
        if (cmSwitches) {
            if (config.switches) {
                let hasCMSwitch = (config.switches).indexOf(cmSwitches);
                if (hasCMSwitch < 0)
                    config.switches = config.switches + "," + cmSwitches;
            } else
                config.switches = cmSwitches;
        }
        return config;
    }

}
