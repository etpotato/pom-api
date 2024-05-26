import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SourceService } from './source.service';
import {
  SourceCreateRequestDto,
  SourceGetRequesDto,
  SourceGetResponseDto,
  SourcePatchRequestDto,
} from './dto';
import { fillDto } from 'src/utils';
import { StatusCodes } from 'http-status-codes';

@Controller('sources')
export class SourceController {
  constructor(private readonly service: SourceService) {}

  @Get(':id')
  private async get(@Param() { id }: SourceGetRequesDto) {
    const source = await this.service.get(id);
    return fillDto(source, SourceGetResponseDto);
  }

  @Get('/')
  private async getAll() {
    const sources = await this.service.getAll();
    return fillDto(sources, SourceGetResponseDto);
  }

  @Post('/')
  private async create(@Body() dto: SourceCreateRequestDto) {
    const created = await this.service.create(dto);

    return fillDto(created, SourceGetResponseDto);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  private async update(
    @Param() { id }: SourceGetRequesDto,
    @Body() patch: SourcePatchRequestDto,
  ) {
    await this.service.update({ id, ...patch });
  }
}
