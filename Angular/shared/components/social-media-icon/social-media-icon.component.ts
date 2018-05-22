import { Component, OnInit, Input } from "@angular/core";
import { SiteCoreConfig } from "../../config/sitecore.config";

@Component({
    selector: "social-media-icon",
    templateUrl: "./social-media-icon.html"
})

export class SocialMediaIcon implements OnInit {
    @Input() socialLinks: any;
    socialIconList: any = [];

    constructor(private siteCoreConfig: SiteCoreConfig) { }

    ngOnInit(): void {
        let iconList = JSON.parse(this.siteCoreConfig.socialIconList);
        let socialObj = [];
        if (this.socialLinks) {
            for (let item of this.socialLinks) {

                if (this.socialIconList.length > 0) {
                    socialObj = this.socialIconList.filter(m => m.Title === item.programLinkTypeIdLookupName.value);
                }
                if (this.socialIconList.length === 0 || socialObj.length === 0) {
                    let icon = iconList.filter(m => m.Title === item.programLinkTypeIdLookupName.value);
                    if (icon !== undefined && icon.length !== 0) {
                        let obj = {
                            ImgSrc: icon[0].InactiveIcon,
                            InactiveIcon: icon[0].InactiveIcon,
                            HoverIcon: icon[0].HoverIcon,
                            Title: icon[0].Title,
                            Url: (item.programLinkUrl.value !== undefined) ? item.programLinkUrl.value : item.programLinkUrl
                        };
                        this.socialIconList.push(obj);
                    }
                }
            }
        } else {
            let pageUrl = window.location.href;
            let socialUrl = "";
            let title = this.siteCoreConfig.title ? this.siteCoreConfig.title.split(' ').join('+') : "";
            for (let item of iconList) {
                if (item.Title.toLowerCase() === "facebook")
                    socialUrl = pageUrl + "&t=School+Events:+Event+Detail+-+" + title;
                else if (item.Title.toLowerCase() === "linkedin")
                    socialUrl = pageUrl + "&title=School+Events:+Event+Detail+-+" + title;

                let obj = {
                    ImgSrc: item.InactiveIcon,
                    InactiveIcon: item.InactiveIcon,
                    HoverIcon: item.HoverIcon,
                    Title: item.Title,
                    Url: item.SocialURL + socialUrl
                };

                this.socialIconList.push(obj);
            }
        }
    }
}