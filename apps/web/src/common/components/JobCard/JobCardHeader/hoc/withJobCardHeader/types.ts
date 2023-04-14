import { GetJobCardDto } from '@modela/dtos'

export type WithJobCardHeaderProps = Pick<
  GetJobCardDto,
  'title' | 'jobCastingImageUrl' | 'companyName' | 'castingId' | 'castingName'
>
