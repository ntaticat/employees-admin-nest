import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @Length(18, 18)
  @IsNotEmpty()
  curp: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  middleName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surName: string;
  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
