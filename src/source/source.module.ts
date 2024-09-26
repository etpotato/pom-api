import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Source } from './source.entity';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { SourceRepository } from './source.repository';
import { AuthModule } from 'src/auth';

@Module({
  imports: [TypeOrmModule.forFeature([Source]), AuthModule],
  providers: [SourceRepository, SourceService],
  controllers: [SourceController],
  exports: [SourceService],
})
export class SourceModule {}
