import { Gender } from '@modela/dtos'
import isNumeric from 'validator/lib/isNumeric'
import { z } from 'zod'

const postJobSchema = z
  .object({
    jobName: z.string().min(1, 'กรุณากรอกตำแหน่งงาน'),
    jobDescription: z.string().min(1, 'กรุณากรอกรายละเอียดงาน'),
    dueDate: z.string(),
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
export { postJobSchema }
