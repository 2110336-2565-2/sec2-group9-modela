import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/database/prisma.module'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtAnyStrategy, JwtVerifiedStrategy } from './misc/jwt.service'

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('jwt.expires') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtAnyStrategy, JwtVerifiedStrategy],
  exports: [AuthRepository],
})
export class AuthModule {}
