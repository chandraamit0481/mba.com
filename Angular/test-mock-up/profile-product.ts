export const profileProductDataSample = `
{
  "envelope": {
		"totalRows": 2,
		"id": "43961503",
		"IdentityID": "43961503",
		"metadata": {
			"Receiving Config ": "0",
			"Setting Provider Data ": "2037.8312",
			"Receiving Data ": "2037.8312",
			"End ": "2216.5587"
		},
		"totalRowsReturned": "2"
	},
	"data": [{
		"productpurchases": [{
			"id": {
				"value": "5028"
			},
			"fields": {
				"orderId": {
					"value": "4"
				},
				"productVersionId": {
					"value": "168"
				},
				"currentProductVersionId": {
					"value": "168"
				},
				"title": {
					"value": "The Official Guide for GMAT® Review, 13th Edition"
				},
				"caption": {
					"value": ""
				},
				"bodyText": {
					"value": ""
				},
				"extraText": {
					"value": ""
				},
				"productFormatText": {
					"value": "Book"
				},
				"productLineText": {
					"value": "The Official Guide for GMAT Review"
				},
				"orderDate": {
					"value": "5/2/2012 7:13:58 PM"
				},
				"quantity": {
					"value": "1"
				},
                "key":{
                    "value": "AB1234"
                }
			}
		}, {
			"id": {
				"value": "5041"
			},
			"fields": {
				"orderId": {
					"value": "4"
				},
				"productVersionId": {
					"value": "213"
				},
				"currentProductVersionId": {
					"value": "304"
				},
				"title": {
					"value": "The Premium GMAT® Study Collection"
				},
				"caption": {
					"value": ""
				},
				"bodyText": {
					"value": ""
				},
				"extraText": {
					"value": ""
				},
				"productFormatText": {
					"value": "Bundle"
				},
				"productLineText": {
					"value": "GMATPrep"
				},
				"orderDate": {
					"value": "5/2/2012 7:13:58 PM"
				},
				"quantity": {
					"value": "1"
				},
                 "key":{
                    "value": "AB1234"
                }
			}
		}]
	}]
}`;

export const profileSearchDataSample = `
{
  "envelope": {
    "totalRows": 2,
    "filter": "contentTypeName|Product,productId|(5028,5041)",
    "metadata": {
      "maxScore": "0.7071103",
      "boost-popularity": "1",
      "boost-aging": "0.001",
      "timming-Receiving Config ": "0",
      "timming-Setting Provider Data ": "135.3206",
      "timming-Receiving Data ": "196.4779",
      "timming-End ": "235.3191"
    },
    "totalRowsReturned": "2"
  },
  "data": [
    {
      "searchResults": [
        {
          "fields": {
            "productId": {
              "value": "5028"
            },
            "deliveryFormat": [
              "eb01363fb9bf43d09d756919731379e5"
            ],
            "deliveryFormatName": [
              "Access/Download it now"
            ]
          }
        },
        {
          "fields": {
            "productId": {
              "value": "5041"
            },
            "deliveryFormat": [
              "eb01363fb9bf43d09d756919731379e5"
            ],
            "deliveryFormatName": [
              "Access/Download it now"
            ]
          }
        }
      ]
    }
  ]
}`;