export const MODAL_OPTION = {
  accept: {
    title: 'ทำเครื่องหมายว่าเสร็จสิ้นแล้ว',
    finalState: 'จัดการเสร็จสิ้น',
  },
  reject: {
    title: 'ปฏิเสธคำขอธุรกรรม',
    finalState: 'ถูกปฏิเสธ',
  },
} as const
