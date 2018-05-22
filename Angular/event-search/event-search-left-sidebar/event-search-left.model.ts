import { FormatType } from "./format-type.enum";
import { ILookupModel } from "../../school-finder/school-finder.model";

export class EventSearchLeftModel {

    isOnline: string;
    geoLocation: string;
    eventStartDate: string;
    eventSearchText: string;
    startDate: any;
    endDate: any;
    location: ILookupModel[];
    eventIsOnline: string;
    formatType: FormatType;
    eventCountryName: string;
    eventCityName: string;
    eventStateName: string;
    eventEndDate: string;
}

export class PagingStatus {
    pageNumber: number;
    pageStatus: string;
}
