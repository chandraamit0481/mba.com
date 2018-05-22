import { Injectable } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { BaseService } from '../../services/base.service';

@Injectable()
export class RelatedContentService extends BaseService {

    constructor(private http: HttpService) { super(); }

    getRelatedContent(config: any) {       
        return this.http.getData(config)
            .map(response => {
                if (this.hasResults(response)) {
                    return response.data[0]['searchResults'];
                }
                return null;
                
            });
    }
}