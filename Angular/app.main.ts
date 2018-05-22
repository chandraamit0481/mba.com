import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from "@angular/core";

export class AppBootstrap {
    static bootstrapModule(module): void {
        if (process.env.NODE_ENV === "production") {
            enableProdMode();
        }
        platformBrowserDynamic().bootstrapModule(module);
    }
}