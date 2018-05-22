import { Component, OnInit } from "@angular/core";
import { SiteCoreConfig } from "../shared/config/sitecore.config";
import { Base } from "../shared/models/common.models";
import { SegmentationService } from "./segmentation.service";
import { SegmentationConfig } from "./segmentation.config";
import { SegmentationHomeModel, SegmentationResult } from "./segmentation.models";
import { SegmentationQuestionModel, PageText } from "./segmentation-question/segmentation-question.models";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import { SegmentationTypeEnum } from "./segmentation.enum";
require("url-polyfill");
@Component({
    selector: "segmentation",
    templateUrl: './segmentation.component.html'
})

export class SegmentationComponent extends Base implements OnInit {
    homeModel: SegmentationHomeModel;
    questionModel: SegmentationQuestionModel;
    currentQuestionNumber: number = 0;
    maxQuestionNumber: number;
    segmentForm: FormGroup;
    segmentType: SegmentationTypeEnum;
    segmentationEnum: typeof SegmentationTypeEnum = SegmentationTypeEnum;
    questionPageText: PageText;
    segmentationResult: SegmentationResult;
    private saveModel: any;
    private saveConfig: any;
    private errorMessage: string;
    private consentCtrl: FormControl;
    private emailCtrl: FormControl;
    private questionsModel: SegmentationQuestionModel[];
    constructor(private sitecoreConfig: SiteCoreConfig, private service: SegmentationService, private config: SegmentationConfig, private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        let configObj = this.config.getConfiguration("home");
        this.saveConfig = this.config.getConfiguration("save").post;
        this.segmentType = SegmentationTypeEnum.Home;
        this.isLoading = true;
        this.service.getSegmentHome(configObj).subscribe(model => {
            this.homeModel = model;
            this.isLoading = false;
        }, () => { this.isLoading = false; });

        this.segmentForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            consent: [true, this.validateConsent()]
        });

        this.consentCtrl = <FormControl>this.segmentForm.get('consent');
        this.emailCtrl = <FormControl>this.segmentForm.get('email');

        this.consentCtrl.valueChanges.subscribe(value => {
            this.setErrorMessage(false);
        });

        this.emailCtrl.valueChanges.debounceTime(1000).subscribe(value => {
            this.setErrorMessage(false);
        });

    }


    homeNextClick(): void {

        let configObj = this.config.getConfiguration("questions");

        if (this.homeModel) {
            this.questionPageText = <PageText>{};
            this.questionPageText.bothSelectedMessage = this.homeModel.selectDifferentText;
            this.questionPageText.requiredMessage = this.homeModel.selectBothText;
            this.questionPageText.btnNextText = this.homeModel.btnNextText;
        }
        this.isLoading = true;
        this.service.getSegmentQuestions(configObj).subscribe(model => {
            this.questionsModel = model;
            this.maxQuestionNumber = model.length;
            this.nextQuestion(null);
            this.segmentType = SegmentationTypeEnum.Questions;
            this.isLoading = false;
        }, () => { this.isLoading = false; });
    }

    nextQuestion(returnValue): void {
        if (this.currentQuestionNumber < this.maxQuestionNumber) {
            this.questionModel = this.questionsModel[this.currentQuestionNumber];
            this.currentQuestionNumber++;
        } else if (this.currentQuestionNumber === this.maxQuestionNumber) {
            this.segmentType = SegmentationTypeEnum.Email;
        }
        if (returnValue) {
            Object.keys(returnValue).forEach(item => {
                this.saveConfig.responses.fields.push(item);
                this.saveConfig.responses[item] = returnValue[item];
            });
        }
    }

    save(): void {
        if (this.segmentForm.valid) {

            let formValue = this.segmentForm.value;
            Object.keys(formValue).map(key => {
                this.saveConfig[key] = formValue[key];
            });
            this.saveConfig.ipAddress = this.sitecoreConfig.ipAddress;
            this.saveConfig.identityID = null;
            if (this.sitecoreConfig.currentAccount && this.sitecoreConfig.currentAccount.identityID) {
                this.saveConfig.identityID = this.sitecoreConfig.currentAccount.identityID;
            }
            let url = new URL(window.location.href);
            let source = url.searchParams.get("utm_source");
            if (source) {
                this.saveConfig.source = source;
            }
            this.isLoading = true;
            this.service.postSegment(this.saveConfig).subscribe(response => {
                if (response) {
                    this.segmentType = SegmentationTypeEnum.Results;
                    this.segmentationResult = response;
                }
                this.isLoading = false;
            }, err => {
                    this.isLoading = false;
                    this.errored = true;
                }
            );
        } else {
            this.setErrorMessage(true);
        }
    }
    private validateConsent(): ValidatorFn {
        return (ctrl: AbstractControl): { [key: string]: boolean } | null => {
            if (ctrl.dirty && !ctrl.value) {
                return { 'required': true };
            }
            return null;
        };
    }

    private setErrorMessage(isSubmit: boolean): void {
        this.errorMessage = '';
        if ((this.emailCtrl.touched || this.emailCtrl.dirty || isSubmit) && this.emailCtrl.errors) {
            this.errorMessage = this.homeModel.invalidEmailText;
        } else if ((this.consentCtrl.touched || this.consentCtrl.dirty || isSubmit) && this.consentCtrl.errors) {
            this.errorMessage = this.homeModel.consentMessage;
        }
    }
}
