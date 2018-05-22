import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProgramsComponent } from "./programs.compnent";
import { ProgramsService } from "./programs.service";
import { CandidateProgramConfig } from "./programs.config";
import { RouterModule } from "@angular/router";
import { MainModule } from "../../shared/modules/main.module";


@NgModule({
    imports: [BrowserModule, RouterModule, MainModule],
    declarations: [ProgramsComponent],
    providers: [ProgramsService, CandidateProgramConfig],
    exports: [ProgramsComponent]
})

export class ProgramsModule { }