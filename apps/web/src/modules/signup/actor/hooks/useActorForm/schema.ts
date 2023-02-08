import { Gender } from '@modela/dtos'
import { z } from 'zod'

const actorSignupSchema = z
  .object({
    email: z
      .string({
        required_error: 'กรุณากรอกอีเมล',
      })
      .email('รูปแบบอีเมลไม่ถูกต้อง'),
    firstName: z.string({
      required_error: 'กรุณากรอกชื่อ',
    }),
    middleName: z.optional(z.string()),
    lastName: z.string({
      required_error: 'กรุณากรอกนามสกุล',
    }),
    nationality: z.string({
      required_error: 'กรุณากรอกสัญชาติ',
    }),
    password: z.string({
      required_error: 'กรุณากรอกรหัสผ่าน',
    }),
    confirmPassword: z.string({
      required_error: 'กรุณากรอกยืนยันรหัสผ่าน',
    }),
    phoneNumber: z
      .string({
        required_error: 'กรุณากรอกเบอร์โทรศัพท์',
      })
      .refine(
        (arg) => /^((\+66)|0)((2[0-9]{7})|([3-9][0-9]{8}))$/.test(arg),
        'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
      ),
    gender: z.nativeEnum(Gender),
    prefix: z.string({
      required_error: 'กรุณากรอกคำนำหน้าชื่อ',
    }),
    ssn: z
      .string({
        required_error: 'กรุณากรอกเลขบัตรประชาชน / เลขพาสปอร์ต',
      })
      .refine((arg) => /^([0-9]|[A-Z])+$/.test(arg), 'รูปแบบไม่ถูกต้อง'),
    idCardImageUrl: z.string({
      required_error: 'กรุณาอัปโหลดรูปถ่าย',
    }),
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
