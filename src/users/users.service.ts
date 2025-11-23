import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepo.findOneBy({ email });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not find user');
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const user = this.usersRepo.create(dto);
      return this.usersRepo.save(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Could not create user');
    }
  }
}
