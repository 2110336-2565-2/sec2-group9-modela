import { z } from 'zod'

const EditCastingProfileSchema = z.object({
  description: z.optional(z.string()),
  bankAccount: z
    .string({
      required_error: 'กรุณากรอกเลขบัญชี',
    })
    .min(1, 'กรุณากรอกเลขบัญชี'),
  profileImageUrl: z.optional(z.string().url('รูปแบบไม่ถูกต้อง')),
  bankName: z.optional(z.string()),
  phoneNumber: z.optional(
    z
      .string()
      .refine(
        (arg) => /^((\+66)|0)((2[0-9]{7})|([3-9][0-9]{8}))$/.test(arg),
        'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
      ),
  ),
})

const EditCastingProfileDefault = {
  bankAccount: '',
  bankName: '',
  description: '',
  phoneNumber: '',
  profileImageUrl: '',
}

export type IEditCastingProfileSchemaType = z.infer<
  typeof EditCastingProfileSchema
>
export { EditCastingProfileDefault, EditCastingProfileSchema }
