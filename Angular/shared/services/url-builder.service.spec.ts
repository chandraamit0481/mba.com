import { TestBed, inject } from '@angular/core/testing';
import { UrlBuilderService } from './url-builder.service';
import { OperatorsEnum } from '../enums/operators.enum';
import { SiteCoreConfig } from '../config/sitecore.config';
import { PostModel } from '../models/common.models';
import { CookieService, CookieModule } from 'ngx-cookie';
import { Injector } from '@angular/core';

describe('UrlBuilderService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CookieModule.forRoot()
            ],
            providers: [
                CookieService,
                UrlBuilderService,
                SiteCoreConfig
            ]
        });
    });

    describe('Test UrlBuilderService', () => {
        let urlBuilderService: UrlBuilderService;
        let config: any;
        beforeEach(inject([UrlBuilderService], (service: UrlBuilderService) => {
            urlBuilderService = service;
        }));

        it('should return blank when config is null', () => {
            config = null;
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('').toEqual(actualResult);
        });
        it('should return URL having id appended when method and id are not blank', () => {
            config = { id: 10000, method: 'appointments' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?').toEqual(actualResult);
        });

        it('should return blank when method is not passed in config', () => {
            config = { id: 10000 };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('').toEqual(actualResult);
        });

        it('should return url having method name only when id is not passed', () => {
            config = { method: 'appointments' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments?').toEqual(actualResult);
        });

        it('should return blank when method and id are passed as blank', () => {
            config = { id: '', method: '' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('').toEqual(actualResult);
        });

        it('should not include filters in URL when it is not passed', () => {
            config = { id: 10000, method: 'appointments', filters: [] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?').toEqual(actualResult);
        });

        it('should not include filters in URL when it is passed as blank', () => {
            config = { id: 10000, method: 'appointments', filters: [''] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?').toEqual(actualResult);
        });

        it('should include only one filter in URL when only one filter is passed in filters array', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId'], identityId: "43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId eq 43976543').toEqual(actualResult);
        });

        it('should include all filters in URL when all filter is passed in filters array', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: "43976543", eventRecruitingCalendarID: "13456" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId eq 43976543 and eventRecruitingCalendarID eq 13456').toEqual(actualResult);
        });

        it('should include those filters which are defined in config as an attribute', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: "43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId eq 43976543').toEqual(actualResult);
        });

        it('should include operator > in a filter parameter', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: OperatorsEnum.GreaterThan + " 43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId gt 43976543').toEqual(actualResult);
        });
        it('should include operator < in a filter parameter', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: OperatorsEnum.LessThan + " 43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId lt 43976543').toEqual(actualResult);
        });
        it('should include operator ! in a filter parameter', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: OperatorsEnum.NotEqualTo + " 43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId nteq 43976543').toEqual(actualResult);
        });

        it('should include operator = in a filter parameter', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: OperatorsEnum.Equal + " 43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId eq 43976543').toEqual(actualResult);
        });

        it('should include operator IN in a filter parameter', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: OperatorsEnum.In + " 43976543,112345" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId in 43976543,112345').toEqual(actualResult);
        });

        it('should include single filters for Solar request when single filter is passed', () => {
            config = { id: 10000, method: 'programmatches', filters: ['identityId'], identityId: "43976543" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?filter=identityId eq 43976543').toEqual(actualResult);
        });

        it('should include multiple filters for Solar request when multiple filter is passed', () => {
            config = { id: 10000, method: 'programmatches', filters: ['identityId', 'eventRecruitingCalendarID'], identityId: "43976543", eventRecruitingCalendarID: "13456" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?filter=identityId eq 43976543 and eventRecruitingCalendarID eq 13456').toEqual(actualResult);
        });

        it('should include no filters for Solar request when filter items are not defined in config property', () => {
            config = { id: 10000, method: 'programmatches', filters: ['identityId', 'eventRecruitingCalendarID'] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?').toEqual(actualResult);
        });

        it('should include single query attribute for solar request when single query is passed', () => {
            config = { id: 10000, method: 'programmatches', queries: ['country'], country: "india" };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?query=country eq india').toEqual(actualResult);
        });
        it('should include multiple query attribute  when multiple query is passed in config', () => {
            config = { id: 10000, method: 'programmatches', queries: ['country', 'yearsWorkExperience'], country: "india", yearsWorkExperience: '10' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?query=country eq india and yearsWorkExperience eq 10').toEqual(actualResult);
        });

        it('should include mbaAppID in query string when it is passed in config parameter', () => {
            config = { id: 10000, method: 'programmatches', mbaAppID: '198799777', otherParams: ["mbaAppID"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?mbaAppID=198799777').toEqual(actualResult);
        });

        it('should include pageSize in query string when it is passed in config parameter', () => {
            config = { id: 10000, method: 'programmatches', pageSize: '10', otherParams: ["pageSize"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?pageSize=10').toEqual(actualResult);
        });

        it('should include [include] in query string when it is passed in config parameter', () => {
            config = { id: 10000, method: 'programmatches', include: 'ab,bc', otherParams: ["include"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?include=ab,bc').toEqual(actualResult);
        });

        it('should include [inclde] in query string when it is passed in config parameter with single values', () => {
            config = { id: 10000, method: 'programmatches', include: 'ab', otherParams: ["include"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?include=ab').toEqual(actualResult);
        });

        it('should include [exclude] in query string when it is passed in config parameter with multiple values', () => {
            config = { id: 10000, method: 'programmatches', exclude: 'ab,bc', otherParams: ["exclude"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?exclude=ab,bc').toEqual(actualResult);
        });

        it('should include [exclude] in query string when it is passed in config parameter with single values', () => {
            config = { id: 10000, method: 'programmatches', exclude: 'ab', otherParams: ["exclude"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?exclude=ab').toEqual(actualResult);
        });

        it('should include [sort] in query string when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', sort: 'ProgramDegreeId asc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?sort=ProgramDegreeId asc').toEqual(actualResult);
        });

        it('should include [field] in query string when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', fields: 'school' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?fields=school').toEqual(actualResult);
        });

        it('should include [pageSize] in query string when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', pageSize: '10', otherParams: ["pageSize"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?pageSize=10').toEqual(actualResult);
        });

        it('should include [page] in query string when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', page: '2', otherParams: ["page"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?page=2').toEqual(actualResult);
        });

        it('should include [page] in query string when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', page: '2', otherParams: ["page"] };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?page=2').toEqual(actualResult);
        });

        it('should include operator IN and ~ in a filter parameter, When IN is passed in one column and contains is passed in other column.Also include sort criteria when It is passed', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.In + " (43976543,112345)", programTypeId: OperatorsEnum.Contains + " 300", sort: 'ProgramDegreeId Asc and programCreatedDate desc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId in (43976543,112345) and programTypeId contains 300&sort=ProgramDegreeId Asc and programCreatedDate desc').toEqual(actualResult);

        });
        it('should include operator !in and ~ in a filter parameter, When ntin is passed in one column and contains is passed in other colum.Also include sort criteria when It is passed', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.NotIn + " (43976543,112345)", programTypeId: OperatorsEnum.Contains + " 300", sort: 'ProgramDegreeId asc and programCreatedDate desc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId ntin (43976543,112345) and programTypeId contains 300&sort=ProgramDegreeId asc and programCreatedDate desc').toEqual(actualResult);
        });

        it('should include operator >= filter parameter, When gteq is passed', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.GreaterThanOrEqualTo + " 43976543", programTypeId: OperatorsEnum.Contains + " 300", sort: 'ProgramDegreeId asc and programCreatedDate desc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId gteq 43976543 and programTypeId contains 300&sort=ProgramDegreeId asc and programCreatedDate desc').toEqual(actualResult);
        });
        it('should include operator != filter parameter, When != is passed', () => {
            config = { id: 10000, method: 'appointments', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.NotEqualTo + " 43976543", programTypeId: OperatorsEnum.Contains + " 300", sort: 'ProgramDegreeId asc and programCreatedDate desc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('appointments/10000?filter=identityId nteq 43976543 and programTypeId contains 300&sort=ProgramDegreeId asc and programCreatedDate desc').toEqual(actualResult);
        });

        it('should include [field] in query string, nteq in filters , contains in filters  when it is passed in config.', () => {
            config = { id: 10000, method: 'programmatches', fields: 'school,Program,Project', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.NotEqualTo + " 43976543", programTypeId: OperatorsEnum.Contains + ' 300', sort: 'ProgramDegreeId asc and programCreatedDate desc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?filter=identityId nteq 43976543 and programTypeId contains 300&sort=ProgramDegreeId asc and programCreatedDate desc&fields=school,Program,Project').toEqual(actualResult);
        });

        it('should include [field] in query string , PageSize and Page when it is passed in config', () => {
            config = { id: 10000, method: 'programmatches', fields: 'school,Program,Project', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.NotEqualTo + " 43976543", programTypeId: OperatorsEnum.Contains + ' 300', sort: 'ProgramDegreeId Asc and programCreatedDate desc', page: '1', pageSize: '100', otherParams: ["pageSize", "page", "event", "param"], event: 'abc', param: 'xyz' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?filter=identityId nteq 43976543 and programTypeId contains 300&sort=ProgramDegreeId Asc and programCreatedDate desc&fields=school,Program,Project&pageSize=100&page=1&event=abc&param=xyz').toEqual(actualResult);
        });

        it('should include only single parameter when otherParam has only one parameter', () => {
            config = { id: 10000, method: 'programmatches', fields: 'school,Program,Project', filters: ['identityId', 'programTypeId'], identityId: OperatorsEnum.NotEqualTo + " 43976543", programTypeId: OperatorsEnum.Contains + ' 300', sort: 'ProgramDegreeId Asc and programCreatedDate desc', page: '1', pageSize: '100', otherParams: ["pageSize", "page", "event"], event: 'abc' };
            let actualResult = urlBuilderService.getServiceUrl(config);
            expect('programmatches/10000?filter=identityId nteq 43976543 and programTypeId contains 300&sort=ProgramDegreeId Asc and programCreatedDate desc&fields=school,Program,Project&pageSize=100&page=1&event=abc').toEqual(actualResult);
        });

        it('should build correct object when dataField is given', () => {
            config = {
                method: "saved-events",
                dataField: "saved-events",
                fields: ["identityId", "eventRecruitingCalendarID"],
                identityId: 100,
                eventRecruitingCalendarID: 1000
            };
            let actualResult: PostModel = urlBuilderService.getPostModel(config);
            let expectedResult: PostModel = {
                data: [
                    {
                        "saved-events": [
                            {
                                fields: {
                                    identityId: {
                                        value: 100
                                    },
                                    eventRecruitingCalendarID: {
                                        value: 1000
                                    }
                                }
                            }
                        ]
                    }
                ],
                envelope: {}
            };
            expect(expectedResult).toEqual(actualResult);
        });

        it('should give empty data when dataField is not given', () => {
            config = {
                method: "saved-events",
                dataField: "",
                fields: ["identityId", "eventRecruitingCalendarID"],
                identityId: 100,
                eventRecruitingCalendarID: 1000
            };
            let actualResult: PostModel = urlBuilderService.getPostModel(config);
            let expectedResult: PostModel = {
                data: [],
                envelope: {}
            };
            expect(expectedResult).toEqual(actualResult);
        });

        it('should give empty data whenconfig is not defined', () => {
            config = {};
            let actualResult: PostModel = urlBuilderService.getPostModel(config);
            let expectedResult: PostModel = {
                data: [],
                envelope: {}
            };
            expect(expectedResult).toEqual(actualResult);
        });

        it('should give empty fields when field values are not defined', () => {
            config = {
                method: "saved-events",
                dataField: "saved-events",
                fields: ["identityId", "eventRecruitingCalendarID"],
            };
            let actualResult: PostModel = urlBuilderService.getPostModel(config);
            let expectedResult: PostModel = {
                data: [
                    {
                        "saved-events": [
                            {
                                fields: {
                                }
                            }
                        ]
                    }
                ],
                envelope: {}
            };
            expect(expectedResult).toEqual(actualResult);
        });

        it('should give empty fields when field array is empty', () => {
            config = {
                method: "saved-events",
                dataField: "saved-events",
                fields: [],
                identityId: 100,
                eventRecruitingCalendarID: 1000
            };
            let actualResult: PostModel = urlBuilderService.getPostModel(config);
            let expectedResult: PostModel = {
                data: [
                    {
                        "saved-events": [
                            {
                                fields: {
                                }
                            }
                        ]
                    }
                ],
                envelope: {}
            };
            expect(expectedResult).toEqual(actualResult);
        });
    });
});

