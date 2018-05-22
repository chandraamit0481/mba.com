import { CandidateProfileModel, AccommodationText } from "../models/candidate-profile.models";
import { CountryModel } from "../models/country-model";
import * as CryptoJS from 'crypto-js';
import { CandidateProfileSitecoreModel } from "../models/candidate-profile-sitecore.models";
import { ProfileProgressSettings } from "../models/profile-pogress-settings";

export class SiteCoreConfig {

    boostedId: string;
    relatedProduct: string;
    itemId: string;
    topicTags: string;
    schoolTags: string;
    programTags: string;
    regionTags: string;
    countryTags: string;
    notificationMessage: string;
    ispIP: string;
    otherVideoImgUrl: string;
    countryName: string;
    socialIconList: string;
    title: string;
    eventId: string;
    candidateProfileUrl: string;    
    id: string;      
    apiUrl: string;
    mbaAppID: string;
    currentAccount: CandidateProfileModel;
    preferredCountry: CountryModel;    
    pvueProfileUrl: string;    
    disclaimer: string;
    total: number;
    ocpStoreId: string;
    currentLocation: string;
    identityId: string;
    profilePageUrl: string;
    aboutText: string;
    aboutTextLabel: string;
    SFNotificationText: string;
    columnData: string;    
    assessments: string;
    askNetControllerUrl: string;    
    registrationUrl: string;
    apiKey: string;
    googleApiKey: string;
    baiduApiKey: string;
    siteLogoImage: string;
    ipAddress: string;
    contactUsUrl: string;
    noProductAvailable: string;
    irPrepContactUs: string;
    irPrepBuyNow: string;
    irPrepSignIn: string;
    sfAnalyticsUrl: string;    
    signUpUrl: string;
    ocpFaqUrl: string;
    ocpContactUsUrl: string;
    ocpAccountUrl: string;
    userAccessKeyRenewal: string;
    userAccessKeyTimeOut: string;
    loginPageUrl: string;
    cmServer: string;
    socialMediaHeader: string;
    showGmatPrepLink: boolean;
    gmatPrepProductSkus: string;
    programRollingAdmissionsText: string;
    newAppointmentStatus: string;
    accommodationText: AccommodationText;
    gmatPrepSsoRedirectLink: string;
    serviceTimeout: number;
    profileProgressSettings: ProfileProgressSettings;
    candidateProfileLabels: CandidateProfileSitecoreModel;
    allowedScoreCancelTimeFrame: string;
    constructor() {
        this.currentAccount = new CandidateProfileModel();
        if (window["siteCoreConfig"]) {
            for (let prop in window["siteCoreConfig"]) {
                if (prop === "currentAccount") {
                    let encryptionKey = window["siteCoreConfig"]["apiKey"];
                    if (encryptionKey) {
                        encryptionKey = encryptionKey.substr(0, 16);
                        let key = CryptoJS.enc.Utf8.parse(encryptionKey);
                        let iv = CryptoJS.enc.Utf8.parse(encryptionKey);

                        let decrypted = CryptoJS.AES.decrypt(window["siteCoreConfig"][prop], key, {
                            keySize: 128 / 8,
                            iv: iv,
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        this.currentAccount = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                    }

                } else {
                    this[prop] = window["siteCoreConfig"][prop];
                }
            }
        }
    }

}