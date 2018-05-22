import { IValue } from "../../models/common.models";

export class EventListModel {
    description: IValue<string>;
    eventCityName: IValue<string>;
    eventRegistrationRequired: IValue<string>;
    eventStartDate: IValue<string>;
    eventEndDate: IValue<string>;
    itemUrl: IValue<string>;
    eventHostName: IValue<string>;
    eventName: IValue<string>;
    address1: IValue<string>;
    address2: IValue<string>;
    address3: IValue<string>;
}
