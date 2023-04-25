import { Gender } from '@modela/dtos'
import { z } from 'zod'

const editActorInfoSchema = z.object({
  firstName: z
    .string({
      required_error: 'กรุณากรอกชื่อ',
    })
    .trim()
    .min(1, 'กรุณากรอกชื่อ'),
  middleName: z.optional(z.string()),
  lastName: z
    .string({
      required_error: 'กรุณากรอกนามสกุล',
    })
    .trim()
    .min(1, 'กรุณากรอกนามสกุล'),
  nationality: z
    .string({
      required_error: 'กรุณากรอกสัญชาติ',
    })
    .trim()
    .min(1, 'กรุณากรอกสัญชาติ'),

  phoneNumber: z
    .string({
      required_error: 'กรุณากรอกเบอร์โทรศัพท์',
    })
    .min(1, 'กรุณากรอกเบอร์โทรศัพท์')
    .refine(
      (arg) => /^((\+66)|0)((2[0-9]{7})|([3-9][0-9]{8}))$/.test(arg),
      'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
    ),
  gender: z.nativeEnum(Gender),
  prefix: z
    .string({
      required_error: 'กรุณากรอกคำนำหน้าชื่อ',
    })
    .trim()
    .min(1, 'กรุณากรอกคำนำหน้าชื่อ'),
  ssn: z
    .string({
      required_error: 'กรุณากรอกเลขบัตรประชาชน / เลขพาสปอร์ต',
    })
    .refine((arg) => /^([0-9]|[A-Z])+$/.test(arg), 'รูปแบบไม่ถูกต้อง'),
  idCardImageUrl: z.string({
    required_error: 'กรุณาอัปโหลดรูปถ่าย',
  }),
})

export type IEditActorInfoSchema = z.infer<typeof editActorInfoSchema>
export { editActorInfoSchema }
