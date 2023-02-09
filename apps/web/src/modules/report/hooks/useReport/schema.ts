import { z } from 'zod'

const ReportSchema = z.object({
  description: z
    .string({ required_error: 'กรุณากรอกรายละเอียดปัญหา' })
    .min(1, 'กรุณากรอกรายละเอียดปัญหา'),
})

export type IReportSchemaType = z.infer<typeof ReportSchema>
export { ReportSchema }
