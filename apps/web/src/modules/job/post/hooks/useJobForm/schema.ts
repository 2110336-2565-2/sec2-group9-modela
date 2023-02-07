import { Gender } from '@modela/dtos'
import isNumeric from 'validator/lib/isNumeric'
import { z } from 'zod'

const shootingSchema = z.object({
  location: z.string({ required_error: 'กรุณากรอกสถานที่ถ่ายทำ' }),
  startDate: z.date({ required_error: 'กรุณากรอกวันที่เริ่มต้นการถ่ายทำ' }),
  endDate: z.date({ required_error: 'กรุณากรอกวันที่สิ้นสุดการถ่ายทำ' }),
  startTime: z.date({
    required_error: 'กรุณากรอกเวลาเริ่มต้นการถ่ายทำในแต่ละวัน',
  }),
  endTime: z.date({
    required_error: 'กรุณากรอกเวลาสิ้นสุดการถ่ายทำในแต่ละวัน',
  }),
})

const postJobSchema = z
  .object({
    jobName: z.string().min(1, 'กรุณากรอกตำแหน่งงาน'),
    jobDescription: z.string().min(1, 'กรุณากรอกรายละเอียดงาน'),
    dueDate: z.date({ required_error: 'กรุณากรอกวันที่สิ้นสุดการรับสมัคร' }),
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
