import { Gender } from '@modela/dtos'
import dayjs, { type Dayjs } from 'dayjs'
import { z } from 'zod'

const shootingSchema = z
  .object({
    location: z.string({ required_error: 'กรุณากรอกสถานที่ถ่ายทำ' }),
    startDate: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine((arg) => arg.isAfter(dayjs()), {
        message: 'วันที่เริ่มต้นการถ่ายทำต้องมากกว่าวันที่ปัจจุบัน',
      }),
    endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
    startTime: z.instanceof(dayjs as unknown as typeof Dayjs),
    endTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  })
  .superRefine(({ startTime, endTime, startDate, endDate }, ctx) => {
    if (startTime && endTime && startTime.isAfter(endTime)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'เวลาสิ้นสุดการถ่ายทำต้องอยู่หลังเวลาเริ่มต้น',
      })
    }
    if (startDate && endDate && startDate.isAfter(endDate)) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'วันที่สิ้นสุดการถ่ายทำต้องอยู่หลังวันที่เริ่มต้น',
      })
    }
  })

const postJobSchema = z
  .object({
    jobName: z.string({ required_error: 'กรุณากรอกตำแหน่งงาน' }),
    jobDescription: z.string({ required_error: 'กรุณากรอกรายละเอียดงาน' }),
    dueDate: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine((arg) => arg.isAfter(dayjs()), {
        message: 'วันที่สิ้นสุดการรับสมัครต้องอยู่หลังวันที่ปัจจุบัน',
      }),
    wage: z
      .string({ required_error: 'กรุณากรอกค่าจ้าง' })
      .refine((arg) => /^[0-9]*\.?[0-9]*$/.test(arg), {
        message: 'กรุณาค่าจ้างกรอกเป็นตัวเลข',
      }),
    actorCount: z
      .string({ required_error: 'กรุณากรอกจำนวนนักแสดง' })
      .refine((arg) => /^[0-9]*$/.test(arg), {
        message: 'กรุณากรอกจำนวนนักแสดงเป็นตัวเลขจำนวนเต็ม',
      }),
    gender: z.nativeEnum(Gender),
    minAge: z
      .string({ required_error: 'กรุณากรอกอายุต่ำสุด' })
      .refine((arg) => /^[0-9]*$/.test(arg), {
        message: 'กรุณากรอกอายุต่ำสุดเป็นตัวเลขจำนวนเต็ม',
      }),
    maxAge: z
      .string({ required_error: 'กรุณากรอกอายุสูงสุด' })
      .refine((arg) => /^[0-9]*$/.test(arg), {
        message: 'กรุณากรอกอายุสูงสุดเป็นตัวเลขจำนวนเต็ม',
      }),
    role: z.string({ required_error: 'กรุณากรอกบทบาท' }),
    shooting: z.array(shootingSchema),
  })
  .superRefine(({ minAge, maxAge }, ctx) => {
    if (minAge && maxAge && +minAge > +maxAge) {
      ctx.addIssue({
        code: 'custom',
        path: ['maxAge'],
        message: 'อายุต่ำสุดต้องน้อยกว่าหรือเท่ากับอายุสูงสุด',
      })
    }
  })

export type IPostJobSchemaType = z.infer<typeof postJobSchema>
export type IShootingSchemaType = z.infer<typeof shootingSchema>
export { postJobSchema, shootingSchema }
