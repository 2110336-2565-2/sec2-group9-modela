import { z } from 'zod'

const castingSignupSchema = z
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
    companyName: z.string({
      required_error: 'กรุณากรอกสัญชาติ',
    }),
    password: z.string({
      required_error: 'กรุณากรอกรหัสผ่าน',
    }),
    confirmPassword: z.string({
      required_error: 'กรุณากรอกยืนยันรหัสผ่าน',
    }),
    companyId: z
      .string({
        required_error: 'กรุณากรอกเลขบัตรประชาชน / เลขพาสปอร์ต',
      })
      .refine((arg) => /^[0-9]{13}$/.test(arg), 'รูปแบบไม่ถูกต้อง'),
    employmentCertUrl: z.string({
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

export type ICastingSignupSchemaType = z.infer<typeof castingSignupSchema>
export { castingSignupSchema }
