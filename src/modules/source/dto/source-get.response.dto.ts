import { Source } from '../source.entity';
import {
  IdAndDatesResponseDto,
  NameResponseDto,
} from 'src/shared/response.dto';
import { IntersectionType } from '@nestjs/swagger';

export class SourceGetResponseDto
  extends IntersectionType(IdAndDatesResponseDto, NameResponseDto)
  implements Source {}
