export const config = {
    eventDetail: {
        method: "saved-events",
        id: "",
        idKey: "eventRecruitingCalendarID",
        eventRecruitingCalendarID: "1000004",
        identityId: "46289702",
        action: "Get",
        operator: ":=",
        separator: ";",
        get: {
            filters: ["identityId", "eventRecruitingCalendarID"]
        },
        post: {

        },
        delete: { saveId: "" }
    }
};
