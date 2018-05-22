export const licenceSample = `{
  "envelope": {
    "totalRows": 1,
    "fields": "licenseID,licenseKey,productID,licenseStatusID,statusName,expirationDate,expirationManuallySet,accountIDPurchasedBy,contactIDPurchasedBy,purchasedDate,activatedDate",
    "sort": "licenseID asc",
    "pageSize": "100",
    "page": "1",
    "filter": "licenseKey eq TEST-d5L1-L0r4",
    "whereclause": "Main.licenseKey = 'TEST-d5L1-L0r4'",
    "metadata": {
      "timming-Receiving Config ": "0.0001",
      "timming-Setting Provider Data ": "125.1279",
      "timming-Receiving Data ": "125.1853",
      "timming-End ": "156.0987"
    },
    "totalRowsReturned": "1",
    "validationWarnings": [
      "'fields' value not provided. Using default value: licenseID,licenseKey,productID,licenseStatusID,statusName,expirationDate,expirationManuallySet,accountIDPurchasedBy,contactIDPurchasedBy,purchasedDate,activatedDate.",
      "'sort' value not provided. Using default value: licenseID asc.",
      "'pageSize' value not provided. Using default value: 100.",
      "'page' value not provided. Using default value: 1."
    ]
  },
  "data": [
    {
      "License": [
        {
          "rowNum": {
            "value": 1
          },
          "id": {
            "value": 1
          },
          "fields": {
            "licenseID": {
              "value": null
            },
            "licenseKey": {
              "value": "TEST-d5L1-L0r4"
            },
            "productID": {
              "value": 5051
            },
            "licenseStatusID": {
              "value": 3
            },
            "statusName": {
              "value": "Activated"
            },
            "expirationDate": {
              "value": "2013-03-11T06:45:02Z"
            },
            "expirationManuallySet": {
              "value": true
            },
            "accountIDPurchasedBy": {
              "value": 0
            },
            "contactIDPurchasedBy": {
              "value": 0
            },
            "purchasedDate": {
              "value": "2012-12-10T15:48:12Z"
            },
            "activatedDate": {
              "value": "2012-12-11T06:45:02Z"
            }
          }
        }
      ]
    }
  ]
}`;