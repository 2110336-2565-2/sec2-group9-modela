import { JobStatus } from '@modela/database'

export const STATUS_NAME: { [key in JobStatus]: string } = {
  [JobStatus.OPEN]: 'เปิดรับสมัคร',
  [JobStatus.SELECTING]: 'กำลังคัดเลือก',
  [JobStatus.SELECTION_ENDED]: 'คัดเลือกเสร็จสิ้น',
  [JobStatus.FINISHED]: 'ถ่ายทำเสร็จสิ้น',
  [JobStatus.CANCELLED]: 'ถูกยกเลิก',
}

export const NEXT_STATUS_NAME: Partial<{ [key in JobStatus]: string }> = {
  [JobStatus.OPEN]: 'ปิดการรับสมัคร',
  [JobStatus.SELECTING]: 'เสร็จสิ้นการคัดเลือก',
  [JobStatus.SELECTION_ENDED]: 'ถ่ายทำเสร็จสิ้น',
}
