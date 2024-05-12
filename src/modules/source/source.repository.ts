import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SourceRepository {
  constructor(
    @InjectRepository(Source) private readonly typeOrmRepo: Repository<Source>,
  ) {}

  public async getById(id: Source['id']) {
    const result = await this.typeOrmRepo.findOneBy({ id });

    return result;
  }
}
