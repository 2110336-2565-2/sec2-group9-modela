import dayjs, { Dayjs } from 'dayjs'
import { z } from 'zod'

const EditActorProfileSchema = z.object({
  description: z.optional(z.string()),
  profileImageUrl: z.optional(z.string().url('รูปแบบไม่ถูกต้อง')),
  nickname: z.optional(z.string()),
  height: z.optional(z.number()),
  weight: z.optional(z.number()),
  eyeColor: z.optional(z.string()),
  hairColor: z.optional(z.string()),
  waist: z.optional(z.number()),
  bust: z.optional(z.number()),
  hips: z.optional(z.number()),
  shoeSize: z.optional(z.number()),
  skinShade: z.optional(z.string()),
  ethnicity: z.optional(z.string()),
  religion: z.optional(z.string()),
  birthDate: z.optional(z.instanceof(dayjs as unknown as typeof Dayjs)),
  phoneNumber: z.optional(
    z
      .string()
      .refine(
        (arg) => /^((\+66)|0)((2[0-9]{7})|([3-9][0-9]{8}))$/.test(arg),
        'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
      ),
  ),
  bankAccount: z.string({
    required_error: 'กรุณากรอกเลขบัญชี',
  }),
  bankName: z.optional(z.string()),
})

const EditActorProfileDefault = {
  bankAccount: '',
  bankName: '',
  description: '',
  phoneNumber: '',
  profileImageUrl: '',
}

export type IEditActorProfileSchemaType = z.infer<typeof EditActorProfileSchema>
export { EditActorProfileDefault, EditActorProfileSchema }
