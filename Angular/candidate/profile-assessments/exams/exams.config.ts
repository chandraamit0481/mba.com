import { Injectable } from "@angular/core";
import { BaseConfig } from "../../../shared/config/base.config";

@Injectable()
export class ExamsConfig extends BaseConfig {
    config = {
        officialScoreReportKey: {
            method: "official-score-report-key",
            filters: ["candidateID", "registrationID"]                
        },
        productPurchase: {
            method: "product-purchases",
            filters: ["identityID"]   

        },
        license : {
            method: "license",
            filters: ["licenseKey"]   
        },
        applyCode: {
            post: {
                method: "coordination/esr-activation",
                dataField: "esractivation",
                fields: ["appointmentID", "licenseKey", "identityID"],
                confirmationMessage: "You are activating key '{0}' for appointment ID {1}. Please note: your key can be applied to only one exam.",
                alertMessage:"No key was entered. Please enter a license key in the text box."
            }
        },
        reportActivation: {
            post: {
                method: "coordination/esr-getlink",
                dataField: "esrgetlink",
                fields: ["appointmentID", "identityID"]
            }
        },
        pageMessage: {
            sucessMessage: "An email with the link to your Enhanced score report has been sent to {0}."
        }


    };
}