import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { fillDto, generateHash } from 'src/utils';
import {
  UserCreateRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: User['id']) {
    try {
      const user = await this.usersRepository.getById(id);

      return fillDto(user, UserResponseDto);
    } catch (error) {
      return null;
    }
  }

  async findByName(username: User['name']): Promise<UserResponseDto | null> {
    try {
      const user = await this.usersRepository.getByName(username);

      return fillDto(user, UserResponseDto);
    } catch (error) {
      return null;
    }
  }

  async create(dto: UserCreateRequestDto): Promise<UserResponseDto> {
    const passwordHash = await generateHash(dto.password);
    const user = await this.usersRepository.create({ ...dto, passwordHash });

    return fillDto(user, UserResponseDto);
  }

  public async update(dto: UserUpdateRequestDto) {
    await this.usersRepository.update(dto);
  }
}
