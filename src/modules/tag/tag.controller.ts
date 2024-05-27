import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  TagCreateRequestDto,
  TagGetRequestDto,
  TagGetResponseDto,
  TagPatchRequestDto,
} from './dto';
import { TagService } from './tag.service';
import { fillDto } from 'src/utils';
import { StatusCodes } from 'http-status-codes';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get(':id')
  private async getById(@Param() { id }: TagGetRequestDto) {
    const tag = await this.tagService.get(id);

    return fillDto(tag, TagGetResponseDto);
  }

  @Get('')
  private async getAll() {
    const tags = await this.tagService.getAll();

    return fillDto(tags, TagGetResponseDto);
  }

  @Post()
  private async create(@Body() dto: TagCreateRequestDto) {
    const created = await this.tagService.create(dto);
    return fillDto(created, TagGetResponseDto);
  }

  @Patch(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  private async patch(
    @Param() { id }: TagGetRequestDto,
    @Body() patch: TagPatchRequestDto,
  ) {
    await this.tagService.update({ id, ...patch });
  }
}
