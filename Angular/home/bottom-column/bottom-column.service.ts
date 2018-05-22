import { Injectable } from "@angular/core";
import { HttpService } from "../../shared/services/http.service";
import { Observable } from "rxjs/Observable";
import { BaseService } from "../../shared/services/base.service";

@Injectable()
export class BottomColumnService extends BaseService {
    constructor(private http: HttpService) { super(); }

    getData(config: any): Observable<any> {

        return this.http.getData(config).map(response => {
            if (this.hasResults(response)) {
                return response.data[0]['searchResults'];
            }
            return null;
        });
    }
}