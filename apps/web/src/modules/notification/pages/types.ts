export interface INotiFilter {
  cancelCheck: boolean
  receiveCheck: boolean
  rejectCheck: boolean
  acceptCheck: boolean
  appRefundCheck: boolean
  rejectRefundCheck: boolean
}
export const initialINotiFilter: INotiFilter = {
  cancelCheck: false,
  receiveCheck: false,
  rejectCheck: false,
  acceptCheck: false,
  appRefundCheck: false,
  rejectRefundCheck: false,
}
