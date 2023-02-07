import { Gender } from '@modela/dtos'
import dayjs, { type Dayjs } from 'dayjs'
import isNumeric from 'validator/lib/isNumeric'
import { z } from 'zod'

const shootingSchema = z
  .object({
    location: z.string({ required_error: 'กรุณากรอกสถานที่ถ่ายทำ' }),
    startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    startTime: z.instanceof(dayjs as unknown as typeof Dayjs),
    endTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  })
  .superRefine(({ startTime, endTime }, ctx) => {
    if (startTime && endTime && startTime.isAfter(endTime)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'เวลาสิ้นสุดการถ่ายทำต้องมากกว่าเวลาเริ่มต้น',
      })
    }
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'วันที่สิ้นสุดการถ่ายทำต้องมากกว่าวันที่เริ่มต้น',
      })
    }
  })

const postJobSchema = z
  .object({
    jobName: z.string().min(1, 'กรุณากรอกตำแหน่งงาน'),
    jobDescription: z.string().min(1, 'กรุณากรอกรายละเอียดงาน'),
    dueDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    wage: z
      .string()
      .min(1, 'กรุณากรอกค่าจ้าง')
      .refine(isNumeric, 'กรุณากรอกค่าจ้างเป็นตัวเลข'),
    actorCount: z
      .string()
      .min(1, 'กรุณากรอกจำนวนนักแสดง')
      .refine(isNumeric, 'กรุณากรอกจำนวนนักแสดง'),
    gender: z.nativeEnum(Gender),
    minAge: z
      .string()
      .min(1, 'กรุณากรอกอายุต่ำสุด')
      .refine(isNumeric, 'กรุณากรอกอายุต่ำสุดเป็นตัวเลข'),
    maxAge: z
      .string()
      .min(1, 'กรุณากรอกอายุสูงสุด')
      .refine(isNumeric, 'กรุณากรอกอายุสูงสุดเป็นตัวเลข'),
    role: z.string().min(1, 'กรุณากรอกบทบาท'),
    shooting: z.array(shootingSchema),
  })
  .superRefine(({ minAge, maxAge }, ctx) => {
    if (minAge && maxAge && minAge > maxAge) {
      ctx.addIssue({
        code: 'custom',
        path: ['maxAge'],
        message: 'อายุต่ำสุดต้องน้อยกว่าอายุสูงสุด',
      })
    }
  })

export type IPostJobSchemaType = z.infer<typeof postJobSchema>
export type IShootingSchemaType = z.infer<typeof shootingSchema>
export { postJobSchema, shootingSchema }
