import { AddressModel } from "../../shared/models/common.models";

export class ProgramsModel {

    programName: string;
    programDuration: string;
    schoolName: string;
    schoolUniversity: string;
    schoolLocation: AddressModel;
    schoolUrl: string;
    programOrgID: number;
    programUrl: string;
    savedProgramID: number;
    institutionName: string;

    constructor() {
        this.schoolLocation = new AddressModel();
    }
}