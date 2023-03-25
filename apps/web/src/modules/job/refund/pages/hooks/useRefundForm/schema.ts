import { z } from 'zod'

const refundFormSchema = z.object({
  reason: z.string({
    required_error: 'กรุณากรอกเหตุผล',
  }),
  evidenceUrl: z.string({
    required_error: 'กรุณาอัปโหลดหลักฐาน',
  }),
})

export type IRefundFormSchemaType = z.infer<typeof refundFormSchema>
export { refundFormSchema }
