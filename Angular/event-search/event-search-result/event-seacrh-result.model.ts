import { IValue } from "../../shared/models/common.models";

export class EventSearchDataModel {

    fields: {
        eventId: IValue<number>;
        eventHostName: IValue<string>;
        eventWebsiteAddress: IValue<string>;
        eventRegistrationUrl: IValue<string>;
        eventIsOnline: IValue<boolean>;
        description: IValue<string>;
        eventCityName: IValue<string>;
        eventRegistrationRequired: IValue<boolean>;
        eventStartDate: IValue<string>;
        eventEndDate: IValue<string>;
        itemUrl: IValue<string>;
        eventName: IValue<string>;
        address1: IValue<string>;
        address2: IValue<string>;
        address3: IValue<string>;
    };


}