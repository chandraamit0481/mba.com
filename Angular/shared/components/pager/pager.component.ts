import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { PagerService } from "./pager.service";

@Component({
    selector: 'pager',
    templateUrl: './pager.component.html'
})

export class PagerComponent implements OnChanges {
    @Output() emitMethod: EventEmitter<number> = new EventEmitter();
    @Input() totalItems: number;
    @Input() rows: number = 10;
    @Input() currentPage: number = 1;
    page: number;
    pager: any;

    constructor(private pagerService: PagerService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['totalItems'] && !changes['totalItems'].firstChange) {
            this.pager = this.pagerService.getPager(this.totalItems, this.currentPage, this.rows);
        }
        if (changes['currentPage'] && !changes['currentPage'].firstChange) {
            this.pager = this.pagerService.getPager(this.totalItems, this.currentPage, this.rows);
        }
    }

    setPage(page: number): void {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.currentPage = page;
        this.emitMethod.emit(this.currentPage);
        this.pager = this.pagerService.getPager(this.totalItems, this.currentPage, this.rows);
    }

    next(): void {
        if (this.currentPage < this.pager.totalPages) {
            this.currentPage = 1 + this.currentPage++;
            this.setPage(this.currentPage);
        }
    }

    prev(): void {
        if (this.pager.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.setPage(this.currentPage);
        }
    }
}