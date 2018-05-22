export interface ILookupModel {
    id: string;
    value: string;
    checked: boolean;
}

export class ResultSetModel {
    totalRows: number;
    sourceList: ILookupModel[];
}


export class PostSearchMongoDBData {
    keyword: string;
    selectedItem: string;
    records: string;
    date: Date;
    identityId: string;
    userName: string;
}