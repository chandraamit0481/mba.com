import { AddressModel } from "../../shared/models/common.models";

export class EventsModel {

    eventName: string;
    startDate: string;
    endDate: string;
    eventStartHour: string;
    registrationRequired: string;
    eventLocation: AddressModel;
    eventUrl: string;
    hostUrl: string;
    eventEndHour: string;
    isExpired: boolean;
    constructor() {
        this.eventLocation = new AddressModel();
    }
}

export class EventsDataModel {
    recentEvent: EventsModel[];
    restEvent: EventsModel[];
}
