import { EventListModel } from "../shared/components/event-list/event-list.model";
import { ProgramDataModel } from "./program-list-data.model";
import { IProgramLink } from "../shared/components/video-list/video-list.models";
import { SchoolHeaderDataModel } from "./school-profile-header/school-header.model";

export class SchoolProfileDataModel {
    schoolDetail: SchoolHeaderDataModel;
    programDetail: ProgramDataModel[];
    programlink: IProgramLink[];
    videoLink: IProgramLink[];
    socialMediaLink: IProgramLink[];
    eventDetails: EventListModel[];
}

