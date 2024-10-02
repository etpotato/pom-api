import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
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
import { AuthGuard } from 'src/auth';
import { Roles, RolesGuard } from 'src/roles';
import { Role } from 'src/types';

@Controller('sources')
export class SourceController {
  constructor(private readonly service: SourceService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  private async get(@Param() { id }: SourceGetRequesDto) {
    const source = await this.service.get(id);
    return fillDto(source, SourceGetResponseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  private async getAll() {
    const sources = await this.service.getAll();
    return fillDto(sources, SourceGetResponseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  private async create(@Body() dto: SourceCreateRequestDto) {
    const created = await this.service.create(dto);

    return fillDto(created, SourceGetResponseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(StatusCodes.NO_CONTENT)
  @Patch(':id')
  private async update(
    @Param() { id }: SourceGetRequesDto,
    @Body() patch: SourcePatchRequestDto,
  ) {
    await this.service.update({ id, ...patch });
  }
}
