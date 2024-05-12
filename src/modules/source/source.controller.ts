import { Controller, Get, Param } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceGetRequesDto } from './dto';

@Controller('sources')
export class SourceController {
  constructor(private readonly service: SourceService) {}

  @Get(':id')
  private async get(@Param() { id }: SourceGetRequesDto) {
    console.log('inside controller');
    return this.service.get(id);
  }
}
