import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { AppConfigModule, AppConfigService } from 'src/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'src/logger';

@Module({
  imports: [
    LoggerModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: 60 * 60 },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule],
  exports: [JwtModule],
})
export class AuthModule {}
