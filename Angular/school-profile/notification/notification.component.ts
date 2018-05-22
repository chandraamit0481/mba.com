import { Component } from '@angular/core';
import { SiteCoreConfig } from "../../shared/config/sitecore.config";

@Component({
    selector: "notification",
    templateUrl: "./notification.component.html"
})

export class NotificationMessageComponent {
    message: string;
    showNotification: boolean = true;

    constructor(private siteCoreConfig: SiteCoreConfig) {
        this.message = this.siteCoreConfig.notificationMessage;
        if ((this.siteCoreConfig && this.siteCoreConfig.currentAccount && this.siteCoreConfig.currentAccount.identityID) ||
            sessionStorage.getItem("hideNotification") === 'true') {
            this.showNotification = false;
        }
    }

    saveInCookie() {
        sessionStorage.setItem("hideNotification", "true");
    }

    registerNow() {
        location.href = this.siteCoreConfig.signUpUrl;
    }

}