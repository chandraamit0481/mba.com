export const profileMockData: string = `
{
  "envelope": {
    "totalRows": 1,
    "id": "46289745",
    "requestedPropertiesFromMBA": "identityId,student-guid,email,firstname,lastname,middlename,pvue-email,pvue-usa-state-of-residence-id,pvue-country-of-citizenship-id,optin-gmass,optin-gmat,optin-career,optin-gmass-was-optedin,optin-participation-in-surveys,optin-contact-by-phone,optin-contact-by-sms,day-phone-number,day-phone-extension,day-phone-country-id,evening-phone-number,evening-phone-extension,evening-phone-country-id,fax-phone-number,fax-phone-country-id,home-address1,home-address2,home-address3,home-country-id,home-country-description,home-city,home-postal-code,home-state-province-id,gmat-id,birthdate,pvue-first-name,pvue-last-name,pvue-address1,pvue-address2,pvue-address3,pvue-country-id,pvue-country-of-citizenship-description,pvue-city,pvue-postal-code,pvue-state-province-id,pvue-state-province-description,pvue-mapping-status,pvue-ethnicity-id,pvue-native-language-id,pvue-native-language-description,pvue-years-of-work-experience-id,pvue-years-of-work-experience-description,pvue-undergraduate-institution-code,pvue-undergraduate-institution-description,pvue-undergraduate-major-id,pvue-undergraduate-major-description,pvue-undergraduate-graduation-date,pvue-undergrad-gpa,pvue-highest-education-level-id,pvue-highest-education-level-description,pvue-mba-degree-pursued-id,pvue-how-mba-pursued-id,pvue-full-or-part-time-student-id,pvue-work-while-pursue-id,pvue-mba-area-of-concentration-id,pvue-world-study-region-id,pvue-funct-exp-before-degree-id,pvue-funct-exp-before-degree-description,pvue-funct-exp-after-degree-id,pvue-ind-exp-before-degree-id,pvue-ind-exp-before-degree-description,pvue-ind-exp-after-degree-id,pvue-military-service,gender-id,migrated,gmass-eligibility-date,business-school-status,enrolled-business-school-code,enrolled-business-school-other,not-attending-business-school-reason,pvue-candidate-id,pvue-mba-start-date,pvue-world-study-region-description,pvue-mba-degree-pursued-description,pvue-mba-area-of-concentration-description,pvue-how-mba-pursued-description,pvue-full-or-part-time-student-description,pvue-ind-exp-after-degree-description",
    "mbaAppID": "1000",
    "whereclause": "Main.MBAIdentityID = 46289745",
    "metadata": {
      "timming-Receiving Config ": "0.0003",
      "timming-Setting Provider Data ": "760.8227",
      "timming-Receiving Data ": "760.9521",
      "timming-End ": "1091.0712"
    },
    "totalRowsReturned": "1",
    "validationWarnings": [
      "'fields' value contains some invalid entries which have been removed: pvue-country-description,pvue-work-while-pursue-description,pvue-funct-exp-after-degree-description."
    ]
  },
  "data": [
    {
      "Identity": [
        {
          "rowNum": {
            "value": 1
          },
          "id": {
            "value": 46289745
          },
          "fields": {
            "student-guid": {
              "value": "ff43629a-ef65-4b23-93bd-89abd4f5a8f6"
            },
            "email": {
              "value": "profile@test.com"
            },
            "firstname": {
              "value": "Profile1"
            },
            "lastname": {
              "value": "Test123"
            },
            "middlename": {
              "value": ""
            },
            "pvue-email": {
              "value": "pvue-email@test.com"
            },
            "pvue-usa-state-of-residence-id": {
              "value": 0
            },
            "pvue-country-of-citizenship-id": {
              "value": 2000062
            },
            "optin-gmass": {
              "value": true
            },
            "optin-gmat": {
              "value": false
            },
            "optin-career": {
              "value": false
            },
            "optin-gmass-was-optedin": {
              "value": true
            },
            "optin-participation-in-surveys": {
              "value": false
            },
            "optin-contact-by-phone": {
              "value": false
            },
            "optin-contact-by-sms": {
              "value": false
            },
            "day-phone-number": {
              "value": "555-666-7777"
            },
            "day-phone-extension": {
              "value": ""
            },
            "day-phone-country-id": {
              "value": 2000062
            },
            "evening-phone-number": {
              "value": ""
            },
            "evening-phone-extension": {
              "value": ""
            },
            "evening-phone-country-id": {
              "value": 0
            },
            "fax-phone-number": {
              "value": ""
            },
            "fax-phone-country-id": {
              "value": 0
            },
            "home-address1": {
              "value": ""
            },
            "home-address2": {
              "value": ""
            },
            "home-address3": {
              "value": ""
            },
            "home-country-id": {
              "value": 0
            },
            "home-country-description": {
              "value": ""
            },
            "home-city": {
              "value": ""
            },
            "home-postal-code": {
              "value": ""
            },
            "home-state-province-id": {
              "value": 0
            },
            "gmat-id": {
              "value": "123456123456"
            },
            "birthdate": {
              "value": null
            },
            "pvue-first-name": {
              "value": "Profile"
            },
            "pvue-last-name": {
              "value": "Test"
            },
            "pvue-address1": {
              "value": "c/o Development Team"
            },
            "pvue-address2": {
              "value": "123 Test Lane"
            },
            "pvue-address3": {
              "value": "Suite 456"
            },
            "pvue-country-id": {
              "value": 2000062
            },
            "pvue-country-of-citizenship-description": {
              "value": "United States"
            },
            "pvue-city": {
              "value": "Testville"
            },
            "pvue-postal-code": {
              "value": "23456"
            },
            "pvue-state-province-id": {
              "value": 3000010
            },
            "pvue-state-province-description": {
              "value": "Florida"
            },
            "pvue-mapping-status": {
              "value": ""
            },
            "pvue-ethnicity-id": {
              "value": 0
            },
            "pvue-native-language-id": {
              "value": 0
            },
            "pvue-native-language-description": {
              "value": ""
            },
            "pvue-years-of-work-experience-id": {
              "value": 3220008
            },
            "pvue-years-of-work-experience-description": {
              "value": "7 years"
            },
            "pvue-undergraduate-institution-code": {
              "value": 5385
            },
            "pvue-undergraduate-institution-description": {
              "value": "Liberty University"
            },
            "pvue-undergraduate-major-id": {
              "value": 2370012
            },
            "pvue-undergraduate-major-description": {
              "value": "Engineering/Computer Science"
            },
            "pvue-undergraduate-graduation-date": {
              "value": "2016-06-08T00:00:00Z"
            },
            "pvue-undergrad-gpa": {
              "value": "3.1000"
            },
            "pvue-highest-education-level-id": {
              "value": 2380002
            },
            "pvue-highest-education-level-description": {
              "value": "Completed my undergraduate or university degree"
            },
            "pvue-mba-degree-pursued-id": {
              "value": 2390012
            },
            "pvue-how-mba-pursued-id": {
              "value": "2400006"
            },
            "pvue-full-or-part-time-student-id": {
              "value": "2410002"
            },
            "pvue-work-while-pursue-id": {
              "value": "2420001"
            },
            "pvue-mba-area-of-concentration-id": {
              "value": "2430005"
            },
            "pvue-world-study-region-id": {
              "value": "6100007,6100015"
            },
            "pvue-funct-exp-before-degree-id": {
              "value": "2460006"
            },
            "pvue-funct-exp-before-degree-description": {
              "value": "Information Technology/Data Science"
            },
            "pvue-funct-exp-after-degree-id": {
              "value": "2460006,2460010"
            },
            "pvue-ind-exp-before-degree-id": {
              "value": "2470011"
            },
            "pvue-ind-exp-before-degree-description": {
              "value": "Technology"
            },
            "pvue-ind-exp-after-degree-id": {
              "value": "2470011,2470001"
            },
            "pvue-military-service": {
              "value": true
            },
            "gender-id": {
              "value": 0
            },
            "migrated": {
              "value": false
            },
            "gmass-eligibility-date": {
              "value": null
            },
            "business-school-status": {
              "value": ""
            },
            "enrolled-business-school-code": {
              "value": ""
            },
            "enrolled-business-school-other": {
              "value": ""
            },
            "not-attending-business-school-reason": {
              "value": ""
            },
            "pvue-candidate-id": {
              "value": "244720888"
            },
            "pvue-mba-start-date": {
              "value": "2018-08-18T00:00:00Z"
            },
            "pvue-world-study-region-description": {
              "value": "Canada, United States"
            },
            "pvue-mba-degree-pursued-description": {
              "value": "Master of Business Administration (MBA)"
            },
            "pvue-mba-area-of-concentration-description": {
              "value": "Consulting"
            },
            "pvue-how-mba-pursued-description": {
              "value": "Distance/Online"
            },
            "pvue-full-or-part-time-student-description": {
              "value": "Part-time student"
            },
            "pvue-ind-exp-after-degree-description": {
              "value": "Consulting Services, Technology"
            },
            "pvue-country-description": {
              "value": "Consulting Services, Technology"
            }
          }
        }
      ]
    }
  ]
}`;