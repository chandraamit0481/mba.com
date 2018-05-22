export const savedEventsDataSample = `{
    "envelope": {
        "totalRows": 4,
        "fields": "SavedEventID,EventRecruitingCalendarID,DateSaved,IdentityID",
        "sort": "savedEventID asc",
        "pageSize": "100",
        "page": "1",
        "filter": "identityId eq 46289745",
        "whereclause": "Main.IdentityID = 46289745",
        "orderby": "Main.SavedEventID asc",
        "metadata": {
            "timming-Receiving Config ": "0.0003",
            "timming-Setting Provider Data ": "152.6097",
            "timming-Receiving Data ": "152.6513",
            "timming-End ": "206.5559"
        },
        "totalRowsReturned": "8",
        "validationWarnings": [
            "'fields' value not provided. Using default value: SavedEventID,EventRecruitingCalendarID,DateSaved,IdentityID.",
            "'sort' value not provided. Using default value: savedEventID asc.",
            "'pageSize' value not provided. Using default value: 100.",
            "'page' value not provided. Using default value: 1."
        ]
    },
    "data": [
        {
            "saved-events": [
                {
                    "rowNum": {
                        "value": 1
                    },
                    "id": {
                        "value": 6039
                    },
                    "fields": {
                        "EventRecruitingCalendarID": {
                            "value": 1038986
                        },
                        "DateSaved": {
                            "value": "2017-09-27T11:56:12Z"
                        },
                        "IdentityID": {
                            "value": 46289745
                        }
                    },
                    "relatedEntities": {
                        "events": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1038986
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "Tuck Reception"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "rowNum": {
                        "value": 2
                    },
                    "id": {
                        "value": 6040
                    },
                    "fields": {
                        "EventRecruitingCalendarID": {
                            "value": 1039035
                        },
                        "DateSaved": {
                            "value": "2017-09-27T11:56:21Z"
                        },
                        "IdentityID": {
                            "value": 46289745
                        }
                    },
                    "relatedEntities": {
                        "events": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1039035
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "Discover Daniels Information Session"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "rowNum": {
                        "value": 3
                    },
                    "id": {
                        "value": 6041
                    },
                    "fields": {
                        "EventRecruitingCalendarID": {
                            "value": 1000038
                        },
                        "DateSaved": {
                            "value": "2017-09-27T11:57:55Z"
                        },
                        "IdentityID": {
                            "value": 46289745
                        }
                    },
                    "relatedEntities": {
                        "events": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1000038
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "Admissions Reception"
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    "rowNum": {
                        "value": 4
                    },
                    "id": {
                        "value": 6045
                    },
                    "fields": {
                        "EventRecruitingCalendarID": {
                            "value": 1000040
                        },
                        "DateSaved": {
                            "value": "2017-09-29T06:07:20Z"
                        },
                        "IdentityID": {
                            "value": 46289745
                        }
                    },
                    "relatedEntities": {
                        "events": [
                            {
                                "rowNum": {
                                    "value": 1
                                },
                                "id": {
                                    "value": 1000040
                                },
                                "fields": {
                                    "eventName": {
                                        "value": "Admissions Reception"
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
