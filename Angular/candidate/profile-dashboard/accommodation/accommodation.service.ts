import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../../shared/services/http.service";
import { AccommodationModel } from "./accommodation.model";
import { BaseService } from "../../../shared/services/base.service";
import { AccommodationStatus } from '../../../shared/enums/lookups.enums';
import { SiteCoreConfig } from '../../../shared/config/sitecore.config';

@Injectable()
export class AccommodationService extends BaseService {
    constructor(private http: HttpService, private siteCoreConfig: SiteCoreConfig) {
        super();
    }

    getAll(config): Observable<AccommodationModel[]> {
        return this.http.getData(config)
            .map(response => {                
                if (this.hasResults(response, "accommodations")) {
                    return this.getAccommodationsData(response.data[0].accommodations);
                } else {
                    return null;
                }

            });
    }


    getAccommodationsData(accommodations: any): AccommodationModel[] {        
        let accommodationsData = <AccommodationModel[]>[];
        for (let item of accommodations) {
            let accommodation = <AccommodationModel>{};
            accommodation.id = this.getValue(item.id);
            if (item.fields) {
                accommodation.status = this.getValue(item.fields.status);
                switch (accommodation.status) {

                    case AccommodationStatus.NewRequest: {

                        accommodation.messsage = this.siteCoreConfig.accommodationText.newRequestMessage;

                        break;
                    }
                    case AccommodationStatus.DecisionMade: {

                        accommodation.messsage = this.siteCoreConfig.accommodationText.decisionMadeMessage;

                        break;
                    }
                    case AccommodationStatus.UnderReview: {

                        accommodation.messsage = this.siteCoreConfig.accommodationText.underReviewMessage;

                        break;
                    }
                    default: {
                        accommodation.messsage = "";
                        break;
                    }

                }

                accommodation.date = this.getValue(item.fields.date);
            } else {
                accommodation.status = "";
                accommodation.date = "";
            }
            accommodationsData.push(accommodation);
        }
        return accommodationsData;
    }
}

