import { Gender } from '@modela/dtos'
import dayjs, { type Dayjs } from 'dayjs'
import { z } from 'zod'

const shootingSchema = z
  .object({
    shootingLocation: z.string({ required_error: 'กรุณากรอกสถานที่ถ่ายทำ' }),
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
    title: z.string({ required_error: 'กรุณากรอกตำแหน่งงาน' }),
    description: z.string({ required_error: 'กรุณากรอกรายละเอียดงาน' }),
    applicationDeadline: z
      .instanceof(dayjs as unknown as typeof Dayjs)
      .refine((arg) => arg.isAfter(dayjs()), {
        message: 'วันที่สิ้นสุดการรับสมัครต้องอยู่หลังวันที่ปัจจุบัน',
      }),
    wage: z
      .number({
        required_error: 'กรุณากรอกค่าจ้าง',
        invalid_type_error: 'กรุณากรอกค่าจ้างเป็นจำนวนบวก',
      })
      .nonnegative({ message: 'กรุณากรอกค่าจ้างเป็นจำนวนบวก' }),
    actorCount: z
      .number({
        required_error: 'กรุณากรอกจำนวนนักแสดง',
        invalid_type_error: 'กรุณากรอกจำนวนนักแสดงเป็นจำนวนเต็มบวก',
      })
      .positive('กรุณากรอกจำนวนนักแสดงเป็นจำนวนเต็มบวก')
      .multipleOf(1, 'กรุณากรอกจำนวนนักแสดงเป็นจำนวนเต็มบวก'),
    gender: z.nativeEnum(Gender),
    minAge: z
      .number({
        required_error: 'กรุณากรอกอายุต่ำสุด',
        invalid_type_error: 'กรุณากรอกอายุต่ำสุดเป็นจำนวนเต็มบวก',
      })
      .positive('กรุณากรอกอายุต่ำสุดเป็นจำนวนเต็มบวก')
      .multipleOf(1, 'กรุณากรอกอายุต่ำสุดเป็นจำนวนเต็มบวก'),
    maxAge: z
      .number({
        required_error: 'กรุณากรอกอายุสูงสุด',
        invalid_type_error: 'กรุณากรอกอายุสูงสุดเป็นจำนวนเต็มบวก',
      })
      .positive('กรุณากรอกอายุสูงสุดเป็นจำนวนเต็มบวก')
      .multipleOf(1, 'กรุณากรอกอายุสูงสุดเป็นจำนวนเต็มบวก'),
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
