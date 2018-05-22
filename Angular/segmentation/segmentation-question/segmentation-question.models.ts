
export class SegmentationQuestionModel {
    questionText: string;
    leastId: string;
    bestId: string;
    options: SegmentationQuestionOptions[];
}
export class SegmentationQuestionOptions {
    text: string;
    value: number;
}
export class PageText {
    requiredMessage: string;
    bothSelectedMessage: string;
    btnNextText: string;
}