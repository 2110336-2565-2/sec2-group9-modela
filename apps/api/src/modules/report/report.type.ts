// export a type consisting of jobID string, userID string, reason string and timestamp number

export class ReportPostData {
  jobID: number
  userID: number
  reason: string

  constructor(jobID: number, userID: number, reason: string) {
    this.jobID = jobID
    this.userID = userID
    this.reason = reason
  }
}
