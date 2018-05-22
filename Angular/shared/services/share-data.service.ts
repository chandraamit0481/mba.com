import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
    public itemAdded$: EventEmitter<any>;
    private data = {};
    constructor() {
        this.itemAdded$ = new EventEmitter();
    }

    setOption(option, value) {
        this.data[option] = value;
        this.itemAdded$.emit(this.data);
    }

    getData() {
        return this.data;
    }
}