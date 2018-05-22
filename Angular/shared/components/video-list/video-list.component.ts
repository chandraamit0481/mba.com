import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IVideo, ISocialMedia, IProgramLink } from "./video-list.models";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { LookupsEnum } from "../../enums/lookups.enums";

@Component({
    selector: 'video-list',
    templateUrl: './video-list.component.html'
})

export class VideoListComponent implements OnInit {
    @Input() links: IProgramLink[];
    @Input() width: string;
    @Input() height: string;
    @Input() maxvideodisplay: number;
    otherVideoImgUrl: string;
    videos = <IProgramLink[]>[];
    channel = <IProgramLink[]>[];
    constructor(private sanitizer: DomSanitizer, private siteCoreConfig: SiteCoreConfig) {

        this.maxvideodisplay = this.maxvideodisplay || 3;
    }

    ngOnInit() {
        if (this.links && this.links.length > 0) {
            this.otherVideoImgUrl = this.siteCoreConfig.otherVideoImgUrl;
            this.height = this.height ? this.height : "185px";
            this.width = this.width ? this.width : "100%";
            this.videos = this.links.filter(v => this.validateVideo(v));
            this.channel = this.links.filter(v => v.programLinkTypeId.value === LookupsEnum.VideoChannel);           
            this.videos = this.videos.sort((a: IProgramLink, b: IProgramLink) => {
                if (a.programLinkTypeId.value < b.programLinkTypeId.value) {
                    return -1;
                } else if (a.programLinkTypeId.value > b.programLinkTypeId.value) {
                    return 1;
                } else {
                    return 0;
                }
            });
            if (this.videos.length > this.maxvideodisplay) {
                this.videos = this.videos.slice(0, this.maxvideodisplay);
            }

        }
    }

    validateVideo(link: IProgramLink) {
        switch (link.programLinkTypeId.value.toString()) {
            case LookupsEnum.YouTubeVideo.toString(): {
                link.safeHtml = this.youtubeEmbedLink(link);
                return true;
            }
            case LookupsEnum.OtherVideo.toString(): {
                link.safeHtml = this.otherVideoLink(link);
                return true;
            }
        }
        return false;
    }

    isYouTube(link: IProgramLink) {
        return (link.programLinkTypeId.value === LookupsEnum.YouTubeVideo);
    }

    otherVideoLink(item: IProgramLink) {
        let html = `<a role="link" href="` + item.programLinkUrl.value + `" role="link" target="_blank">
                    <img src="` + this.otherVideoImgUrl + `" height="` + this.height + `" width="` + this.width + `" alt="Other Videos"/>
                    </a>`;
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    youtubeEmbedLink(item: IProgramLink) {
        let html = `<iframe width="` + this.width + `" height="` + this.height + `" src="https://www.youtube.com/embed/` + this.youtubeParser(item.programLinkUrl.value) + `" frameborder="0" allowfullscreen></iframe>`;
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    youtubeParser(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
}