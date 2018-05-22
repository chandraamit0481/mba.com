import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ConfigModel } from "../../models/common.models";
import { HttpService } from "../../services/http.service";
import { BaseService } from '../../services/base.service';


@Injectable()
export class SaveService extends BaseService {

    constructor(private http: HttpService) { super(); }

    getSavedItem(config: any): Observable<any> {
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response, config.responseKey)) {
                    return response.data[0];
                } else
                    return null;
            });
    }

    post(config: any): Observable<any> {
        return this.http.post(config);
    }

    delete(config: any): Observable<any> {
        return this.http.delete(config);
    }
           
}