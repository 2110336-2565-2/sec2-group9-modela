import { GetJobCardDto } from '@modela/dtos'

export interface WithJobCardHeaderProps
  extends Pick<
    GetJobCardDto,
    'title' | 'jobCastingImageUrl' | 'companyName' | 'castingId' | 'castingName'
  > {
  fullTitle?: boolean
}
