import { z } from 'zod'

const castingSignupSchema = z
  .object({
    email: z
      .string({
        required_error: 'กรุณากรอกอีเมล',
      })
      .min(1, 'กรุณากรอกอีเมล')
      .email('รูปแบบอีเมลไม่ถูกต้อง'),
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
    companyName: z
      .string({
        required_error: 'กรุณากรอกชื่อบริษัท',
      })
      .trim()
      .min(1, 'กรุณากรอกชื่อบริษัท'),
    password: z
      .string({
        required_error: 'กรุณากรอกรหัสผ่าน',
      })
      .min(1, 'กรุณากรอกรหัสผ่าน'),
    confirmPassword: z
      .string({
        required_error: 'กรุณากรอกยืนยันรหัสผ่าน',
      })
      .min(1, 'กรุณากรอกยืนยันรหัสผ่าน'),
    companyId: z
      .string({
        required_error: 'กรุณากรอกเลขจดทะเบียน',
      })
      .min(1, 'กรุณากรอกเลขจดทะเบียน')
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
