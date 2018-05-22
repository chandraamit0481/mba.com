export const ProgramsMockData: string = `{
  "envelope": {
    "totalRows": 1,
    "fields": "programDisplayName,programProfileTypeIdLookupName,programLogo,programAddressLine1,programAddressLine2,programAddressLine3,programCity,programStateProvinceIdLookupName,programStateProvinceName,programPostalCode,programCountryIdLookupName,programJointDegreeOffered,programPhoneCountryCode,programPhoneNumber,programPhoneExtension,programWebsiteUrl,programDegreeIdLookupName,programTypeIdLookupName,programDeliveryFormatIdLookupName,programLengthIdLookupName,programOverview,programMilitaryFriendlyUrl,programCost,programCreditsRequired,programFinancialAidAvailable,programFullyFunded,programTest,programStart,programLink,programAreaOfStudy,programAreaOfStudyOther,programWorkExperience,programSizeAverage,programEmployment,programRollingAdmissions",
    "sort": "programLastPublishedDate desc",
    "pageSize": "100",
    "page": "1",
    "filter": "programOrgId in (3022977,3022918,3023033,3052053)",
    "programOrgId": "3022977,3022918,3023033,3052053",
    "join": " LEFT JOIN [kvp].[xrefValue] programLastPublishedDate_Sort_XV_0 ON MAIN.ValueID = programLastPublishedDate_Sort_XV_0.ParentValueID AND programLastPublishedDate_Sort_XV_0.MetadataCatalogID IN (SELECT MetadataCatalogID FROM [kvp].[MetadataCatalog] WHERE FriendlyID = 'programLastPublishedDate') LEFT JOIN [kvp].[xrefValueDateTime] programLastPublishedDate_Sort_Val_0 ON programLastPublishedDate_Sort_XV_0.ValueID = programLastPublishedDate_Sort_Val_0.ValueID",
    "orderby": "programLastPublishedDate_Sort_Val_0.Value desc",
    "metadata": {
      "timming-Receiving Config ": "0.0002",
      "timming-Setting Provider Data ": "135.674",
      "timming-Receiving Data ": "135.741",
      "timming-End ": "1664.4187"
    },
    "totalRowsReturned": "1",
    "log": [
      {
        "msg": "Start: 1744.1617"
      },
      {
        "msg": "Requesting data: 1744.1748"
      },
      {
        "msg": "End: 3695.7708"
      }
    ],
    "validationWarnings": [
      "'fields' value not provided. Using default value: programDisplayName,programProfileTypeIdLookupName,programLogo,programAddressLine1,programAddressLine2,programAddressLine3,programCity,programStateProvinceIdLookupName,programStateProvinceName,programPostalCode,programCountryIdLookupName,programJointDegreeOffered,programPhoneCountryCode,programPhoneNumber,programPhoneExtension,programWebsiteUrl,programDegreeIdLookupName,programTypeIdLookupName,programDeliveryFormatIdLookupName,programLengthIdLookupName,programOverview,programMilitaryFriendlyUrl,programCost,programCreditsRequired,programFinancialAidAvailable,programFullyFunded,programTest,programStart,programLink,programAreaOfStudy,programAreaOfStudyOther,programWorkExperience,programSizeAverage,programEmployment,programRollingAdmissions.",
      "'sort' value not provided. Using default value: programLastPublishedDate desc.",
      "'pageSize' value not provided. Using default value: 100.",
      "'page' value not provided. Using default value: 1."
    ]
  },
  "data": [
    {
      "programs": [
        {
          "rowNum": {
            "value": 0
          },
          "id": {
            "value": 3052053
          },
          "fields": {
            "programDisplayName": {
              "value": "MBA, Part Time"
            },
            "programProfileTypeIdLookupName": {
              "value": "Enhanced"
            },
            "programLogo": {
              "value": ""
            },
            "programAddressLine1": {
              "value": "500 Glenridge Avenue"
            },
            "programAddressLine2": {
              "value": null
            },
            "programAddressLine3": {
              "value": null
            },
            "programCity": {
              "value": "St Catharines"
            },
            "programStateProvinceIdLookupName": {
              "value": "ON"
            },
            "programStateProvinceName": {
              "value": "Ontario"
            },
            "programPostalCode": {
              "value": "L2S 3A1"
            },
            "programCountryIdLookupName": {
              "value": "Canada"
            },
            "programJointDegreeOffered": {
              "value": false
            },
            "programPhoneCountryCode": {
              "value": "+1-"
            },
            "programPhoneNumber": {
              "value": "905-688-5550"
            },
            "programPhoneExtension": {
              "value": ""
            },
            "programWebsiteUrl": {
              "value": "http://goodman.brocku.ca/future/graduate/"
            },
            "programDegreeIdLookupName": {
              "value": "MBA"
            },
            "programTypeIdLookupName": {
              "value": "Part-time"
            },
            "programDeliveryFormatIdLookupName": {
              "value": "On Campus"
            },
            "programLengthIdLookupName": {
              "value": "More than 2 years"
            },
            "programOverview": {
              "value": ""
            },
            "programMilitaryFriendlyUrl": {
              "value": null
            },
            "programCost": [],
            "programCreditsRequired": {
              "value": null
            },
            "programFinancialAidAvailable": {
              "value": false
            },
            "programFullyFunded": {
              "value": true
            },
            "programTest": [
              {
                "programTestId": {
                  "value": 6060001
                },
                "programTestStatusId": {
                  "value": 6070001
                },
                "programTestScoreAverage": {
                  "value": 550
                },
                "programTestIdLookupName": {
                  "value": "GMAT"
                },
                "programTestStatusIdLookupName": {
                  "value": "Accepted"
                }
              }
            ],
            "programStart": [
              {
                "programStartMonthId": {
                  "value": 6080001
                },
                "programApplicationDeadline": [
                  {
                    "programApplicationDeadlineMonthId": {
                      "value": 6080009
                    },
                    "programApplicationDeadlineMonthIdLookupName": {
                      "value": "September"
                    }
                  }
                ],
                "programStartMonthIdLookupName": {
                  "value": "January"
                }
              },
              {
                "programStartMonthId": {
                  "value": 6080009
                },
                "programApplicationDeadline": [
                  {
                    "programApplicationDeadlineMonthId": {
                      "value": 6080006
                    },
                    "programApplicationDeadlineMonthIdLookupName": {
                      "value": "June"
                    }
                  }
                ],
                "programStartMonthIdLookupName": {
                  "value": "September"
                }
              }
            ],
            "programLink": [
              {
                "programLinkUrl": {
                  "value": "https://www.facebook.com/brockuniversity"
                },
                "programLinkTypeId": {
                  "value": 6090001
                },
                "programLinkTypeIdLookupName": {
                  "value": "Facebook"
                }
              },
              {
                "programLinkUrl": {
                  "value": "https://twitter.com/brockuniversity"
                },
                "programLinkTypeId": {
                  "value": 6090002
                },
                "programLinkTypeIdLookupName": {
                  "value": "Twitter"
                }
              },
              {
                "programLinkUrl": {
                  "value": "https://www.linkedin.com/edu/school?id=10836"
                },
                "programLinkTypeId": {
                  "value": 6090003
                },
                "programLinkTypeIdLookupName": {
                  "value": "LinkedIn"
                }
              },
              {
                "programLinkUrl": {
                  "value": "https://www.instagram.com/brockuniversity/"
                },
                "programLinkTypeId": {
                  "value": 6090011
                },
                "programLinkTypeIdLookupName": {
                  "value": "Instagram"
                }
              }
            ],
            "programAreaOfStudy": [
              {
                "programAreaOfStudyId": {
                  "value": 3360001
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Accounting"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360009
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Business Analytics / Decision Science"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360017
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Finance"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360018
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "General Management"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360021
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Human Resource Management"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360030
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Marketing"
                }
              },
              {
                "programAreaOfStudyId": {
                  "value": 3360033
                },
                "programAreaOfStudyIdLookupName": {
                  "value": "Operations Management"
                }
              }
            ],
            "programAreaOfStudyOther": {
              "value": ""
            },
            "programWorkExperience": [
              {
                "programWorkExperienceYears": {
                  "value": 6
                },
                "programWorkExperienceTypeId": {
                  "value": 6150001
                },
                "programWorkExperienceTypeIdLookupName": {
                  "value": "Average"
                }
              }
            ],
            "programSizeAverage": {
              "value": 43
            },
            "programEmployment": [
              {
                "programEmploymentMonths": {
                  "value": 3
                },
                "programEmploymentWithinXMonths": {
                  "value": 100
                }
              }
            ],
            "programRollingAdmissions": {
              "value": true
            }
          },
          "relatedEntities": {
            "schools": [
              {
                "rowNum": {
                  "value": 1
                },
                "id": {
                  "value": 2007223
                },
                "fields": {
                  "schoolName": {
                    "value": "Goodman School of Business"
                  },
                  "informalNames": {
                    "value": ""
                  }
                }
              }
            ],
            "events": []
          }
        }
      ]
    }
  ]
}`;