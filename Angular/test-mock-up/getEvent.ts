export const getEvent = {
    "envelope": {
        "totalRows": 1,
        "filter": "IdentityId:=30000006;EventRecruitingCalendarID:=1029835",
        "whereclause": "IdentityID = 30000006 AND EventRecruitingCalendarID = 1029835"
    },
    "data": [
        {
            "saved-events": [
                {
                    "id": {
                        "value": 1000
                    },
                    "attributes": {
                        "EventRecruitingCalendarID": {
                            "value": "1029835"
                        },
                        "DateSaved": {
                            "value": "11/15/2013 4:14:22 PM"
                        },
                        "IdentityID": {
                            "value": "30000006"
                        }
                    },
                    "relatedEntities": {
                        "events": [
                            {
                                "id": {
                                    "value": "1029835"
                                },
                                "attributes": {
                                    "eventName": {
                                        "value": "Diversity Leadership Forum Weekend"
                                    }
                                }
                            }
                        ],
                    }
                }
            ],
        }
    ],
};