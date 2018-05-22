import { Injectable } from "@angular/core";

@Injectable()
export class BaseConfig {
    config = {};

    getConfiguration(key: string) {
        return this.config[key];
    }

    getPostConfiguration(key: string) {
        let config = this.getConfiguration(key);
        return config && config.post;
    }
}