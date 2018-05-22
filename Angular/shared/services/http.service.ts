import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ResponseModel, ResponseObject } from '../models/response.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { UrlBuilderService } from "./url-builder.service";
import { SiteCoreConfig } from "../config/sitecore.config";
import { CookieService } from 'ngx-cookie';

@Injectable()
export class HttpService {
    private renewableInProgress: boolean = false;
    private baseURL: string;
    private apiKey: string;
    private authorizationKey: string = "Authorization";
    private userAccessKey: string = "";


    constructor(private http: Http, private urlBuilder: UrlBuilderService, private siteCoreConfig: SiteCoreConfig, private cookieService: CookieService) {
        this.baseURL = this.siteCoreConfig ? this.siteCoreConfig.apiUrl : "";
        this.apiKey = this.siteCoreConfig ? this.siteCoreConfig.apiKey : "";
        sessionStorage.removeItem("redirectToLogin");
    }

    getData<T>(config: any): Observable<ResponseModel<T>> {
        if (this.validateUserAccesskey()) {
            let url = this.baseURL + encodeURI(this.urlBuilder.getServiceUrl(config));
            return this.http.get(url, this.getHeaders())
                .map((response: Response) => {
                    let responeModel = <ResponseModel<T>>response.json();
                    return this.processResponse(responeModel);
                }).catch(this.handleError);
        }
    }

    getByExternalUrl<T>(url: string): Observable<ResponseObject<T>> {
        return this.http.get(url)
            .map((response: Response) => {
                let responeModel = <ResponseModel<T>>response.json();
                return responeModel;
            }).catch(this.handleError);
    }

    postExternalUrl<T>(url: string, data: any): Observable<ResponseModel<T>> {
        return this.http.post(url, data)
            .map((response: Response) => {
                return response;
            }).catch(() => { return Observable.of(null); });
    }

    getJSON<T>(path: string): Observable<any> {
        return this.http.get(path)
            .map(res => <T>res.json())
            .catch(this.handleError);
    }

    post<T>(config: any): Observable<ResponseModel<T> | Response> {
        if (this.validateUserAccesskey()) {
            if (config && config.method) {
                let model = this.urlBuilder.getPostModel(config);
                return this.http.post(this.baseURL + config.method, JSON.stringify(model), this.getHeaders())
                    .map((response: Response) => {
                        return this.processResponse(response);
                    }).catch(this.handleError);
            } else {
                return null;
            }
        }
    }

    delete<T>(config: any): Observable<ResponseModel<T> | Response> {
        if (this.validateUserAccesskey()) {
            let queryString = this.urlBuilder.getServiceUrl(config);
            return this.http
                .delete(this.baseURL + queryString, this.getHeaders())
                .map((response: Response) => {
                    return this.processResponse(response);
                }).catch(this.handleError);
        }
    }

    private validateUserAccesskey() {
        
        this.userAccessKey = this.cookieService.get("User-Access-Key") || "";
        if (this.userAccessKey && this.renewableInProgress === false) {
            let expiredDate = this.cookieService.get("User-Access-Key-ExpiredOn");
            if (expiredDate) {
                let userAccessKeyRenewal = this.siteCoreConfig ? this.siteCoreConfig.userAccessKeyRenewal : "";
                let userAccessKeyTimeOut = this.siteCoreConfig ? this.siteCoreConfig.userAccessKeyTimeOut : "";
                let currentUTCDate = this.convertDateToUTC(new Date());
                let timeRemaining = ((Date.parse(expiredDate) - Date.parse(currentUTCDate)) / 1000) / 60;
                if (timeRemaining <= 0)
                    this.redirectTo();
                else if (userAccessKeyRenewal && timeRemaining <= parseInt(userAccessKeyRenewal)) {
                    this.renewableInProgress = true;
                    //call security service to renew token  and update cookies                    
                    this.http.put(this.baseURL + "security", "", this.getHeaders())
                        .subscribe((result: Response) => {
                            let response = result.json();
                            this.userAccessKey = (response["data"] && response["data"][0] && response["data"][0]["userInfo"] && response["data"][0]["userInfo"]["user-access-key"] ? response["data"][0]["userInfo"]["user-access-key"] : "");
                            expiredDate = (this.userAccessKey ? (new Date(response["data"][0]["userInfo"]["expirationDate"])).toLocaleString() : "");
                            this.cookieService.put("User-Access-Key", this.userAccessKey, { 'expires': expiredDate });
                            this.cookieService.put("User-Access-Key-ExpiredOn", expiredDate, { 'expires': expiredDate });
                            this.renewableInProgress = false;
                        });
                }
                return true;
            } else {
                this.redirectTo();
            }
        } else
            return true;
    }

    private convertDateToUTC(date): any {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

    private getHeaders(): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authorizationToken = "API-KEY " + this.apiKey;
        if (this.userAccessKey) {
            authorizationToken = authorizationToken + ";USER-ACCESS-KEY " + this.userAccessKey;
        }
        headers.set(this.authorizationKey, authorizationToken);
        return new RequestOptions({ headers: headers });
    }

    private processResponse<T>(response: ResponseModel<T> | Response): ResponseModel<T> | Response {
        if ((<ResponseModel<T>>response).httpStatusCode === 401 || (<Response>response).status === 401) {
            this.redirectTo();
        } else {
            return response;
        }
    }

    private handleError(error: Response) {

        return Observable.throw(error.json().error || 'Server error');
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise(error: Response | any) {
        return Promise.reject(error.message || error);
    }
    private redirectTo(): void {
        if (!sessionStorage.getItem("redirectToLogin")) {
            sessionStorage.setItem("redirectToLogin", "true");
            window.location.href = this.siteCoreConfig && this.siteCoreConfig.loginPageUrl ? this.siteCoreConfig.loginPageUrl + window.location.href : "";
        }
    }

}

