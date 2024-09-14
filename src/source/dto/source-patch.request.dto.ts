import { IsNotEmpty, IsString } from 'class-validator';

export class SourcePatchRequestDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
