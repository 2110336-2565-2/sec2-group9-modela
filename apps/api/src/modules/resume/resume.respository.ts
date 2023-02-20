import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class JobRepository {
  constructor(private prisma: PrismaService) {}
}
