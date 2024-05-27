import { Expose } from 'class-transformer';

export class IdAndDatesResponseDto {
  @Expose()
  public id: number;

  @Expose()
  public created_at: string;

  @Expose()
  public updated_at: string;
}

export class NameResponseDto {
  @Expose()
  public name: string;
}
