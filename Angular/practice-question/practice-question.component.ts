import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { PracticeQuestiontService } from "./practice-question.service";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { PracticeQuestionConfig } from "./practice-question.config";
import { PracticeQuestionDataModel, PracticeQuestionResponse } from "./practice-question.model";
import { SafeHtmlPipe } from "../shared/pipes/safe-html";
import { Base } from "../shared/models/common.models";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { FormValidateModel } from "../shared/models/form-validate.model";
@Component({
    selector: 'practice-question',
    templateUrl: './practice-question.component.html'
})

export class PracticeQuestionComponent extends Base implements OnInit {
    practiceQuestion: PracticeQuestionDataModel;
    practiceQuestionForm: FormGroup;
    questionResponse: PracticeQuestionResponse;
    practiceConstant: any;
    isSubmitted: boolean;
    constructor(private practiceQuestiontService: PracticeQuestiontService, private siteCoreConfig: SiteCoreConfig, private practiceQuestionConfig: PracticeQuestionConfig) { super(); }

    ngOnInit(): void {
        this.isLoading = true;
        this.isSubmitted = false;
        this.practiceConstant = this.practiceQuestionConfig.getConfiguration("practiceConstantConfig");
        let configObject = this.practiceQuestionConfig.getConfiguration(this.practiceConstant.keyGetPracticeQuestion);
        this.createForm();
        this.practiceQuestiontService.getPracticeQuestion(configObject).subscribe(response => {
            this.practiceQuestion = response;
            if (this.practiceQuestion && this.practiceQuestion.questionOptionList && this.practiceQuestion.questionOptionList.length) {
                for (let i = 0; i < this.practiceQuestion.questionOptionList.length; i++) {
                    (<FormArray>this.practiceQuestionForm.controls[this.practiceConstant.practiceQuestionControl]).push(new FormControl(''));
                }
                this.practiceQuestionForm.controls[this.practiceConstant.practiceQuestionControl].setValidators([this.answerValidation]);
                this.practiceQuestionForm.controls[this.practiceConstant.practiceQuestionControl].updateValueAndValidity();
            }
            this.isLoading = false;
        },
            () => { this.isLoading = false; });
    }

    private submitPracticeAnswer(): void {
        if (this.practiceQuestionForm.valid) {
            let isAnswerChecked: boolean = false;
            let answerCtrl: FormArray = <FormArray>this.practiceQuestionForm.controls[this.practiceConstant.practiceQuestionControl];
            if (answerCtrl && answerCtrl.controls && answerCtrl.controls.length > 0) {

                answerCtrl.controls.forEach((ctrl, indx) => {
                    if (ctrl.value) {
                        let config = this.practiceQuestionConfig.getPostConfiguration(this.practiceConstant.keySavePracticeQuestion);
                        config.identityID = this.siteCoreConfig.currentAccount.identityID;
                        config.questionID = this.practiceQuestion.questionID;
                        config.selectedOptionIndex = indx.toString();
                        this.practiceQuestiontService.savePracticeQuestionAnswer(config).subscribe(response => {
                            this.isSubmitted = true;
                            this.proceesResponse(response);
                        },
                            () => { this.isLoading = false; });
                    }
                });
            }
        } else {
            this.practiceQuestionForm.controls[this.practiceConstant.practiceQuestionControl].markAsDirty();
        }
    }

    private createForm(): void {
        this.practiceQuestionForm = new FormGroup({
            practiceAnswers: new FormArray([])
        });
    }

    private answerValidation(frmOptionControl): FormValidateModel {
        let isvalid = false;
        for (let optionIndex = 0; optionIndex < frmOptionControl.controls.length; optionIndex++) {
            isvalid = frmOptionControl.controls[optionIndex]._value ? true : false;
            if (isvalid)
                break;
        }
        return (isvalid ? null : <FormValidateModel>{ isFailed: true });
    }

    private proceesResponse(practiceQuestionResponse: PracticeQuestionResponse): void {
        practiceQuestionResponse.explanationText = this.practiceQuestion.explanationText;
        practiceQuestionResponse.isCorrectAnswered = (Number(this.practiceQuestion.correctQuestionOptionindex) === Number(practiceQuestionResponse.optionSelectedIndex) + 1);
        practiceQuestionResponse.isValidResponse = practiceQuestionResponse && practiceQuestionResponse.responseStatusCode === 201;
        this.questionResponse = practiceQuestionResponse;
    }
}

