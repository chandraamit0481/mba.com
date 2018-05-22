import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventsComponent } from "./events.component";
import { EventsService } from "./events.service";
import { CandidateEventConfig } from "./events.config";
import { RouterModule } from "@angular/router";
import { ProfileEventContentComponent } from "./content/profile-event-content.component";
import { MainModule } from "../../shared/modules/main.module";

@NgModule({
    imports: [BrowserModule, RouterModule, MainModule],
    declarations: [EventsComponent, ProfileEventContentComponent],
    providers: [EventsService, CandidateEventConfig],
    exports: [EventsComponent]
})

export class EventsModule { }