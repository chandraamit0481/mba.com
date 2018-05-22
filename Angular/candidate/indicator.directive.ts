import { Directive, Renderer, OnInit, Input, ElementRef } from '@angular/core';

@Directive({ selector: '[progress-indicator]' })

export class IndicatorDirective implements OnInit {
    @Input() percent: number;
    constructor(private el: ElementRef, private renderer: Renderer) {}
    ngOnInit() {
        let pixels = (this.percent / 100) * 120;
        this.el.nativeElement.style.top = (120 - pixels) + "px";
        this.el.nativeElement.style.height = pixels + "px";
    }
}