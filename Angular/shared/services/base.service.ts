import { Injectable } from "@angular/core";
import { IValue } from "../models/common.models";

@Injectable()
export class BaseService {

    hasData(model): boolean {
        return model && model.data && model.data.length;
    }

    hasResults(model, key: string = "searchResults"): boolean {
        return this.hasData(model) && model.data[0][key] && model.data[0][key].length;
    }

    hasLength(model, key: string = "searchResults"): boolean {
        return model && model.length && model[0][key] && model[0][key].length;
    }

    getValue(field: IValue<string>, defaultValue: string = "", separator: string = ""): string {
        return (field === undefined || field === null || !field.value || field.value.toString().trim() === "") ? defaultValue : field.value + separator;
    }

    getArrayValue(field: IValue<any[]>): any[] {
        return (field) ? field.value : [];
    }

    getIntValue(field: IValue<number>, defaultValue: number = 0): number {
        return (field === undefined || field === null) ? defaultValue : field.value;
    }

    getBoolValue(field: IValue<boolean>, defaultValue: boolean = false): boolean {
        return (field === undefined || field === null) ? defaultValue : field.value;
    }

    setValues(property: string): string {
        if (property) {
            property = property.split(',').length > 1 ? "(" + property + ")" : '"' + property + '"';
        }
        return property;
    }

    compareEndDate(date: string): boolean {
        let eventDate = date ? new Date(date) : new Date();
        return (new Date((eventDate.getUTCMonth() + 1) + "/" + eventDate.getUTCDate() + "/" + eventDate.getUTCFullYear()) >= new Date(new Date().toLocaleDateString('en-US')));
    }
}
