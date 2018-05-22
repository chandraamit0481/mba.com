import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

@Directive({
    selector: '[number-only]'
})
export class NumberOnlyDirective {
    // Allow decimal numbers and negative values
    @Input() maxLen: number = 10;
    private regex: RegExp = new RegExp(/^[0-9]$/g);

    //Allow ['Backspace', 'Delete','Tab', 'Enter', 'left', 'right']
    private specialKeysCode: Array<number> = [8, 46, 9, 14, 37, 39];

    constructor( @Inject(ElementRef) private el: ElementRef) {
    }

    @HostListener('keydown', ['$event'])

    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeysCode.indexOf(event.keyCode) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;

        if ((current.length >= this.maxLen) || (event.key && !String(event.key).match(this.regex))) {
            event.preventDefault();
        }
    }
}