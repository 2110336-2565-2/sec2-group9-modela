import { Gender } from '@modela/dtos'
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isMobilePhone from 'validator/lib/isMobilePhone'
import { z } from 'zod'

const actorSignupSchema = z
  .object({
    email: z.string().min(1, 'กรุณากรอกอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง'),
    firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
    lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
    nationality: z.string().min(1, 'กรุณากรอกสัญชาติ'),
    password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
    confirmPassword: z.string().min(1, 'กรุณากรอกยืนยันรหัสผ่าน'),
    phoneNumber: z
      .string()
      .min(1, 'กรุณากรอกเบอร์โทรศัพท์')
      .refine(
        (arg) => isMobilePhone(arg, 'th-TH'),
        'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
      ),
    gender: z.nativeEnum(Gender),
    prefix: z.string().min(1, 'กรุณากรอกคำนำหน้าชื่อ'),
    ssn: z
      .string()
      .min(1, 'กรุณานากรอกเลขบัตรประชาชน / เลขพาสปอร์ต')
      .refine((arg) => isAlphanumeric(arg), 'รูปแบบไม่ถูกต้อง'),
    middleName: z.string(),
    idCardImageUrl: z.string().default(''),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'รหัสผ่านไม่ตรงกัน',
      })
    }
  })

export type IActorSignupSchemaType = z.infer<typeof actorSignupSchema>
export { actorSignupSchema }
