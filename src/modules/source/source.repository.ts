import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './source.entity';
import { Repository } from 'typeorm';
import { SourceCreateRequestDto } from './dto';

@Injectable()
export class SourceRepository {
  constructor(
    @InjectRepository(Source) private readonly typeOrmRepo: Repository<Source>,
  ) {}

  public async getById(id: Source['id']) {
    const result = await this.typeOrmRepo.findOneBy({ id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async getAll() {
    const result = await this.typeOrmRepo.find();

    return result;
  }

  public async create(dto: SourceCreateRequestDto) {
    const result = await this.typeOrmRepo.upsert(dto, {
      conflictPaths: ['name'],
    });

    return { ...dto, id: result.identifiers[0].id };
  }

  public async update(dto: Source) {
    const { id, ...patch } = dto;
    const updateResult = await this.typeOrmRepo.update(id, patch);

    if (!updateResult.affected) {
      throw new NotFoundException();
    }
  }
}
