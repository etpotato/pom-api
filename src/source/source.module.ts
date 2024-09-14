import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './source.entity';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { SourceRepository } from './source.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Source])],
  providers: [SourceRepository, SourceService],
  controllers: [SourceController],
  exports: [SourceService],
})
export class SourceModule {}
