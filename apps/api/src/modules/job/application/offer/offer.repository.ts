import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class OfferRepository {
  constructor(private prisma: PrismaService) {}
}
