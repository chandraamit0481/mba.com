import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from "../../shared/services/http.service";
import { ProgramsModel } from "./programs.models";
import { SiteCoreConfig } from "../../shared/config/sitecore.config";
import { BaseService } from "../../shared/services/base.service";
import 'rxjs/add/operator/mergemap';
import { OperatorsEnum } from '../../shared/enums/operators.enum';
import { AddressModel } from '../../shared/models/common.models';

@Injectable()
export class ProgramsService extends BaseService {
    constructor(private http: HttpService) {
        super();
    }

    getPrograms(configObject, progMatchConfigObject, progServiceConfig): Observable<ProgramsModel[]> {
        return this.http.getData(configObject).mergeMap(response => {
            let model: ProgramsModel[] = <ProgramsModel[]>[];
            if (this.hasResults(response, "saved-programs")) {
                response.data[0]["saved-programs"].map(prog => {
                    let modelItem: ProgramsModel = <ProgramsModel>{};
                    if (prog) {
                        modelItem.programOrgID = prog.fields && this.getIntValue(prog.fields.ProgramOrgID);
                        modelItem.savedProgramID = this.getIntValue(prog.id);
                        model.push(modelItem);
                    }
                });
                let progId = OperatorsEnum.In + " " + model.map(i => i.programOrgID).join(",");
                progMatchConfigObject.programId = progId;
                progServiceConfig.programOrgId = progId;
                let promiseArray = [];
                promiseArray.push(this.http.getData(progServiceConfig));
                promiseArray.push(this.http.getData(progMatchConfigObject));
                return Observable.forkJoin(promiseArray).map(programData => {
                    return this.processResponse(programData, model);
                });
            } else {
                return Observable.of(null);
            }
        });
    }

    removeProgram(savedProgramId: number, config): Observable<any> {
        config.id = savedProgramId;
        return this.http.delete(config);
    }

    processResponse(programData, model: ProgramsModel[]): ProgramsModel[] {
        let retModel = <ProgramsModel[]>[];
        let programKey = "programs";        
        if (programData && programData.length > 0 && this.hasResults(programData[0], programKey)) {
            for (let searchResult of <[any]>programData[0].data[0][programKey]) {
                if (searchResult.fields) {                    
                    let serviceData = searchResult.fields;
                    let programOrgID = this.getIntValue(searchResult.id);
                    let selectedItem = model.filter(m => m.programOrgID === programOrgID);
                    if (selectedItem && selectedItem.length) {
                    let item = selectedItem[0];
                    item.programName = this.getValue(serviceData.programDisplayName);
                    item.programDuration = this.getValue(serviceData.programLengthIdLookupName);
                    item.schoolLocation = new AddressModel();
                    item.schoolLocation.address1 = this.getValue(serviceData.programAddressLine1);
                    item.schoolLocation.address2 = this.getValue(serviceData.programAddressLine2);
                    item.schoolLocation.address3 = this.getValue(serviceData.programAddressLine3);
                    item.schoolLocation.city = this.getValue(serviceData.programCity);
                    item.schoolLocation.state = this.getValue(serviceData.programStateProvinceName);
                    item.schoolLocation.postalCode = this.getValue(serviceData.programPostalCode);
                    item.schoolLocation.country = this.getValue(serviceData.programCountryIdLookupName);

                    if (searchResult.relatedEntities) {
                        let relatedEntity = searchResult.relatedEntities;
                        if (relatedEntity && relatedEntity.schools && relatedEntity.schools.length > 0 && relatedEntity.schools[0].fields) {
                            item.schoolName = this.getValue(relatedEntity.schools[0].fields.schoolName);
                        }
                    }
                    
                    if (this.hasResults(programData[1])) {
                        let matchItem = programData[1].data[0].searchResults.filter(s => s.fields && this.getIntValue(s.fields.programId) === programOrgID);                        
                        if (matchItem && matchItem.length > 0 && matchItem[0].fields) {
                           
                            let matchFields = matchItem[0].fields;
                            item.programUrl = this.getValue(matchFields.itemUrl);
                            item.schoolUrl = this.getValue(matchFields.schoolUrl);
                            item.schoolUniversity = this.getValue(matchFields.programInstitutionName);
                        }
                    }
                }

            }
        }

            retModel = model;
        }
        return retModel;
    }
}