import { IntersectionType } from '@nestjs/swagger';
import {
  IdAndDatesResponseDto,
  NameResponseDto,
} from 'src/shared/response.dto';

export class TagGetResponseDto extends IntersectionType(
  IdAndDatesResponseDto,
  NameResponseDto,
) {}
