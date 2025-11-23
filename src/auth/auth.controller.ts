import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: SignUpDto })
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: SignInDto })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.email, dto.password);
  }
}
