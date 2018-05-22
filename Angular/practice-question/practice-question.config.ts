import { Injectable } from "@angular/core";
import { BaseConfig } from "../shared/config/base.config";

@Injectable()
export class PracticeQuestionConfig extends BaseConfig {
    config = {
        allPracticeQuestionConfig: {
            method: "random-practice-question",
            otherParams: ["pageSize", "page"],
            pageSize: "1",
            page: "1"
        },

        savePracticeAnswerConfig: {
            post: {
                method: "practice-questions-responses",
                dataField: "practice-questions-responses",
                fields: ["identityID", "questionID", "selectedOptionIndex"],
                identityID: 0,
                questionID: 0,
                selectedOptionIndex: 0
            }
        },
        practiceConstantConfig: {
            practiceQuestionControl: 'practiceAnswers',
            keyGetPracticeQuestion: 'allPracticeQuestionConfig',
            keySavePracticeQuestion: 'savePracticeAnswerConfig',
            msgPracticeQuestionValidation: 'Please select one of the answer choices above to see the answer.',
            msgError: "Some error occured."
        }
    };
}