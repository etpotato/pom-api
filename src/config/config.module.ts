import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './config.validation';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateConfig,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
