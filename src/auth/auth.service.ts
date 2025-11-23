import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    return await this.generateToken(user);
  }

  async signUp(dto: SignUpDto) {
    const userExists = await this.usersService.findOneByEmail(dto.email);

    if (userExists) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const newUser: CreateUserDto = {
      ...dto,
      password: hash,
    };

    const user = await this.usersService.create(newUser);

    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const pawload = {
      sub: user.id,
    };

    const jwt: JwtResponseDto = {
      accessToken: await this.jwtService.signAsync(pawload),
    };

    return jwt;
  }
}
