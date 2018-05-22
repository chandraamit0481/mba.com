export enum EnumAssessmentType {
    Undefined = 0,
    Past = 1,
    Future = 2
}
export enum EnumAssessmentStatus {
    Reportable = "SCORE REPORTABLE",
    ScoreCancelled = "SCORE CANCELLED",
    Scheduled = "SCHEDULED",
    Rescheduled = "RESCHEDULED",
    New = "NEW",
    Cancelled = "CANCELLED",
    NA = "NA"
}

export enum EnumAssessmentEvent {
    ScoreReportable = "SCOREREPORTABLE",
    ScorePending = "SCOREPENDING",
    CandCancel = "CANDCANCEL",
    HoldRelease = "HOLDRELEASE",
    Unrevoked = "UNREVOKED"
}
export enum EnumAssessmentAction {
    ViewOfficialScore = "View Official Score",
    ReinstateScore = "Reinstate Score",
    Reschedule = "Reschedule",
    Cancel = "Cancel",
    ViewESR = "View ESR",
    EnterESRCode = "Enter ESR Code",
    CancelScore = "Cancel Score"
}