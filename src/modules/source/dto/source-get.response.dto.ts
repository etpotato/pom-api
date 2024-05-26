import { Expose } from 'class-transformer';
import { Source } from '../source.entity';

export class SourceGetResponseDto implements Source {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public created_at: string;

  @Expose()
  public updated_at: string;
}
