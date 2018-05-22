export interface ResponseModel<T> {
    envelope?: any;
    data?: T;
    httpStatusCode: number;
    isSuccessStatusCode: boolean;
    content: any;
    headers: any;
    // few more fields would be added later.
}
// Temporary interface just for testing purpose need to romove later.
export interface EmpData {
    Name: string;
    ID: number;
}

export class Article {
    title: string;
    body: string;
}

export interface ResponseObject<T> {
    envelope?: any; //needs to define envelope interface later.
    data?: T[];
    results?: T[];
    httpStatusCode: number;
    isSuccessStatusCode: boolean;
    content: any;
    headers: any;
    status: string;
    // few more fields would be added later.
}