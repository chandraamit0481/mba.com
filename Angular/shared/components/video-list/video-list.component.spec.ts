import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { VideoListComponent } from "./video-list.component";
import { IProgramLink } from "./video-list.models";
import { DomSanitizer } from '@angular/platform-browser';
import { LinksFilterPipe } from "./video-list.filter";
import { SiteCoreConfig } from "../../config/sitecore.config";
import { VideoListMock } from "../../../test-mock-up/video-list.mock";
import { LookupsEnum } from "../../enums/lookups.enums";


describe('VideoListComponent', () => {
    let fixture: ComponentFixture<VideoListComponent>,
        component: VideoListComponent,
        element: HTMLElement,
        debugEl: DebugElement,
        maxVideo: number;
        maxVideo = 3;
    beforeEach(async(() => { 
        TestBed.configureTestingModule({
            declarations: [VideoListComponent, LinksFilterPipe],
            providers: [SiteCoreConfig]
        }).compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(VideoListComponent);
        component = fixture.componentInstance;
        component.links = <IProgramLink[]>JSON.parse(VideoListMock);
        component.width = "90%";
        component.height = "200px";
        component.maxvideodisplay = maxVideo;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('should match videos list', () => {
        component.ngOnInit();
        expect(component.videos.length).toBe(maxVideo);
    });

    it('should match youtube video list', () => {
        let youtubeCount = component.videos.filter(v => component.isYouTube(v)).length;
        let videoCount = component.links.filter(p => p.programLinkTypeId.value === LookupsEnum.YouTubeVideo).length;
        expect((videoCount > maxVideo ? maxVideo : videoCount)).toBe(youtubeCount);
    });

    it('should match other video count', () => {
        let otherVideoCount = component.videos.filter(v => v.programLinkTypeId.value === LookupsEnum.OtherVideo).length;
        let youtubeCount = component.links.filter(p => p.programLinkTypeId.value === LookupsEnum.YouTubeVideo).length;
        let inputOtherVideoCount = component.links.filter(p => p.programLinkTypeId.value === LookupsEnum.OtherVideo).length;
        let expected = Math.max(0, (maxVideo - youtubeCount)) === 0 ? 0 : inputOtherVideoCount > (maxVideo - youtubeCount) ? (maxVideo - youtubeCount) : inputOtherVideoCount;
        expect(expected).toBe(otherVideoCount);
    });

});