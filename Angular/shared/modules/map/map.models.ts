export interface IGeometry {
    location: ILocation;
}
export interface ILocation {
    lat: number;
    lng: number;
}
export interface IResults {
    formatted_address: string;
    geometry: IGeometry;
    results: IResults[];
    status: string;
}
export interface IGeoData {
    table: string;
    data: IGeoLocation[];
}

export interface IGeoLocation {
    CountryID: IValue;
    countryName: IValue;
    regionID: IValue;
    regionName: IValue;
}

export interface IValue {
    value: string;
}
export interface IApiKeys {
    googleApiKey: string;
    baiduApiKey: string;
}