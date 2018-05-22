import { EventContentDataModel } from "./event-detail-content/event-content.model";
import { EventHeaderDataModel } from "./event-detail-header/event-header.model";

export class EventDetailDataModel {
    eventHeaderData: EventHeaderDataModel;
    eventContentData: EventContentDataModel;
}