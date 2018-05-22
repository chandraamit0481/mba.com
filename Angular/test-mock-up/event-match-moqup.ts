export const eventMatchMockData: string = `
{
    "envelope": {
        "totalRows": 1,
        "sort": "score desc,eventStartDate desc",
        "pageSize": "100",
        "page": "1",
        "filter": "eventId eq 1000033",
        "fields": "eventStartDate,description,eventEndDate,eventStartHour,eventIsOnline,address1,address2,eventWebsiteAddress,eventName,eventHostName,eventRegistrationRequired",
        "metadata": {
            "maxScore": "1"          
        },
        "totalRowsReturned": "1"       
    },
    "data": [
        {
            "searchResults": [
                {
                    "rowNum": {
                        "value": 1
                    },
                    "id": {
                        "value": "1000033"
                    },
                    "fields": {
                        "eventStartDate": {
                            "value": "2002-11-14T00:00:00Z"
                        },
                        "description": {
                            "value": "Come hear about our Full-Time MBA program from staff and GSB alumni."
                        },
                        "eventEndDate": {
                           "value": "2002-11-14T00:00:00Z"
                        },
                        "eventStartHour": {
                             "value": "0001-01-01T00:00:00Z"
                        },
                        "eventEndHour": {
                            "value": "0001-01-01T00:00:00Z"
                        },
                        "eventIsOnline": {
                            "value": false
                        },                       
                        "eventWebsiteAddress": {
                              "value": "http://gsb.uchicago.edu/static.asp?nNodeID=80"
                        },
                        "eventEmail": {
                            "value": "admissions@gsb.uchicago.edu"
                        },
                        "eventName": {
                            "value": "Admissions Reception"
                        },
                        "eventHostName": {
                            "value": "University of Chicago, Booth School of Business"
                        },
                        "eventRegistrationRequired": {
                            "value": false
                        }
                    }
                }
            ]
        }
    ]
}`;