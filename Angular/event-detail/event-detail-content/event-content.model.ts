import { SafeHtml } from "@angular/platform-browser";

export class EventContentDataModel {
    description: SafeHtml;
    phoneNumber: string;
    startDate: string;
    activeFlag: number;
    endDate: string;
    websiteAddress: string;
    codeIdStartHour: string;
    codeIdEndHour: string;
    address1: string;
    address2: string;
    address3: string;
    emailAddress: string;
    registrationRequired: string;
    hostNames: string[];
    isOnLine: boolean;
    eventStateName: string;
    eventEmail: string;
    eventCountryName: string;
    eventCityName: string;
    eventPostalCode: string;
}