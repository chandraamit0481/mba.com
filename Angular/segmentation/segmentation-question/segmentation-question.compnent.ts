import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output, AfterViewChecked } from "@angular/core";
import { Base } from "../../shared/models/common.models";
import { SegmentationQuestionModel, PageText } from "./segmentation-question.models";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";


@Component({
    selector: "segmentation-question",
    templateUrl: './segmentation-question.component.html'
})

export class SegmentationQuestionComponent extends Base implements OnInit, OnChanges, AfterViewChecked {

    @Input() model: SegmentationQuestionModel;
    @Input() pageText: PageText;
    @Output() nextQuestion: EventEmitter<{ [key: string]: number }> = new EventEmitter<{ [key: string]: number }>();
    segmentForm: FormGroup;
    errorMessage: string;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && !changes['model'].firstChange) {
            this.createForm();
        }
    }

    ngOnInit(): void {
        this.createForm();
    }

    ngAfterViewChecked(): void {
        this.segmentForm.validator = this.validateQuestions(this.model.leastId, this.model.bestId);
    }

    save(): void {
        this.errorMessage = "";
        if (this.segmentForm.valid) {
            this.nextQuestion.emit(this.segmentForm.value);
        } else if (this.segmentForm.errors && this.segmentForm.errors.sameOption) {
            this.errorMessage = this.pageText.bothSelectedMessage;
        } else {
            this.errorMessage = this.pageText.requiredMessage;
        }

    }

    private createForm(): void {
        this.segmentForm = this.fb.group({
            [this.model.bestId]: ['', [Validators.required]],
            [this.model.leastId]: ['', [Validators.required]]
        });
    }

    private validateQuestions(leastGroupName, bestGroupName): ValidatorFn {
        return (ctrl: AbstractControl): { [key: string]: boolean } | null => {
            let leastCtrl = ctrl.get(leastGroupName);
            let bestCtrl = ctrl.get(bestGroupName);
            this.errorMessage = "";
            if (leastCtrl.value && bestCtrl.value && leastCtrl.value === bestCtrl.value) {
                this.errorMessage = this.pageText.bothSelectedMessage;
                return { 'sameOption': true };
            }
            return null;
        };
    }
}
