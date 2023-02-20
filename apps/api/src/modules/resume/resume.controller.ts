import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('resume')
@Controller('resume')
export class ResumeController {}
