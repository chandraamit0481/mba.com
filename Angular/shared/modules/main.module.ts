import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderComponent } from "../components/loader/loader.component";
import { DateFormatPipe } from '../pipes/date-format';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    imports: [BrowserModule],
    declarations: [LoaderComponent, DateFormatPipe],
    exports: [LoaderComponent, DateFormatPipe, ClickOutsideModule]
})

export class MainModule { }