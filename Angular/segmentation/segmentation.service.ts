import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../shared/services/base.service';
import { SegmentationHomeModel, SegmentationResult } from './segmentation.models';
import { HttpService } from '../shared/services/http.service';
import { SegmentationQuestionModel, SegmentationQuestionOptions } from './segmentation-question/segmentation-question.models';
import { htmlDecode } from 'js-htmlencode';
import { CookieService } from 'ngx-cookie';
import { ResponseModel } from '../shared/models/response.model';
import { Response } from '@angular/http';
@Injectable()
export class SegmentationService extends BaseService {
    private model: SegmentationHomeModel;

    constructor(private http: HttpService, private cookieService: CookieService) {
        super();
    }

    getSegmentHome(config: any): Observable<SegmentationHomeModel> {
        return this.http.getData(config).map(response => {
            return this.processHome(response);
        });
    }

    getSegmentQuestions(config: any): Observable<SegmentationQuestionModel[]> {
        return this.http.getData(config).map(response => {
            return this.processQuestions(response);
        });
    }

    postSegment(config): Observable<SegmentationResult> {
        return this.http.post(config).map(response => {
            let status = (<Response>response).status;
            response = (<Response>response).json();
            let model = <SegmentationResult>{};
            if (this.hasResults(response, "segmentation") && status === 200) {
                let fields = (<ResponseModel<any>>response).data[0].segmentation[0].fields;
                model.dominantType = this.getValue(fields.dominantType);
                model.dominantTypeId = this.getIntValue(fields.dominantTypeId);
                model.resultImageAltText = this.getValue(fields.resultImageAltText);
                model.resultImageUrl = this.getValue(fields.resultImageUrl);
                model.resultText = this.getValue(fields.resultText);
                //Saved the dominantType in cookie
                this.cookieService.put("typingToolSegmentCookie", JSON.stringify({ dominantType: model.dominantType, dominantTypeId: model.dominantTypeId, dateTime: new Date() }));
            } else {
                model = null;
            }
            return model;
        });
    }

    private processHome(response): SegmentationHomeModel {
        let model = <SegmentationHomeModel>{};
        if (this.hasResults(response)) {
            let fields = response.data[0].searchResults[0].fields;
            model.btnNextText = this.getValue(fields.nextButtonText);
            model.invalidEmailText = this.getValue(fields.invalidEmailAddressText);
            model.emailCollectionTitle = this.getValue(fields.emailCollectionTitle);
            model.finalTitle = this.getValue(fields.finalTitle);
            model.emailCollectionMessage = this.getValue(fields.emailCollectionMessage);

            if (fields.welcomeImages && fields.welcomeImages.length) {
                let rndNumber = Math.floor(Math.random() * fields.welcomeImages.length);
                model.welcomeImageUrl = this.getValue(fields.welcomeImages[rndNumber].welcomeImagesUrl);
            }

            model.selectBothText = this.getValue(fields.selectBothText);
            model.completedMessage = this.getValue(fields.completedMessage);
            model.questionTitle = this.getValue(fields.questionTitle);
            model.finalMessage = this.getValue(fields.finalMessage);
            model.welcomeTitle = this.getValue(fields.welcomeTitle);
            model.processingError = this.getValue(fields.errorInProcessingDataText);
            model.btnSubmitText = this.getValue(fields.submitButtonText);
            model.processingText = this.getValue(fields.processingDataText);
            model.consentMessage = this.getValue(fields.consentRequiredMessage);
            model.welcomeMessage = this.getValue(fields.welcomeMessage);
            model.emailConsentText = htmlDecode(this.getValue(fields.emailCollectionConsentText));
            model.selectDifferentText = this.getValue(fields.selectDifferentText);
            model.logoImage = this.getValue(fields.logoImageUrl);
        }
        return model;
    }

    private processQuestions(response): SegmentationQuestionModel[] {
        let retModel = <SegmentationQuestionModel[]>[];
        const key: string = "group";
        if (this.hasResults(response)) {
            let searchResults = response.data[0].searchResults;
            for (let searchData of searchResults) {
                let fields = searchData.fields;
                let model = <SegmentationQuestionModel>{};
                model.questionText = this.getValue(fields.questionText);
                model.bestId = this.getValue(fields.bestId).replace(key, "v");
                model.leastId = this.getValue(fields.leastId).replace(key, "v");
                model.options = <SegmentationQuestionOptions[]>[];
                let hasOptions = true;
                let indx = 1;
                do {
                    let textKey = "text" + indx;
                    let valueKey = "value" + indx;
                    if (fields[textKey]) {
                        let option = <SegmentationQuestionOptions>{};
                        option.text = this.getValue(fields[textKey]);
                        option.value = this.getIntValue(fields[valueKey]);
                        model.options.push(option);
                    } else {
                        hasOptions = false;
                    }
                    indx++;
                }
                while (hasOptions);
                retModel.push(model);
            }
        }
        return retModel;
    }
}