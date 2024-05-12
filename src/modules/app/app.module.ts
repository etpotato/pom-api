import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '../config';
import { DatabaseModule } from '../database';
import { SourceModule } from '../source';

@Module({
  imports: [AppConfigModule, DatabaseModule, SourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
