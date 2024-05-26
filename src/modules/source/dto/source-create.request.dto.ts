import { IsNotEmpty, IsString } from 'class-validator';

export class SourceCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
