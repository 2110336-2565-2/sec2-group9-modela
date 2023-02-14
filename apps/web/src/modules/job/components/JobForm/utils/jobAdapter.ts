import { CreateJobDto, EditJobDto } from '@modela/dtos'

import { IPostJobSchemaType } from '../hooks/useJobForm/schema'

export const fieldToPayload = (
  field: IPostJobSchemaType,
): EditJobDto | CreateJobDto => {
  const { applicationDeadline, shooting, ...rest } = field
  return {
    ...rest,
    applicationDeadline: applicationDeadline.toDate(),
    shooting: shooting.map((shooting) => ({
      ...shooting,
      startDate: shooting.startDate.toDate(),
      endDate: shooting.endDate.toDate(),
      startTime: shooting.startTime.toDate(),
      endTime: shooting.endTime.toDate(),
    })),
  }
}
