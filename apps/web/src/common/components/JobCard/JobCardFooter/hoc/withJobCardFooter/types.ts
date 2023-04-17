import { GetJobCardDto } from '@modela/dtos'

export type WithJobCardFooterProps = Pick<
  GetJobCardDto,
  'actorCount' | 'wage' | 'status' | 'applicationDeadline' | 'gender'
>
