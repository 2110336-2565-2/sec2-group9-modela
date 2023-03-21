import { z } from 'zod'

const editCastingInfoSchema = z.object({
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

  companyId: z
    .string({
      required_error: 'กรุณากรอกเลขจดทะเบียนของบริษัท',
    })
    .refine((arg) => /^[0-9]{13}$/.test(arg), 'รูปแบบไม่ถูกต้อง'),
  employmentCertUrl: z.string({
    required_error: 'กรุณาอัปโหลดหนังสือรับรองการทำงาน',
  }),
})

export type IEditCastingInfoSchema = z.infer<typeof editCastingInfoSchema>
export { editCastingInfoSchema }
