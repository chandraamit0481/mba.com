import { Observable } from "rxjs/Observable";
import { ResponseModel, ResponseObject } from "../../shared/models/response.model";
import { HttpService } from "../../shared/services/http.service";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import 'rxjs/add/observable/of';
import { Dictionary } from "underscore";

export class MockHttpService extends HttpService {
    private mockData: string | Dictionary<string>;
    constructor(data: string | Dictionary<string>) {
        super(null, null, <SiteCoreConfig>{ apiUrl: "" }, null);
        this.mockData = data;
    }
    
    getData<T>(config: any): Observable<ResponseModel<T>> {
        let obj : ResponseModel<T>;
        if (typeof (this.mockData) === "object") {
            obj = <ResponseModel<T>>JSON.parse(this.mockData[config.method]);
        } else {
            obj = <ResponseModel<T>>JSON.parse(this.mockData);
        }
        return Observable.of(obj);
    }
    getByExternalUrl<T>(url: string): Observable<ResponseObject<T>> {
        let obj: ResponseObject<T>;
        if (typeof (this.mockData) === "string") {
            obj = <ResponseObject<T>>JSON.parse(this.mockData);
        }
        return Observable.of(obj);
    }
}