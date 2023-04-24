import { z } from 'zod'

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'กรุณากรอกอีเมล',
    })
    .min(1, 'กรุณากรอกอีเมล')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string({
      required_error: 'กรุณากรอกรหัสผ่าน',
    })
    .min(1, 'กรุณากรอกรหัสผ่าน'),
})

export type ILoginSchemaType = z.infer<typeof LoginSchema>
export { LoginSchema }
