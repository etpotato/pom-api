import { TagGetRequestDto } from './dto/tag-get.request.dto';
import { TagPatchRequestDto } from './dto/tag-patch.request.dto';

export type TagPatch = TagPatchRequestDto & TagGetRequestDto;
