import { JobStatus } from '@modela/dtos'

export const ADDITION_DESC: Partial<{ [key in JobStatus]: string }> = {
  [JobStatus.OPEN]:
    'ซึ่งจะทำให้นักแสดงคนอื่นๆ ไม่สามารถสมัครงานนี้ได้อีก ยืนยันหรือไม่',
  [JobStatus.SELECTING]: 'ยืนยันหรือไม่',
  [JobStatus.SELECTION_ENDED]: 'ยืนยันหรือไม่',
}
