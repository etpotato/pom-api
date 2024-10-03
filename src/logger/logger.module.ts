import { Module } from '@nestjs/common';
import { Logger } from './logger.service';
import { AppConfigModule } from 'src/config';

@Module({
  imports: [AppConfigModule],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
