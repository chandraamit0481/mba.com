export class PracticeQuestionDataModel {
    questionID: string;
    questionTypeCodeID: string;
    questionText: string;
    questionParagraph: string;
    questionStem: string;
    explanationText: string;
    correctQuestionOptionindex: string;
    questionOptionList: QuestionOption[];
}

export class QuestionOption {
    rowNum: string;
    questionOptionText: string;
}

export class PracticeQuestionRequest {
    QuestionID: string;
    SelectedOptionIndex: string;
    identityId: string;
}

export class PracticeQuestionResponse {
    isCorrectAnswered: boolean;
    questionResponseText: string;
    optionSelectedIndex: string;
    explanationText: string;
    responseStatusCode: number;
    isValidResponse: boolean;
}