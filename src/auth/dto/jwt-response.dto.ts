import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class JwtResponseDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  accessToken: string;
}
