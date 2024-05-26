import { Injectable } from '@nestjs/common';
import { Source } from './source.entity';
import { SourceRepository } from './source.repository';
import { SourceCreateRequestDto } from './dto';
import { SourcePatch } from './source.types';

@Injectable()
export class SourceService {
  constructor(private readonly repository: SourceRepository) {}

  public async get(id: Source['id']) {
    return this.repository.getById(id);
  }

  public async getAll() {
    return this.repository.getAll();
  }

  public async create(dto: SourceCreateRequestDto) {
    return this.repository.create(dto);
  }

  public async update(dto: SourcePatch) {
    return this.repository.update(dto);
  }
}
