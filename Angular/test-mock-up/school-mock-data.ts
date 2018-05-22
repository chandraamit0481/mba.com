export const schoolMockData: string = `
{
    "envelope": {
        "totalRows": 1,
            "id": "2005796",
                "fields": "schoolName,schoolDisplayName,schoolLogo,schoolUniversity,schoolAvgScore,schoolStateProvinceIdLookupName,schoolCountryIdLookupName,schoolLogo",
                    "sort": "schoolName asc",
                        "pageSize": "100",
                            "page": "1",
                                "schoolOrgId": "2005796",
                                    "metadata": {
            "timming-Receiving Config ": "0.0003",
                "timming-Setting Provider Data ": "82.0986",
                    "timming-Receiving Data ": "82.1593",
                        "timming-End ": "268.9075"
        },
        "totalRowsReturned": "24",
            "validationWarnings": [
                "'fields' value not provided. Using default value: schoolName,schoolDisplayName,schoolLogo,schoolUniversity,schoolAvgScore,schoolStateProvinceIdLookupName,schoolCountryIdLookupName,schoolLogo.",
                "'sort' value not provided. Using default value: schoolName asc.",
                "'pageSize' value not provided. Using default value: 100.",
                "'page' value not provided. Using default value: 1."
            ]
    },
    "data": [
        {
            "schools": [
                {
                    "rowNum": {
                        "value": 1
                    },
                    "id": {
                        "value": 2005796
                    },
                    "fields": {
                        "schoolInformalNames": {
                            "value": ""
                        },
                        "schoolPhoneCountryCode": {
                            "value": "+1-"
                        },
                        "schoolPhoneNumber": {
                            "value": "1-703-765-0987"
                        },
                        "schoolPhoneExtension": {
                            "value": ""
                        },
                        "schoolCreatedBy": {
                            "value": 15169734
                        },
                        "schoolCreatedDate": {
                            "value": "2013-11-04T14:35:59Z"
                        },
                        "schoolCreatedByLookupName": {
                            "value": "Kevin Hart"
                        },
                        "schoolCode": {
                            "value": "F43-5D"
                        },
                        "schoolDisplayName": {
                            "value": "Graduate School"
                        },
                        "schoolAddressLine1": {
                            "value": ""
                        },
                        "schoolAddressLine2": {
                            "value": ""
                        },
                        "schoolAddressLine3": {
                            "value": ""
                        },
                        "schoolCity": {
                            "value": ""
                        },
                        "schoolPostalCode": {
                            "value": ""
                        },
                        "schoolStateProvinceId": {
                            "value": 3000044
                        },
                        "schoolStateProvinceIdLookupName": {
                            "value": "TX"
                        },
                        "schoolCountryId": {
                            "value": 2000062
                        },
                        "schoolCountryIdLookupName": {
                            "value": "United States"
                        }
                    },
                    "relatedEntities": {
                        "institutions": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1005129
                                },
                                "fields": {
                                    "institutionName": {
                                        "value": "Abilene Christian University"
                                    },
                                    "institutionCode": {
                                        "value": "F43"
                                    }
                                }
                            }
                        ],
                        "programs": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 3051312
                                },
                                "fields": {
                                    "programName": {
                                        "value": "Masters in Accountancy"
                                    },
                                    "programCode": {
                                        "value": "F43-5D-16"
                                    }
                                }
                            }
                        ],
                        "events": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1003056
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "World MBA Tour - Cambodia"
                                    },
                                    "startDate": {
                                        "value": "2018-10-14T00:00:00Z"
                                    }
                                }
                            },
                            {
                                "rowNum": {
                                    "value": 2
                                },
                                "id": {
                                    "value": 1038368
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "The QS World MBA Tour San Francisco"
                                    },
                                    "startDate": {
                                        "value": "2017-01-21T00:00:00Z"
                                    }
                                }
                            },
                            {
                                "rowNum": {
                                    "value": 3
                                },
                                "id": {
                                    "value": 1038369
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "The QS World MBA Tour San Diego"
                                    },
                                    "startDate": {
                                        "value": "2017-01-23T00:00:00Z"
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
}`;