import { Injectable } from '@nestjs/common';
import { Source } from './source.entity';
import { SourceRepository } from './source.repository';

@Injectable()
export class SourceService {
  constructor(private readonly repository: SourceRepository) {}

  public async get(id: Source['id']) {
    return this.repository.getById(id);
  }
}
