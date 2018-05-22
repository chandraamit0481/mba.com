import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpService } from "../shared/services/http.service";
import { BaseService } from "../shared/services/base.service";
import { PracticeQuestionDataModel, QuestionOption, PracticeQuestionResponse } from "./practice-question.model";
import { practiceQuestionMockData } from "../test-mock-up/practice-question-mock";
import { Response } from '@angular/http';
@Injectable()
export class PracticeQuestiontService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getPracticeQuestion(config): Observable<PracticeQuestionDataModel> {
        return this.http.getData(config)
            .map(response => {
                let practiceQuestion = new PracticeQuestionDataModel();
                let questionOptList: QuestionOption[] = [];
                if (this.hasResults(response, "TeasersQuestion")) {
                    response.data[0].TeasersQuestion.map(item => {
                        let questionItem: any = item;
                        let questionData: any = item.fields;
                        if (questionData) {
                            practiceQuestion.questionID = this.getValue(questionItem.id);
                            practiceQuestion.questionTypeCodeID = this.getValue(questionData.questionTypeCodeID);
                            practiceQuestion.questionText = this.getValue(questionData.questionStem);
                            practiceQuestion.questionParagraph = this.getValue(questionData.questionText);
                            practiceQuestion.explanationText = this.getValue(questionData.explanationText);
                            practiceQuestion.correctQuestionOptionindex = this.getValue(questionData.correctQuestionOptionIndex);
                            let questionOption = new QuestionOption();
                            questionOption.rowNum = this.getValue(questionItem.rowNum);
                            questionOption.questionOptionText = this.getValue(questionData.questionOptionText);
                            questionOptList.push(questionOption);
                        }
                    });
                    practiceQuestion.questionOptionList = questionOptList;
                }
                return practiceQuestion;
            });
    }

    savePracticeQuestionAnswer(config): Observable<PracticeQuestionResponse> {
        return this.http.post(config)
            .map(response => {
                let practiceQuestionResponse = <PracticeQuestionResponse>{};
                if (response) {
                    response = <Response>response;
                    practiceQuestionResponse.responseStatusCode = response.status;
                    practiceQuestionResponse.optionSelectedIndex = config.selectedOptionIndex;
                }
                return practiceQuestionResponse;
            });
    }
}