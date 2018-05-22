import { SafeHtml } from '@angular/platform-browser';
import { IValue } from "../../models/common.models";
import { LookupsEnum } from "../../enums/lookups.enums";


export interface IVideo {
    embdHTML: SafeHtml;
}

export interface ISocialMedia {
    socialMediaLinkTypeLookupName: string;
    socialMediaURL: string;
    socialMediaTitle: string;
}

export class IProgramLink {
    programLinkUrl: IValue<string>;
    programLinkTypeId: IValue<LookupsEnum>;
    programLinkTypeIdLookupName: IValue<string>;
    safeHtml: SafeHtml;
}