import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserUpdateRequestDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly typeOrmRepo: Repository<User>,
  ) {}

  public async getById(id: User['id']) {
    const result = await this.typeOrmRepo.findOneBy({ id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async getByName(name: User['name']) {
    const result = await this.typeOrmRepo.findOneBy({ name });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  public async create(
    dto: Omit<User, 'id' | 'role' | 'created_at' | 'updated_at'>,
  ) {
    const result = await this.typeOrmRepo.upsert(dto, {
      conflictPaths: ['name'],
    });

    return { ...dto, id: result.identifiers[0].id };
  }

  public async update({ id, ...data }: UserUpdateRequestDto) {
    const result = await this.typeOrmRepo.update(id, data);

    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
