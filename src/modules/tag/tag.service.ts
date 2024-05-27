import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagCreateRequestDto } from './dto';
import { TagPatch } from './tag.types';

@Injectable()
export class TagService {
  constructor(private readonly typeOrmRepo: Repository<Tag>) {}

  public async get(id: Tag['id']) {
    const tag = this.typeOrmRepo.findOneBy({ id });

    if (!tag) {
      throw new NotFoundException();
    }

    return tag;
  }

  public async getAll() {
    const tags = await this.typeOrmRepo.find();
    return tags;
  }

  public async create(dto: TagCreateRequestDto) {
    const result = await this.typeOrmRepo.upsert(dto, {
      conflictPaths: ['name'],
    });

    return { ...dto, id: result.identifiers[0].id };
  }

  public async update(dto: TagPatch) {
    const { id, ...patch } = dto;
    const updateResult = await this.typeOrmRepo.update(id, patch);

    if (!updateResult.affected) {
      throw new NotFoundException();
    }
  }
}
